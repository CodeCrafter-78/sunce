const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

// 设置代理
const proxyOptions = {
target: 'https://gcli.ggchan.dev',
changeOrigin: true,
pathRewrite: { '^/': '/' },
onProxyReq: (proxyReq, req, res) => {
// 核心：伪装请求头
proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (模拟客户端/1.0)'); // 需替换为正确值
proxyReq.setHeader('Authorization', 'Bearer gg-gcli-qVU4QeONDcM1XjDUD8fShiHCiPiUWrOgCCmbYszL_2g'); // 已填入你的密钥
},
};

app.use('/', createProxyMiddleware(proxyOptions));
app.get('/health', (req, res) => res.send('OK'));
app.listen(PORT, () => console.log(`代理运行中: ${PORT}`));
