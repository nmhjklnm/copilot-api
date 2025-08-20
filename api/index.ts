import consola from "consola"
import { handle } from "hono/vercel"

import { state } from "../src/lib/state"
import { cacheModels, cacheVSCodeVersion } from "../src/lib/utils"
import { server } from "../src/server"
import { getCopilotToken } from "../src/services/github/get-copilot-token"

// Cache for serverless environment
let initialized = false
const tokenCache: {
  copilotToken?: string
  tokenExpiry?: number
} = {}

async function initializeServerless() {
  if (initialized) return

  try {
    // Get GitHub token from environment variable
    const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
    if (!githubToken) {
      throw new Error(
        "GitHub token not found. Please set GITHUB_TOKEN environment variable.",
      )
    }

    // Set state
    state.githubToken = githubToken
    state.accountType = process.env.ACCOUNT_TYPE || "individual"

    // Initialize required data
    await cacheVSCodeVersion()

    // Get or refresh Copilot token
    const now = Date.now()
    if (
      tokenCache.copilotToken
      && tokenCache.tokenExpiry
      && now < tokenCache.tokenExpiry
    ) {
      state.copilotToken = tokenCache.copilotToken
    } else {
      const { token, refresh_in } = await getCopilotToken()
      state.copilotToken = token
      // eslint-disable-next-line require-atomic-updates
      tokenCache.copilotToken = token
      // eslint-disable-next-line require-atomic-updates
      tokenCache.tokenExpiry = now + (refresh_in - 60) * 1000
    }

    // Cache models
    await cacheModels()

    // eslint-disable-next-line require-atomic-updates
    initialized = true
    consola.info("Serverless environment initialized successfully")
  } catch (error) {
    consola.error("Failed to initialize serverless environment:", error)
    throw error
  }
}

// Add middleware to initialize on first request
server.use("*", async (c, next) => {
  if (!initialized) {
    try {
      await initializeServerless()
    } catch (error) {
      return c.json(
        {
          error: "Server initialization failed",
          message: error instanceof Error ? error.message : "Unknown error",
        },
        500,
      )
    }
  }
  await next()
})

// Add a root endpoint with info
server.get("/", (c) =>
  c.json({
    message: "Copilot API Server Running on Vercel",
    version: "0.5.12",
    endpoints: {
      openai: ["/v1/chat/completions", "/v1/models", "/v1/embeddings"],
      anthropic: ["/v1/messages", "/v1/messages/count_tokens"],
      monitoring: ["/usage", "/token"],
    },
  }),
)

export default handle(server)
