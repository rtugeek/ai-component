export interface AiConfig {
  apiKey: string
  url: string
  model: string
  temperature?: number
  maxTokens?: number
}

export function getConfigFromUrl(url: string) {
  const urlParams = new URLSearchParams(url)
  const apiKey = urlParams.get('apiKey')
  const model = urlParams.get('model')
  const temperature = urlParams.get('temperature')
  const maxTokens = urlParams.get('maxTokens')
  return {
    apiKey,
    model,
    temperature: temperature ? Number.parseFloat(temperature) : undefined,
    maxTokens: maxTokens ? Number.parseInt(maxTokens) : undefined,
  }
}
