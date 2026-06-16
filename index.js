const express = require("express");
const Groq = require("groq-sdk");

const app = express();
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api", async (req, res) => {
  const { mesaj } = req.body;

  if (!mesaj) {
    return res.status(400).json({ error: "mesaj alanı gerekli" });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: mesaj }],
      temperature: 0.9,
      max_tokens: 2048,
    });

    const cevap = completion.choices[0]?.message?.content ?? "";
    res.json({ cevap });
  } catch (err) {
    console.error("Groq hatası:", err.message);
    res.status(500).json({ error: "AI çağrısı başarısız: " + err.message });
  }
});

app.get("/health", (_req, res) => res.json({ durum: "çalışıyor" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
