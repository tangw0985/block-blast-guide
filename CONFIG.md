# 配置指南 - 快速上手

本文档列出所有需要你手动配置的项目，按优先级排序。

---

## 🔴 高优先级（必须配置）

### 1. 替换域名占位符

**位置：** 所有 HTML 文件的 JSON-LD 结构化数据中

**需要替换：** `https://你的域名.com`

**文件列表：**
- `index.html`（3处）
- `tips.html`（2处）
- `daily.html`（2处）
- `levels.html`（2处）
- `download.html`（2处）

**操作方法：**
使用文本编辑器的"查找和替换"功能：
- 查找：`https://你的域名.com`
- 替换为：`https://你的真实域名.com`

---

### 2. 配置 Affiliate 链接

**位置：** `js/affiliate.js`

**需要替换的内容：**

```javascript
// 第 7-9 行：Apple Affiliate
partnerId: 'YOUR_APPLE_AFFILIATE_ID',  // 替换为你的 Apple Affiliate ID
campaignToken: 'YOUR_CAMPAIGN_TOKEN',   // 替换为你的 Campaign Token

// 第 13 行：Google Play UTM 参数（可选修改）
referrer: 'utm_source=website&utm_medium=download&utm_campaign=block_blast_guide'

// 第 18-19 行：加速器 A
url: 'https://加速器A官网.com',           // 替换为真实网址
affiliateParam: '?ref=YOUR_AFFILIATE_ID' // 替换为你的 Affiliate ID

// 第 22-23 行：加速器 B
url: 'https://加速器B官网.com',           // 替换为真实网址
affiliateParam: '?aff=YOUR_AFFILIATE_CODE' // 替换为你的 Affiliate Code

// 第 38 行：App ID
link.href = generateAppStoreLink('YOUR_APP_ID'); // 替换为真实的 App ID

// 第 41 行：包名
link.href = generateGooglePlayLink('com.example.blockblast'); // 替换为真实包名
```

**如何获取这些 ID：**

1. **Apple Affiliate ID**
   - 访问：https://www.apple.com/itunes/affiliates/
   - 注册成为 Apple Affiliate
   - 获取 Partner ID 和 Campaign Token

2. **加速器 Affiliate**
   - 联系加速器厂商的商务部门
   - 申请成为推广合作伙伴
   - 获取专属推广链接和 ID

3. **App ID 和包名**
   - App Store：在应用页面 URL 中找到（id 后面的数字）
   - Google Play：在应用页面 URL 中找到（id= 后面的字符串）

---

## 🟡 中优先级（建议配置）

### 3. 配置 Google Analytics

**位置：** 所有 HTML 文件的 `</head>` 标签前

**添加代码：**

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**替换：** `G-XXXXXXXXXX` 为你的 Google Analytics Measurement ID

**如何获取：**
1. 访问 https://analytics.google.com
2. 创建账号和媒体资源
3. 获取 Measurement ID（格式：G-XXXXXXXXXX）

**需要添加的文件：**
- index.html
- tips.html
- daily.html
- levels.html
- download.html

---

### 4. 配置 Google AdSense

**位置：** 所有 `.ad-placeholder` 元素

**当前代码：**
```html
<div class="ad-placeholder">
    <p data-i18n="ad.placeholder">精彩游戏推荐</p>
    <small data-i18n="ad.note">AdSense 广告位</small>
</div>
```

**替换为：**
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

**如何获取：**
1. 访问 https://www.google.com/adsense
2. 申请账号（需要网站已上线）
3. 等待审核通过（1-7天）
4. 创建广告单元，获取代码

**注意：** AdSense 需要网站先部署上线并有一定流量才能申请。

---

### 5. 添加网站 Logo

**位置：** `images/logo.png`

**要求：**
- 尺寸：建议 200x200 像素
- 格式：PNG（支持透明背景）
- 大小：< 50KB

**使用位置：**
- JSON-LD 结构化数据中引用
- 可以在导航栏显示（需修改 HTML）

**操作：**
1. 创建 `images` 目录（如果不存在）
2. 将 logo 文件命名为 `logo.png`
3. 放入 `images/` 目录

---

### 6. 添加 Favicon

**位置：** 项目根目录

**文件名：** `favicon.ico`

**操作：**
1. 创建或下载一个 favicon（16x16 或 32x32 像素）
2. 放在项目根目录
3. 在所有 HTML 的 `<head>` 中添加：

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

**在线生成工具：**
- https://favicon.io
- https://realfavicongenerator.net

---

## 🟢 低优先级（可选配置）

### 7. 添加游戏截图

**位置：** `images/` 目录

**建议文件名：**
- `screenshot-1.png`
- `screenshot-2.png`
- `tip-example-1.png`
- `level-example-1.png`

**使用方法：**

替换 HTML 中的占位符：

```html
<!-- 当前 -->
<div class="tip-image-placeholder">
    <p data-i18n="tips.imagePlaceholder">📷 示意图占位</p>
</div>

<!-- 替换为 -->
<img src="images/tip-example-1.png" alt="技巧示意图" class="tip-image">
```

**图片要求：**
- 格式：PNG 或 JPG
- 宽度：建议 800-1200px
- 压缩后大小：< 200KB

---

### 8. 创建 sitemap.xml

**位置：** 项目根目录

**内容：** 参考 `DEPLOYMENT.md` 中的示例

**作用：** 帮助搜索引擎更好地索引你的网站

---

### 9. 创建 robots.txt

**位置：** 项目根目录

**内容：**
```
User-agent: *
Allow: /

Sitemap: https://你的域名.com/sitemap.xml
```

**作用：** 告诉搜索引擎爬虫如何抓取你的网站

---

## 📋 配置检查清单

完成配置后，使用此清单检查：

### 必须配置
- [ ] 替换所有 `https://你的域名.com` 为真实域名
- [ ] 配置 `js/affiliate.js` 中的 Affiliate ID
- [ ] 替换 App Store App ID
- [ ] 替换 Google Play 包名

### 建议配置
- [ ] 添加 Google Analytics 代码
- [ ] 添加网站 Logo (`images/logo.png`)
- [ ] 添加 Favicon (`favicon.ico`)

### 可选配置
- [ ] 配置 Google AdSense（需要网站上线后）
- [ ] 添加游戏截图
- [ ] 创建 `sitemap.xml`
- [ ] 创建 `robots.txt`

---

## 🔍 快速查找和替换指南

### 使用 VS Code（推荐）

1. 打开项目文件夹
2. 按 `Ctrl + Shift + F`（Windows）或 `Cmd + Shift + F`（Mac）
3. 在"查找"框输入要查找的内容
4. 在"替换"框输入新内容
5. 点击"全部替换"

### 使用记事本++

1. 按 `Ctrl + Shift + F`
2. 选择"在文件中查找"
3. 设置查找目录为项目文件夹
4. 输入查找和替换内容
5. 点击"全部替换"

---

## ⚠️ 注意事项

1. **备份原文件**：在批量替换前，建议先备份整个项目
2. **测试本地**：配置完成后，先在本地测试，确认无误再部署
3. **分步配置**：不要一次性配置所有内容，建议分步完成
4. **保存记录**：记录你配置的所有 ID 和密钥，以便后续维护

---

## 📞 需要帮助？

如果在配置过程中遇到问题：

1. **检查语法**：确保没有遗漏引号、括号等
2. **查看控制台**：浏览器按 F12，查看是否有错误信息
3. **参考文档**：查看 `README.md` 和 `DEPLOYMENT.md`

---

**配置完成后，你就可以开始部署了！** 🚀

参考 `DEPLOYMENT.md` 了解如何部署到 GitHub Pages、Vercel 或自己的服务器。
