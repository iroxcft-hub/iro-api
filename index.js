const express = require('express');
const cors = require('cors');
const app = express();

// 1. Her şeyi kabul eden CORS ayarı
app.use(cors({
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. İstekleri loglayan kısım
app.use((req, res, next) => {
    console.log(`Gelen istek: ${req.method} ${req.url}`);
    next();
});

// 3. AI Proxy
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
    } catch (err) {
        console.error('Hata:', err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor.`));
