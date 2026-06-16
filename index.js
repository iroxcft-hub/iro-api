const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/v1/chat/completions', async (req, res) => {
  console.log("Gelen İstek:", JSON.stringify(req.body)); // İsteği logla
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.Jiuu}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log("Groq'tan Gelen:", JSON.stringify(data)); // Cevabı logla
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error("HATA:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => console.log('Sunucu 8080 portunda çalışıyor'));
