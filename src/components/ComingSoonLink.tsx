import { Link } from "react-router-dom";
import { ReactNode } from "react";

type ComingSoonLinkProps = {
  feature?: string;
  children: ReactNode;
  className?: string;
};

export default function ComingSoonLink({
  feature = "This Feature",
  children,
  className = "inline-block",
}: ComingSoonLinkProps) {
  const to = `/coming-soon?feature=${encodeURIComponent(feature)}`;

  return (
    <Link to={to} className={className} style={{ textDecoration: "none" }}>
      {children}
    </Link>
  );
}
