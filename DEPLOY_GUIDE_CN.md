# Vercel 一键部署指南

本项目已经配置为支持 Vercel 一键部署，您可以轻松地将 GitHub Copilot API 代理部署到 Vercel 平台。

## 🚀 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnmhjklnm%2Fcopilot-api&env=GITHUB_TOKEN&envDescription=GitHub%20Personal%20Access%20Token%20for%20Copilot%20API&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Ftokens&project-name=copilot-api&repository-name=copilot-api)

点击上方按钮即可开始部署流程。

## 📋 部署前准备

在部署之前，您需要准备以下信息：

### 1. GitHub Personal Access Token

您需要一个有权限访问 GitHub Copilot 的 GitHub Personal Access Token。

#### 获取 Token 的步骤：

1. **安装并运行本地版本获取 Token：**
   ```bash
   npx copilot-api@latest auth
   ```
   按照提示完成认证流程，这将生成一个有效的 GitHub token。

2. **或者手动创建 GitHub Personal Access Token：**
   - 访问 [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
   - 点击 "Generate new token (classic)"
   - 给 token 一个描述性的名称
   - 选择所需的权限范围（需要能够访问 Copilot）
   - 点击 "Generate token"
   - 复制生成的 token（请妥善保存，离开页面后将无法再次查看）

### 2. 检查 Copilot 订阅

确保您的 GitHub 账户有有效的 Copilot 订阅：
- 个人订阅 (Individual)
- 企业订阅 (Business)
- 组织订阅 (Enterprise)

## 🔧 部署步骤

### 方法一：使用一键部署按钮

1. 点击上方的 "Deploy with Vercel" 按钮
2. 如果尚未登录，请登录您的 Vercel 账户
3. 选择 Git 提供商（GitHub、GitLab 或 Bitbucket）
4. 配置项目名称和仓库名称
5. 设置环境变量：
   - `GITHUB_TOKEN`: 您的 GitHub Personal Access Token
   - `ACCOUNT_TYPE`: (可选) 您的账户类型，默认为 `individual`
6. 点击 "Deploy" 开始部署

### 方法二：从现有仓库部署

1. Fork 或 Clone 此仓库到您的 GitHub 账户
2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
3. 点击 "New Project"
4. 选择您的仓库
5. 配置环境变量（如上所述）
6. 点击 "Deploy"

## ⚙️ 环境变量配置

| 变量名 | 必需 | 默认值 | 描述 |
|--------|------|--------|------|
| `GITHUB_TOKEN` | ✅ | - | GitHub Personal Access Token |
| `ACCOUNT_TYPE` | ❌ | `individual` | GitHub Copilot 账户类型 (`individual`, `business`, `enterprise`) |
| `NODE_ENV` | ❌ | `production` | Node.js 环境 |

## 🌐 部署后使用

部署成功后，您将获得一个 Vercel URL（例如：`https://your-app.vercel.app`），您可以用它来访问以下端点：

### OpenAI 兼容端点
- `POST /v1/chat/completions` - 聊天补全
- `GET /v1/models` - 可用模型列表
- `POST /v1/embeddings` - 文本嵌入

### Anthropic 兼容端点
- `POST /v1/messages` - 消息接口
- `POST /v1/messages/count_tokens` - Token 计数

### 监控端点
- `GET /usage` - 使用情况统计
- `GET /token` - 当前 Token 信息

## 🔧 本地开发（可选）

如果您想在本地开发或测试：

1. Clone 仓库：
   ```bash
   git clone https://github.com/nmhjklnm/copilot-api.git
   cd copilot-api
   ```

2. 安装依赖：
   ```bash
   bun install
   # 或者
   npm install
   ```

3. 创建环境变量文件：
   ```bash
   cp .env.example .env
   ```

4. 编辑 `.env` 文件，添加您的 GitHub token

5. 启动开发服务器：
   ```bash
   bun run dev:vercel
   # 或者
   npm run dev:vercel
   ```

## 🔍 故障排除

### 常见问题

1. **部署失败 - "GitHub token not found"**
   - 确保您正确设置了 `GITHUB_TOKEN` 环境变量
   - 检查 token 是否有效且未过期

2. **认证失败**
   - 确保您的 GitHub 账户有有效的 Copilot 订阅
   - 确保 token 有正确的权限

3. **API 调用失败**
   - 检查您的 Copilot 使用配额是否已用完
   - 确保请求格式正确

### 查看日志

在 Vercel Dashboard 中：
1. 进入您的项目
2. 点击 "Functions" 标签
3. 选择相应的函数
4. 查看实时日志

## 📚 更多信息

- [原始项目文档](./README.md)
- [Vercel 文档](https://vercel.com/docs)
- [GitHub Copilot 文档](https://docs.github.com/en/copilot)

## ⚠️ 注意事项

1. **配额限制**: 请注意您的 GitHub Copilot 使用配额，避免过度使用
2. **安全性**: 不要在公共场所或不安全的环境中暴露您的 GitHub token
3. **费用**: Vercel 有免费额度，但超出后可能产生费用
4. **合规性**: 请确保您的使用符合 GitHub Copilot 的服务条款

---

如果您遇到任何问题，请查看 [Issues](https://github.com/nmhjklnm/copilot-api/issues) 页面或创建新的 issue。