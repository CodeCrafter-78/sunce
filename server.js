const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 10000;

// 设置代理
const proxyOptions = {
target: 'https://gcli.ggchan.dev',
changeOrigin: true,
pathRewrite: { '^/': '/' },
onProxyReq: (proxyReq, req, res) => {
// 核心：伪装请求头
// 1. 使用一个纯英文、合法的User-Agent (已修正之前的中文无效字符问题)
proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
// 2. 设置认证头，使用你的密钥 (请确保密钥正确)
proxyReq.setHeader('Authorization', 'Bearer gg-gcli-qVU4QeONDcM1XjDUD8fShiHCiPiUWrOgCCmbYszL_2g');
},
};

app.use('/', createProxyMiddleware(proxyOptions));
app.get('/health', (req, res) => res.send('OK'));
app.listen(PORT, () => console.log(`代理运行中: ${PORT}`));
