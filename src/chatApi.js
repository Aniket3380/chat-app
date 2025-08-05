import axios from "axios";

export async function getAIResponse(messages) {
  try {
    const res = await axios.post("/api/chat", { messages });
    return res.data.choices?.[0]?.message?.content || "⚠️ No AI response";
  } catch (err) {
    const errorMessage = err.response?.data?.error || err.message;
    return `⚠️ Error: ${errorMessage}`;
  }
}
