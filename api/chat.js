import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    const { messages } = req.body;
    const lastMessage = messages[messages.length - 1]?.content || "";

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Try flash first
    let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let retries = 2;
    let text = "";

    for (let i = 0; i < retries; i++) {
      try {
        const result = await model.generateContent(lastMessage);
        text = result.response.text();
        break;
      } catch (err) {
        console.warn(`Gemini flash error: ${err.message}`);
        if (err.message.includes("503")) {
          console.warn("Switching to gemini-1.5-pro fallback...");
          model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        } else {
          throw err;
        }
      }
    }

    if (!text) {
      return res.status(500).json({ error: "⚠️ AI service is overloaded. Try again later." });
    }

    res.status(200).json({
      choices: [{ message: { content: text } }]
    });

  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
