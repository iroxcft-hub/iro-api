const express = require('express');
const app = express();
app.use(express.json());

// Burası uygulamandan gelen soruları karşılar
app.post('/api', async (req, res) => {
  const { mesaj } = req.body;
  
  // Burada Groq API'ne istek atacak mantık olacak
  // Şimdilik sadece test için cevap dönüyoruz:
  res.json({ cevap: "Backend'e ulaştın! Mesajın: " + mesaj });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Sunucu çalışıyor...'));
