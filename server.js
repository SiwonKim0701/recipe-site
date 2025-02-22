const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

app.use(express.static("public"));
app.use(express.json()); // JSON 데이터 처리를 위한 미들웨어 추가

// 관리자 로그인 정보 (보안상 .env 파일로 저장하는 것이 좋음)
const adminCredentials = {
    username: "admin",
    password: "admin123"
};

// API 엔드포인트 (테스트용)
router.get("/api", (req, res) => {
    res.json({ message: "Hello from Node.js server on Netlify!" });
});

// 관리자 로그인 엔드포인트
router.post("/admin-login", (req, res) => {
    const { username, password } = req.body;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        res.json({ success: true, message: "관리자 로그인 성공!" });
    } else {
        res.status(401).json({ success: false, message: "로그인 실패: 잘못된 아이디 또는 비밀번호." });
    }
});

app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);
