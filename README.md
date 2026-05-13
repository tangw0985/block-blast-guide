# Block Blast 攻略网站

这是一个完整的《Block Blast!》（方块爆破）游戏攻略网站，提供全面的游戏指南、技巧和每日挑战解法。

## 📁 项目结构

```
block-blast-guide/
├── index.html          # 首页
├── tips.html           # 技巧攻略页
├── daily.html          # 每日挑战页
├── levels.html         # 关卡攻略页
├── download.html       # 资源下载页
├── css/
│   └── styles.css      # 主样式文件（包含暗色/亮色主题）
├── js/
│   ├── main.js         # 主要交互功能
│   ├── levels.js       # 关卡筛选功能
│   ├── daily.js        # 每日挑战数据
│   └── i18n.js         # 国际化（简化版）
├── images/             # 图片资源目录（预留）
├── data/               # 数据文件目录（预留）
└── README.md           # 项目说明文档
```

## ✨ 功能特点

### 已实现功能
- ✅ **响应式设计** - 完美适配手机、平板、电脑
- ✅ **暗色/亮色主题切换** - 支持两种主题模式，自动保存偏好
- ✅ **中英文切换** - 完整的国际化支持，一键切换语言
- ✅ **5个完整页面** - 首页、技巧、每日挑战、关卡、下载
- ✅ **12条实用技巧** - 从初级到高级，覆盖所有技能等级
- ✅ **移动端菜单** - 汉堡菜单，适配小屏幕
- ✅ **平滑滚动** - 页面内锚点平滑跳转
- ✅ **关卡筛选** - 按难度筛选关卡（简单/中等/困难）
- ✅ **卡片动画** - 滚动时淡入效果，悬停交互
- ✅ **Hero 动画** - 漂浮方块和棋盘动画
- ✅ **SEO 优化** - 完整的 meta 标签和 JSON-LD 结构化数据
- ✅ **Affiliate 链接框架** - 支持下载链接和推荐工具的跟踪
- ✅ **广告位占位** - 预留 AdSense 接入位置
- ✅ **统计占位** - 预留 Google Analytics 接入位置

### 待完善功能
- ⏳ **更多攻略内容** - 可以批量添加更多技巧和关卡
- ⏳ **评论系统** - 用户评论功能
- ⏳ **真实游戏截图** - 添加游戏截图和示意图
- ⏳ **搜索功能** - 站内搜索

## 🚀 如何使用

### 方法 1：直接打开（最简单）
1. 进入项目目录：`D:\公司\claude code project\block-blast-guide`
2. 双击 `index.html` 文件
3. 网站会在默认浏览器中打开

### 方法 2：使用本地服务器（推荐）

#### 使用 Python（如果已安装）
```bash
# 进入项目目录
cd "D:\公司\claude code project\block-blast-guide"

# Python 3
python -m http.server 8000

# 然后在浏览器访问 http://localhost:8000
```

#### 使用 Node.js（如果已安装）
```bash
# 安装 http-server（只需一次）
npm install -g http-server

# 进入项目目录
cd "D:\公司\claude code project\block-blast-guide"

# 启动服务器
http-server

# 然后在浏览器访问显示的地址（通常是 http://localhost:8080）
```

#### 使用 VS Code（如果已安装）
1. 用 VS Code 打开项目文件夹
2. 安装 "Live Server" 扩展
3. 右键点击 `index.html`，选择 "Open with Live Server"

## 🎨 主题切换

网站支持暗色和亮色两种主题：
- 点击右上角的 🌙/☀️ 按钮切换主题
- 主题选择会自动保存到浏览器本地存储
- 下次访问时会自动加载上次选择的主题

## 🌐 语言切换

网站支持中文和英文：
- 点击右上角的 "EN" / "中文" 按钮切换语言
- 语言选择会自动保存到浏览器本地存储
- 所有页面内容都会实时切换
- 默认语言：中文

## 📱 响应式设计

网站在不同设备上的表现：
- **桌面端（>1024px）**：双栏布局，侧边栏固定
- **平板端（768px-1024px）**：单栏布局，侧边栏移到底部
- **手机端（<768px）**：汉堡菜单，完全适配小屏幕

## 🌐 部署到 GitHub Pages

### 步骤 1：创建 GitHub 仓库
1. 登录 GitHub
2. 创建新仓库（例如：`block-blast-guide`）
3. 不要初始化 README、.gitignore 或 license

### 步骤 2：上传代码
```bash
# 进入项目目录
cd "D:\公司\claude code project\block-blast-guide"

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Block Blast 攻略网站"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/block-blast-guide.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 3：启用 GitHub Pages
1. 进入仓库的 Settings
2. 找到 "Pages" 选项
3. 在 "Source" 下选择 "main" 分支
4. 点击 "Save"
5. 等待几分钟，网站就会发布到：`https://你的用户名.github.io/block-blast-guide/`

## 🔧 自定义修改

### 修改颜色主题
编辑 `css/styles.css` 文件中的 CSS 变量：

```css
:root {
    --primary-color: #6366f1;    /* 主色调 */
    --secondary-color: #8b5cf6;  /* 次要色 */
    --accent-color: #ec4899;     /* 强调色 */
}
```

### 添加更多技巧
编辑 `tips.html`，复制现有的技巧卡片结构，修改内容即可。

### 添加更多每日挑战
编辑 `js/daily.js`，在 `dailyChallenges` 对象中添加新的日期和挑战数据。

### 添加更多关卡
编辑 `levels.html`，复制现有的关卡卡片结构，修改内容和难度属性。

## 📊 接入 Google Analytics

在所有 HTML 文件的 `</head>` 标签前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=你的GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '你的GA-ID');
</script>
```

## 💰 接入 Google AdSense

将广告位占位符替换为实际的 AdSense 代码：

```html
<!-- 替换 .ad-placeholder 内容 -->
<div class="ad-placeholder">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=你的客户端ID"
         crossorigin="anonymous"></script>
    <!-- 广告单元代码 -->
</div>
```

## 🔗 配置 Affiliate 链接

编辑 `js/affiliate.js` 文件，替换占位符为真实的 affiliate 信息：

```javascript
const affiliateConfig = {
    // App Store affiliate ID
    appStore: {
        partnerId: '你的Apple Affiliate ID',
        campaignToken: '你的Campaign Token'
    },

    // Google Play affiliate
    googlePlay: {
        referrer: 'utm_source=website&utm_medium=download&utm_campaign=block_blast_guide'
    },

    // 加速器 affiliate 链接
    accelerators: {
        acceleratorA: {
            url: 'https://加速器A官网.com',
            affiliateParam: '?ref=你的Affiliate ID'
        },
        acceleratorB: {
            url: 'https://加速器B官网.com',
            affiliateParam: '?aff=你的Affiliate Code'
        }
    }
};
```

### Affiliate 链接使用说明

1. **App Store 链接**：需要加入 Apple Affiliate Program
2. **Google Play 链接**：使用 UTM 参数跟踪
3. **加速器链接**：联系加速器厂商获取 affiliate ID
4. **点击跟踪**：自动发送到 Google Analytics（如果已配置）

所有带 `data-affiliate` 属性的链接都会自动跟踪点击事件。

## 🌍 完善国际化功能

如需添加更多语言或完善翻译：

1. 编辑 `js/i18n.js`
2. 在 `translations` 对象中添加新语言：

```javascript
const translations = {
    'zh-CN': { /* 中文翻译 */ },
    'en': { /* 英文翻译 */ },
    'ja': { /* 日文翻译 - 新增 */ }
};
```

3. 为所有需要翻译的元素添加 `data-i18n` 属性：

```html
<h1 data-i18n="page.title">标题</h1>
```

4. 在翻译对象中添加对应的键值对

## 🐛 已知问题

- 图片资源需要手动添加（目前使用渐变色占位）
- 评论功能需要接入第三方服务（如 Disqus）
- Affiliate 链接需要替换为真实的 ID

## 📝 技术栈

- **HTML5** - 语义化标签
- **CSS3** - CSS 变量、Grid、Flexbox、动画
- **JavaScript** - 原生 JS，无需框架
- **响应式设计** - 移动优先
- **国际化** - 完整的中英文支持
- **SEO** - JSON-LD 结构化数据

## 📄 浏览器兼容性

支持所有现代浏览器：
- Chrome / Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 📞 联系方式

如有问题或建议，欢迎反馈！

## 📜 许可证

本项目仅供学习和个人使用。

---

**制作时间：** 2026年5月13日  
**版本：** 2.0.0  
**作者：** Block Blast 攻略站

## 📋 更新日志

### v2.0.0 (2026-05-13)
- ✅ 新增：完整的中英文切换功能
- ✅ 新增：Affiliate 链接跟踪框架
- ✅ 新增：JSON-LD 结构化数据（SEO 优化）
- ✅ 新增：Hero 区域漂浮方块动画
- ✅ 新增：美化的广告位样式
- ✅ 扩充：技巧攻略从 5 条增加到 12 条
- ✅ 优化：所有卡片的视觉效果和交互动画
- ✅ 优化：响应式设计细节

### v1.0.0 (2026-05-13)
- ✅ 初始版本发布
- ✅ 5个完整页面
- ✅ 暗色/亮色主题切换
- ✅ 响应式设计
- ✅ 基础 SEO 优化团队
