# Block Blast 攻略网站 - 部署指南

本文档提供详细的部署步骤，帮助你将网站发布到互联网。

## 📋 部署前检查清单

在部署之前，请确保完成以下配置：

### 1. ✅ 必须配置的项目

- [ ] 替换所有 `https://你的域名.com` 为真实域名
- [ ] 配置 Google Analytics ID（如需统计）
- [ ] 配置 Google AdSense 客户端 ID（如需广告）
- [ ] 替换 Affiliate 链接中的占位符 ID

### 2. ⚠️ 建议配置的项目

- [ ] 添加网站 Logo 图片到 `images/logo.png`
- [ ] 添加游戏截图到 `images/` 目录
- [ ] 添加 favicon.ico
- [ ] 配置 robots.txt
- [ ] 配置 sitemap.xml

---

## 🚀 方式 1：部署到 GitHub Pages（免费）

### 优点
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 易于维护

### 步骤

#### 1. 创建 GitHub 账号
访问 https://github.com 注册账号（如果还没有）

#### 2. 创建新仓库
1. 点击右上角 "+" → "New repository"
2. 仓库名：`block-blast-guide`（或其他名称）
3. 设置为 Public（公开）
4. 不要勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

#### 3. 上传代码

打开命令行（CMD 或 PowerShell），执行：

```bash
# 进入项目目录
cd "D:\公司\claude code project\block-blast-guide"

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Block Blast 攻略网站 v2.0.0"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/block-blast-guide.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 4. 启用 GitHub Pages

1. 进入仓库页面
2. 点击 "Settings"（设置）
3. 左侧菜单找到 "Pages"
4. 在 "Source" 下拉菜单选择 "main" 分支
5. 点击 "Save"
6. 等待 1-2 分钟，页面会显示网站地址

你的网站将发布到：`https://你的用户名.github.io/block-blast-guide/`

#### 5. 配置自定义域名（可选）

如果你有自己的域名：

1. 在 GitHub Pages 设置中，"Custom domain" 输入你的域名
2. 在域名服务商添加 DNS 记录：
   - 类型：CNAME
   - 名称：www（或 @）
   - 值：你的用户名.github.io
3. 等待 DNS 生效（可能需要几小时）

---

## 🌐 方式 2：部署到 Vercel（推荐）

### 优点
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 自动部署（推送代码即更新）
- ✅ 更快的访问速度

### 步骤

#### 1. 注册 Vercel
访问 https://vercel.com 用 GitHub 账号登录

#### 2. 导入项目
1. 点击 "New Project"
2. 选择 "Import Git Repository"
3. 选择你的 `block-blast-guide` 仓库
4. 点击 "Import"

#### 3. 配置项目
- Framework Preset: 选择 "Other"
- Root Directory: 保持默认（./）
- Build Command: 留空
- Output Directory: 留空

#### 4. 部署
点击 "Deploy"，等待 1-2 分钟即可完成

你的网站将发布到：`https://你的项目名.vercel.app`

#### 5. 配置自定义域名（可选）
1. 进入项目设置 → Domains
2. 添加你的域名
3. 按照提示配置 DNS

---

## 🖥️ 方式 3：部署到自己的服务器

### 适用场景
- 你有自己的服务器（VPS、云服务器等）
- 需要完全控制

### 步骤

#### 1. 上传文件
使用 FTP/SFTP 工具（如 FileZilla）将整个项目文件夹上传到服务器

#### 2. 配置 Web 服务器

**Nginx 配置示例：**

```nginx
server {
    listen 80;
    server_name 你的域名.com;
    root /var/www/block-blast-guide;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

**Apache 配置示例：**

在项目根目录创建 `.htaccess`：

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]

# 启用压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

#### 3. 配置 HTTPS（推荐）

使用 Let's Encrypt 免费证书：

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d 你的域名.com
```

---

## 📊 部署后配置

### 1. Google Analytics

在所有 HTML 文件的 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

替换 `GA_MEASUREMENT_ID` 为你的 Google Analytics ID。

### 2. Google AdSense

1. 访问 https://www.google.com/adsense
2. 申请账号并提交网站审核
3. 审核通过后，获取广告代码
4. 替换 `.ad-placeholder` 为真实广告代码

### 3. 配置 Affiliate 链接

编辑 `js/affiliate.js`，替换所有占位符：

```javascript
// 替换这些值
partnerId: '你的Apple Affiliate ID',
campaignToken: '你的Campaign Token',
url: 'https://真实的加速器网址.com',
affiliateParam: '?ref=你的真实Affiliate ID'
```

### 4. 更新域名

全局搜索并替换 `https://你的域名.com` 为你的真实域名：

- index.html（JSON-LD 结构化数据）
- tips.html（JSON-LD 结构化数据）
- daily.html（JSON-LD 结构化数据）
- levels.html（JSON-LD 结构化数据）
- download.html（JSON-LD 结构化数据）

---

## 🔍 SEO 优化建议

### 1. 提交到搜索引擎

**Google Search Console:**
1. 访问 https://search.google.com/search-console
2. 添加你的网站
3. 验证所有权
4. 提交 sitemap.xml

**Bing Webmaster Tools:**
1. 访问 https://www.bing.com/webmasters
2. 添加你的网站
3. 提交 sitemap

### 2. 创建 sitemap.xml

在项目根目录创建 `sitemap.xml`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://你的域名.com/</loc>
    <lastmod>2026-05-13</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://你的域名.com/tips.html</loc>
    <lastmod>2026-05-13</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://你的域名.com/daily.html</loc>
    <lastmod>2026-05-13</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://你的域名.com/levels.html</loc>
    <lastmod>2026-05-13</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://你的域名.com/download.html</loc>
    <lastmod>2026-05-13</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 3. 创建 robots.txt

在项目根目录创建 `robots.txt`：

```
User-agent: *
Allow: /

Sitemap: https://你的域名.com/sitemap.xml
```

---

## 🎯 性能优化建议

### 1. 图片优化
- 使用 WebP 格式
- 压缩图片（推荐工具：TinyPNG）
- 使用懒加载

### 2. 启用缓存
在服务器配置中添加缓存头：

```nginx
location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. 使用 CDN
- 将静态资源托管到 CDN
- 推荐：Cloudflare（免费）

---

## ❓ 常见问题

### Q: 部署后页面显示不正常？
A: 检查文件路径是否正确，确保所有 CSS/JS 文件都已上传。

### Q: 如何更新网站内容？
A: 修改本地文件后，重新推送到 GitHub 或上传到服务器。

### Q: GitHub Pages 访问速度慢？
A: 可以使用 Cloudflare CDN 加速，或改用 Vercel。

### Q: 如何查看网站访问统计？
A: 配置 Google Analytics 后，在 GA 后台查看。

---

## 📞 需要帮助？

如果遇到部署问题，可以：
1. 查看 GitHub Issues
2. 参考官方文档
3. 搜索相关教程

---

**祝你部署顺利！🎉**
