const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

// 정적 파일 제공
app.use(express.static("public"));

// API 엔드포인트
router.get("/api", (req, res) => {
  res.json({ message: "Hello from Node.js server on Netlify!" });
});

app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);
