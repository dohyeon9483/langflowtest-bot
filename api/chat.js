const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const flow = JSON.parse(fs.readFileSync('langtest.json', 'utf-8'));

// 루트 경로 처리
app.get('/', (req, res) => {
  res.send('✅ Langflow Chatbot is Running!');
});

// 챗봇 API
app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  const response = flow.responses.find(r => r.trigger === userMessage);
  res.json({ reply: response ? response.reply : "🤖 I don't understand." });
});

app.listen(3000, () => console.log('Chatbot is running on port 3000'));
