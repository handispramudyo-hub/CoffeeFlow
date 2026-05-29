import { useState } from "react";
import toast from "react-hot-toast";

export default function AiAssistant() {
  const [prompt, setPrompt] = useState(
    "Promo diskon 50% untuk Espresso hari Jumat",
  );
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const generateCaption = async () => {
    if (!apiKey) {
      toast.error("API Key OpenAI belum diatur di file .env");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      // Import OpenAI hanya saat tombol diklik untuk menghindari crash awal
      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah ahli marketing media sosial untuk coffee shop bernama CoffeeFlow. Buat caption Instagram yang menarik dan hashtag.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
      });
      setResult(response.choices[0].message.content);
    } catch (error) {
      console.error(error);
      toast.error("Gagal generate. Cek API Key OpenAI atau saldo akunmu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-coffee-800">
        AI Marketing Assistant ✨
      </h1>

      {!apiKey ? (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-700">
          <strong>Peringatan:</strong> VITE_OPENAI_API_KEY belum diatur di file
          .env. Fitur AI tidak bisa digunakan sampai diatur.
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-100 space-y-4">
          <div>
            <label className="block text-coffee-700 font-semibold mb-2">
              Apa ide promomu hari ini?
            </label>
            <textarea
              className="w-full p-3 bg-coffee-50 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 outline-none resize-none"
              rows="4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>

          <button
            onClick={generateCaption}
            disabled={loading}
            className="bg-coffee-600 text-white px-6 py-3 rounded-lg hover:bg-coffee-700 disabled:opacity-50 flex items-center gap-2 font-semibold transition-colors"
          >
            {loading
              ? "🧠 AI Sedang Berpikir..."
              : "✨ Generate Caption & Hashtag"}
          </button>
        </div>
      )}

      {result && (
        <div className="bg-coffee-50 p-6 rounded-xl border border-coffee-200 shadow-sm">
          <h3 className="font-bold text-coffee-800 mb-3 text-lg">Hasil AI:</h3>
          <pre className="whitespace-pre-wrap text-coffee-700 font-sans leading-relaxed">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
