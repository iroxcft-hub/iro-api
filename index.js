const express = require('express');
const cors = require('cors');
const app = express();

// 1. En geniş kapsamlı CORS
app.use(cors({ origin: "*" }));

app.use(express.json());

// 2. Her şeyi logla (Preflight istekleri dahil)
app.use((req, res, next) => {
    console.log(`--- YENİ İSTEK GELDİ ---`);
    console.log(`Metod: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    next();
});

// 3. OPTIONS (Preflight) isteğine anında cevap ver
app.options('*', cors());

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
        console.error('HATA:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda hazır!`));
