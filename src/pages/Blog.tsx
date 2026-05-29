import { motion } from "framer-motion";
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ComingSoonLink from "../components/ComingSoonLink";
import { useState } from "react";

const featuredArticle = {
  title: "Real-time Voice AI: Overcoming Latency Challenges",
  excerpt:
    "Explore how modern AI architectures achieve sub-100ms latency for real-time voice processing, enabling entirely new categories of applications.",
  author: "Sarah Chen",
  date: "May 15, 2024",
  readTime: "8 min read",
  category: "Technology",
  image:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&q=80",
};

const articles = [
  {
    title: "Building Custom Models for Your Domain",
    excerpt: "Step-by-step guide to training models on proprietary data.",
    author: "Mike Johnson",
    date: "May 10, 2024",
    readTime: "12 min read",
    category: "Product",
  },
  {
    title: "Security & Compliance in AI Infrastructure",
    excerpt: "Best practices for protecting voice data at scale.",
    author: "Lisa Park",
    date: "May 5, 2024",
    readTime: "6 min read",
    category: "Security",
  },
  {
    title: "The Future of Voice Technology",
    excerpt: "What's next for AI-powered voice processing.",
    author: "Alex Rivera",
    date: "April 28, 2024",
    readTime: "10 min read",
    category: "Industry",
  },
  {
    title: "Performance Optimization Techniques",
    excerpt: "How we achieved 99.99% uptime with sub-100ms latency.",
    author: "David Kim",
    date: "April 20, 2024",
    readTime: "9 min read",
    category: "Technology",
  },
  {
    title: "Introducing Webhooks v2",
    excerpt: "New webhook features for real-time event streaming.",
    author: "Emily Zhang",
    date: "April 15, 2024",
    readTime: "5 min read",
    category: "Updates",
  },
  {
    title: "Enterprise Deployment Patterns",
    excerpt: "Scalable architectures for large-scale deployments.",
    author: "James Wilson",
    date: "April 10, 2024",
    readTime: "14 min read",
    category: "Technology",
  },
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-mono font-bold text-5xl md:text-7xl mb-6">
            The Vhois.ai <span className="text-gradient">Journal</span>
          </h1>
          <p className="text-xl text-mist max-w-3xl mx-auto mb-12">
            Insights, tutorials, and updates from the voice AI frontier
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mist" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 glass rounded-xl font-sans focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card glowColor="cyan" className="overflow-hidden cursor-pointer hover-lift">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative h-64 lg:h-auto overflow-hidden rounded-xl">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent opacity-50" />
              </div>

              <div className="p-6">
                <div className="text-neon-cyan text-xs font-mono mb-4">
                  {featuredArticle.category}
                </div>
                <h2 className="font-mono font-bold text-3xl mb-4 hover:text-neon-cyan transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-mist mb-6">{featuredArticle.excerpt}</p>

                <div className="flex items-center gap-6 text-sm text-mist mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredArticle.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>

                <ComingSoonLink feature="Blog Article">
                  <Button variant="neon" asSpan>
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </ComingSoonLink>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <Card glowColor="purple" className="cursor-pointer hover-lift h-full">
                <div className="mb-4">
                  <span className="text-xs font-mono px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full">
                    {article.category}
                  </span>
                </div>

                <h3 className="font-mono font-bold text-xl mb-3 hover:text-neon-cyan transition-colors">
                  {article.title}
                </h3>
                <p className="text-mist text-sm mb-4">{article.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-mist mt-auto">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <ComingSoonLink feature="More Articles">
            <Button variant="ghost" asSpan>Load More Articles</Button>
          </ComingSoonLink>
        </div>
      </div>
    </div>
  );
}
