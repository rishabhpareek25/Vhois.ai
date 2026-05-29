import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const TABLE = process.env.TABLE_NAME;
const ADMIN_SECRET = process.env.ADMIN_SECRET || "vhois-admin-dev";
const COUNTER_KEY = "__counter__";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

function routeKey(event) {
  const method = event.requestContext?.http?.method || event.httpMethod || "GET";
  const path = event.rawPath || event.path || "";
  return `${method} ${path.replace(/\/$/, "")}`;
}

async function getCounterTotal() {
  const res = await ddb.send(
    new GetCommand({ TableName: TABLE, Key: { email: COUNTER_KEY } })
  );
  return res.Item?.total ?? 0;
}

async function incrementCounter() {
  const res = await ddb.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { email: COUNTER_KEY },
      UpdateExpression: "SET #t = if_not_exists(#t, :zero) + :one",
      ExpressionAttributeNames: { "#t": "total" },
      ExpressionAttributeValues: { ":zero": 0, ":one": 1 },
      ReturnValues: "UPDATED_NEW",
    })
  );
  return res.Attributes?.total ?? 1;
}

async function getEntryByEmail(email) {
  const res = await ddb.send(
    new GetCommand({ TableName: TABLE, Key: { email } })
  );
  const item = res.Item;
  if (!item || item.email === COUNTER_KEY) return null;
  return {
    ...item,
    capabilities:
      typeof item.capabilities === "string"
        ? JSON.parse(item.capabilities)
        : item.capabilities,
  };
}

async function handlePost(body) {
  const {
    name,
    email,
    role,
    capabilities,
    company,
    useCase,
    signalStrength,
    frequencyHz,
  } = body || {};

  if (!name?.trim() || !email?.includes("@") || !role || !useCase?.trim()) {
    return json(400, { error: "Missing required fields" });
  }
  if (!Array.isArray(capabilities) || capabilities.length === 0) {
    return json(400, { error: "Select at least one capability" });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await getEntryByEmail(normalizedEmail);
  if (existing) {
    return json(200, {
      id: existing.id,
      queuePosition: existing.queue_position,
      alreadyRegistered: true,
      message: "Already on the waitlist",
    });
  }

  const total = await getCounterTotal();
  const queuePosition = 2400 + total + Math.floor(Math.random() * 120);
  const id = Date.now();

  await ddb.send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        email: normalizedEmail,
        id,
        name: name.trim(),
        role,
        capabilities: JSON.stringify(capabilities),
        company: company?.trim() || null,
        use_case: useCase.trim(),
        signal_strength: signalStrength ?? 100,
        frequency_hz: frequencyHz ?? 440,
        queue_position: queuePosition,
        created_at: new Date().toISOString(),
      },
      ConditionExpression: "attribute_not_exists(email)",
    })
  );

  await incrementCounter();

  return json(201, {
    id,
    queuePosition,
    message: "Transmission received",
  });
}

async function handleGetEntries(adminKey) {
  if (adminKey !== ADMIN_SECRET) {
    return json(401, { error: "Unauthorized" });
  }

  const res = await ddb.send(new ScanCommand({ TableName: TABLE }));
  const entries = (res.Items || [])
    .filter((row) => row.email !== COUNTER_KEY)
    .map((row) => ({
      ...row,
      capabilities:
        typeof row.capabilities === "string"
          ? JSON.parse(row.capabilities)
          : row.capabilities,
    }))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return json(200, { entries });
}

async function handleGetStats(adminKey) {
  if (adminKey !== ADMIN_SECRET) {
    return json(401, { error: "Unauthorized" });
  }

  const res = await ddb.send(new ScanCommand({ TableName: TABLE }));
  const rows = (res.Items || []).filter((row) => row.email !== COUNTER_KEY);
  const today = new Date().toISOString().slice(0, 10);
  const byRoleMap = {};

  for (const row of rows) {
    byRoleMap[row.role] = (byRoleMap[row.role] || 0) + 1;
  }

  return json(200, {
    total: rows.length,
    today: rows.filter((r) => r.created_at?.startsWith(today)).length,
    byRole: Object.entries(byRoleMap).map(([role, count]) => ({ role, count })),
  });
}

export async function handler(event) {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  try {
    const key = routeKey(event);
    const adminKey = event.headers?.["x-admin-key"] || event.headers?.["X-Admin-Key"];
    const body = event.body ? JSON.parse(event.body) : {};

    switch (key) {
      case "GET /api/health":
        return json(200, { ok: true, service: "vhois-waitlist" });
      case "POST /api/waitlist":
        return handlePost(body);
      case "GET /api/waitlist":
        return handleGetEntries(adminKey);
      case "GET /api/waitlist/stats":
        return handleGetStats(adminKey);
      default:
        return json(404, { error: "Not found" });
    }
  } catch (err) {
    console.error(err);
    if (err.name === "ConditionalCheckFailedException") {
      const existing = await getEntryByEmail(
        JSON.parse(event.body || "{}").email?.toLowerCase?.()?.trim()
      );
      if (existing) {
        return json(200, {
          id: existing.id,
          queuePosition: existing.queue_position,
          alreadyRegistered: true,
          message: "Already on the waitlist",
        });
      }
    }
    return json(500, { error: "Server error" });
  }
}
