const express = require('express');
const app = express();
app.use(express.json());

// Groq'a bağlanmak için gerekli kütüphaneyi ekliyoruz
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.AI_API_KEY });

app.post('/api', async (req, res) => {
  try {
    const { mesaj } = req.body;
    
    // Groq'a soruyu soruyoruz
    const chatCompletion = await groq.chat.completions.create({
      "messages": [{ "role": "user", "content": mesaj }],
      "model": "llama3-8b-8192", // Burası Groq modelin
    });

    // Yapay zekadan gelen cevabı uygulamana gönderiyoruz
    res.json({ cevap: chatCompletion.choices[0].message.content });
  } catch (error) {
    res.json({ cevap: "Bir hata oluştu: " + error.message });
  }
});

app.listen(3000, () => console.log('Sunucu çalışıyor!'));
