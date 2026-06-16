const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // CORS'u tüm istekler için aktif et
app.use(express.json());

// Gelen istekleri logla (Railway'de görebilmen için)
app.use((req, res, next) => {
  console.log(`İstek geldi: ${req.method} ${req.url}`);
  next();
});

app.post('/v1/chat/completions', async (req, res) => {
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
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
