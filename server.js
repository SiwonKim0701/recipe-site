const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json()); // JSON 데이터 처리
app.use(express.static(path.join(__dirname, 'public')));

// 관리자 로그인 정보
const adminCredentials = {
    username: "admin",
    password: "admin123"
};

// 로그인 API 추가
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        res.json({ success: true, message: "로그인 성공!" });
    } else {
        res.status(401).json({ success: false, message: "아이디 또는 비밀번호가 틀렸습니다." });
    }
});

// 테스트 라우트
app.get('/', (req, res) => {
    res.send('Hello, Express Server!');
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
