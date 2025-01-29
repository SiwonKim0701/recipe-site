const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 테스트 라우트
app.get('/', (req, res) => {
  res.send('Hello, Express Server!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
