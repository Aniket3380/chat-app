import axios from "axios";

export async function getAIResponse(messages) {
  try {
    const res = await axios.post("/api/chat", { messages });
    return res.data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return "⚠️ Error getting AI response.";
  }
}
