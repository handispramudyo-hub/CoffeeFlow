import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Copy, Sparkles, BarChart3, Lightbulb } from "lucide-react";
import toast from "react-hot-toast";
import Card, { CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export default function AiAssistant() {
  const [tab, setTab] = useState("marketing");
  const [prompt, setPrompt] = useState("Promo diskon 50% untuk Espresso hari Jumat");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!apiKey) return toast.error("Set VITE_OPENAI_API_KEY in .env");
    if (!prompt) return toast.error("Enter a prompt");

    setLoading(true);
    setResult("");

    const systemMessages = {
      marketing: "Kamu adalah ahli marketing media sosial untuk coffee shop bernama CoffeeFlow. Buat caption Instagram yang menarik dan hashtag.",
      insight: "Kamu adalah analis bisnis untuk coffee shop. Berikan insight berdasarkan data yang diberikan. Gunakan bahasa Indonesia.",
    };

    try {
      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemMessages[tab] },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
      });

      setResult(response.choices[0].message.content);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate. Check your API key and balance.");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard!");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-coffee-900 flex items-center gap-2">
          <Bot size={24} /> AI Assistant
        </h1>
        <p className="text-sm text-coffee-400 mt-0.5">Leverage AI for marketing and business insights</p>
      </div>

      {!apiKey && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm text-yellow-800">
          <strong>Warning:</strong> Set <code className="bg-yellow-100 px-1 rounded">VITE_OPENAI_API_KEY</code> in your <code className="bg-yellow-100 px-1 rounded">.env</code> file to use AI features.
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("marketing")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === "marketing" ? "bg-coffee-700 text-white shadow-soft" : "bg-white text-coffee-500 border border-coffee-200 hover:border-coffee-400"}`}
        >
          <Sparkles size={16} /> Marketing
        </button>
        <button
          onClick={() => setTab("insight")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === "insight" ? "bg-coffee-700 text-white shadow-soft" : "bg-white text-coffee-500 border border-coffee-200 hover:border-coffee-400"}`}
        >
          <BarChart3 size={16} /> Business Insight
        </button>
      </div>

      <Card>
        <CardHeader
          title={tab === "marketing" ? "Marketing Content Generator" : "Business Insight Generator"}
          subtitle={tab === "marketing" ? "Create captions, promos, and hashtags" : "Get data-driven insights for your coffee shop"}
        />
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-1.5">
              {tab === "marketing" ? "What's your promo idea?" : "Ask about your business data"}
            </label>
            <textarea
              className="w-full rounded-xl border border-coffee-200 p-4 text-sm text-coffee-900 placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500/30 focus:border-coffee-500 resize-none"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={tab === "marketing" ? "e.g. Weekend special for Caramel Latte..." : "e.g. Analyze this week's sales trend..."}
            />
          </div>
          <div className="flex gap-3">
            <Button icon={Bot} onClick={generate} loading={loading} disabled={!apiKey}>
              {loading ? "Generating..." : "Generate"}
            </Button>
            {result && (
              <Button variant="outline" icon={Copy} onClick={copyResult}>Copy</Button>
            )}
          </div>
        </div>
      </Card>

      {result && (
        <Card>
          <CardHeader title="Result" action={<Badge variant="success">Generated</Badge>} />
          <pre className="whitespace-pre-wrap text-sm text-coffee-800 leading-relaxed font-sans bg-coffee-50 rounded-xl p-4">
            {result}
          </pre>
        </Card>
      )}

      {/* Quick prompts */}
      <Card>
        <CardHeader title="Quick Prompts" subtitle="Try these examples" />
        <div className="flex flex-wrap gap-2">
          {[
            { tab: "marketing", label: "Weekend promo idea", text: "Create a weekend promo for Caramel Latte with buy 1 get 1" },
            { tab: "marketing", label: "Instagram caption", text: "Write an Instagram caption for our new Matcha Latte" },
            { tab: "insight", label: "Sales analysis", text: "Sales increased 15% this week. Caramel Latte is best-selling. What should I do?" },
            { tab: "insight", label: "Inventory insight", text: "Our Arabica Beans stock will run out in 4 days. Suggest action plan." },
          ].filter((q) => q.tab === tab).map((q) => (
            <button
              key={q.label}
              onClick={() => setPrompt(q.text)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-coffee-50 border border-coffee-100 text-xs text-coffee-600 hover:bg-coffee-100 transition-colors"
            >
              <Lightbulb size={12} /> {q.label}
            </button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
