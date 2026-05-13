# 🎯 你需要做的事情 - 完整操作指南

这份文档专门为你准备，列出了所有需要你手动完成的步骤。

---

## 📝 总览

网站已经 **95% 完成**，剩下的工作主要是：

1. ✅ **购买域名**（可选，不买也能用）
2. ✅ **发布到 GitHub**（免费托管）
3. ✅ **配置一些 ID**（可以先跳过，后续再配）

---

## 🌐 第一步：购买域名（可选）

### 要不要买域名？

**不买域名：**
- ✅ 完全免费
- ✅ 可以直接用 GitHub 提供的域名：`你的用户名.github.io/block-blast-guide`
- ❌ 域名比较长，不够专业

**买域名：**
- ✅ 域名简短专业，如：`blockblast-guide.com`
- ✅ 更容易记忆和推广
- ❌ 需要花钱（约 ¥50-100/年）

### 如果决定买域名

#### 推荐的域名注册商

**国内：**
1. **阿里云（万网）** - https://wanwang.aliyun.com
   - 价格：¥55-80/年（.com）
   - 优点：中文界面，支付方便
   - 需要：实名认证

2. **腾讯云** - https://dnspod.cloud.tencent.com
   - 价格：¥55-80/年（.com）
   - 优点：中文界面，支付方便
   - 需要：实名认证

**国外：**
1. **Namecheap** - https://www.namecheap.com
   - 价格：$8-12/年（.com）
   - 优点：便宜，无需实名
   - 缺点：需要信用卡或 PayPal

2. **GoDaddy** - https://www.godaddy.com
   - 价格：$10-15/年（.com）
   - 优点：知名度高
   - 缺点：续费贵

#### 购买步骤（以阿里云为例）

1. **注册账号**
   - 访问 https://wanwang.aliyun.com
   - 点击"注册"，用手机号注册

2. **搜索域名**
   - 在搜索框输入你想要的域名，如：`blockblast-guide`
   - 选择后缀：`.com`（最常见）、`.net`、`.cn` 等
   - 点击"查询"

3. **选择域名**
   - 如果显示"可注册"，点击"加入清单"
   - 如果已被注册，换一个名字

4. **结算购买**
   - 选择购买年限（建议 1 年）
   - 勾选"域名信息模板"（需要实名认证）
   - 支付（支持支付宝、微信）

5. **实名认证**
   - 购买后，上传身份证照片
   - 等待审核（1-3 天）

#### 域名建议

- `blockblast-guide.com` - 最直接
- `blockblast-tips.com` - 强调技巧
- `blockblast-pro.com` - 专业感
- `bbguide.com` - 简短（如果可用）

---

## 🚀 第二步：发布到 GitHub（必须）

### 为什么用 GitHub？

- ✅ **完全免费**
- ✅ **自动 HTTPS**（安全）
- ✅ **全球 CDN**（访问快）
- ✅ **自动部署**（推送代码即更新）

### 详细步骤

#### 1. 注册 GitHub 账号

1. 访问 https://github.com
2. 点击右上角 "Sign up"（注册）
3. 输入邮箱、密码、用户名
4. 验证邮箱
5. 完成注册

**用户名建议：**
- 简短易记
- 可以用你的名字或品牌名
- 例如：`blockblast-guide`、`bbguide` 等

#### 2. 安装 Git（如果还没有）

**检查是否已安装：**
打开命令行（CMD），输入：
```bash
git --version
```

如果显示版本号，说明已安装，跳到步骤 3。

**如果没有安装：**

1. 访问 https://git-scm.com/download/win
2. 下载 Windows 版本
3. 双击安装，一路"下一步"（保持默认设置）
4. 安装完成后，重新打开命令行

#### 3. 配置 Git

打开命令行（CMD 或 PowerShell），输入：

```bash
# 配置用户名（替换为你的 GitHub 用户名）
git config --global user.name "你的GitHub用户名"

# 配置邮箱（替换为你的 GitHub 邮箱）
git config --global user.email "你的邮箱@example.com"
```

#### 4. 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角 "+" → "New repository"
3. 填写信息：
   - **Repository name**（仓库名）：`block-blast-guide`
   - **Description**（描述）：`Block Blast 游戏攻略网站`
   - **Public**（公开）：选择这个
   - **不要勾选** "Add a README file"
4. 点击 "Create repository"

#### 5. 上传代码到 GitHub

**重要：** 复制下面的命令，**逐行执行**（不要一次性复制所有）

打开命令行，输入：

```bash
# 1. 进入项目目录
cd "D:\公司\claude code project\block-blast-guide"

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件
git add .

# 4. 提交（创建第一个版本）
git commit -m "Initial commit: Block Blast 攻略网站 v2.0.0"

# 5. 添加远程仓库（⚠️ 替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/block-blast-guide.git

# 6. 重命名分支为 main
git branch -M main

# 7. 推送到 GitHub
git push -u origin main
```

**第 5 步的仓库地址在哪里找？**
- 在 GitHub 仓库页面，点击绿色的 "Code" 按钮
- 复制 HTTPS 地址（类似：`https://github.com/你的用户名/block-blast-guide.git`）

**如果提示输入用户名和密码：**
- 用户名：你的 GitHub 用户名
- 密码：需要使用 Personal Access Token（不是登录密码）

**如何获取 Personal Access Token：**
1. GitHub 右上角头像 → Settings
2. 左侧菜单最下方 → Developer settings
3. Personal access tokens → Tokens (classic)
4. Generate new token (classic)
5. 勾选 `repo` 权限
6. 生成后复制 token（只显示一次，保存好）
7. 在命令行输入密码时，粘贴这个 token

#### 6. 启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 "Settings"（设置）
3. 左侧菜单找到 "Pages"
4. 在 "Source" 下拉菜单：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
5. 点击 "Save"
6. 等待 1-2 分钟

**完成！** 你的网站地址是：
```
https://你的GitHub用户名.github.io/block-blast-guide/
```

#### 7. 绑定自定义域名（如果你买了域名）

**在 GitHub 设置：**
1. 还是在 Settings → Pages
2. "Custom domain" 输入你的域名（如：`blockblast-guide.com`）
3. 点击 "Save"

**在域名服务商设置 DNS：**

如果用阿里云：
1. 进入域名控制台
2. 点击"解析"
3. 添加记录：
   - 记录类型：`CNAME`
   - 主机记录：`www`
   - 记录值：`你的GitHub用户名.github.io`
   - TTL：`10分钟`
4. 再添加一条：
   - 记录类型：`A`
   - 主机记录：`@`
   - 记录值：`185.199.108.153`（GitHub 的 IP）
   - TTL：`10分钟`

等待 10-30 分钟，DNS 生效后就可以用你的域名访问了！

---

## 🔧 第三步：配置 ID（可以先跳过）

这些配置不影响网站运行，可以等网站上线后再慢慢配置。

### 可以先跳过的配置

1. **Google Analytics**（访客统计）
   - 等网站有流量后再配置
   - 参考 `CONFIG.md` 文档

2. **Google AdSense**（广告）
   - 需要网站上线并有一定流量才能申请
   - 参考 `CONFIG.md` 文档

3. **Affiliate 链接**（推广链接）
   - 需要申请各个平台的 affiliate 账号
   - 参考 `CONFIG.md` 文档

### 必须配置的（很简单）

只有一个：**替换域名占位符**

**如果你买了域名：**

使用文本编辑器（记事本、VS Code 等）：
1. 打开项目文件夹
2. 全局搜索：`https://你的域名.com`
3. 替换为：`https://你的真实域名.com`
4. 保存所有文件
5. 重新推送到 GitHub：
   ```bash
   git add .
   git commit -m "更新域名"
   git push
   ```

**如果你没买域名：**
- 暂时不用管，保持原样即可
- 等以后买了域名再替换

---

## 📋 操作检查清单

### 必须完成
- [ ] 注册 GitHub 账号
- [ ] 安装 Git
- [ ] 创建 GitHub 仓库
- [ ] 上传代码到 GitHub
- [ ] 启用 GitHub Pages
- [ ] 测试网站是否能访问

### 可选完成
- [ ] 购买域名
- [ ] 绑定自定义域名
- [ ] 配置 Google Analytics
- [ ] 配置 Google AdSense
- [ ] 配置 Affiliate 链接

---

## ❓ 常见问题

### Q1: 我不会用命令行怎么办？
**A:** 可以使用 GitHub Desktop（图形界面工具）：
1. 下载：https://desktop.github.com
2. 安装后登录 GitHub 账号
3. File → Add Local Repository → 选择项目文件夹
4. 点击 "Publish repository"

### Q2: 推送代码时报错怎么办？
**A:** 常见错误：
- `Permission denied`：需要配置 Personal Access Token
- `Repository not found`：检查仓库地址是否正确
- `Failed to push`：检查网络连接

### Q3: GitHub Pages 显示 404？
**A:** 检查：
1. Settings → Pages 是否已启用
2. 分支是否选择了 `main`
3. 等待 2-5 分钟让 GitHub 构建

### Q4: 域名解析不生效？
**A:** 
- DNS 生效需要时间（10分钟到24小时）
- 检查 DNS 记录是否配置正确
- 使用 https://dnschecker.org 检查解析状态

### Q5: 网站可以访问，但样式乱了？
**A:** 
- 检查 CSS/JS 文件路径是否正确
- 浏览器按 F12，查看 Console 是否有错误
- 清除浏览器缓存后重试

---

## 🎯 推荐的操作顺序

**第一天：**
1. 注册 GitHub 账号
2. 安装 Git
3. 上传代码到 GitHub
4. 启用 GitHub Pages
5. 测试网站

**第二天：**
1. 考虑是否购买域名
2. 如果买了，配置域名解析

**第三天及以后：**
1. 等网站有流量后，配置 Google Analytics
2. 流量稳定后，申请 Google AdSense
3. 慢慢配置 Affiliate 链接

---

## 📞 需要帮助？

如果遇到问题：
1. 查看 `README.md` - 项目总览
2. 查看 `DEPLOYMENT.md` - 详细部署指南
3. 查看 `CONFIG.md` - 配置指南
4. 搜索错误信息（复制错误信息到 Google）

---

**祝你顺利完成部署！** 🎉

有任何问题随时问我！
