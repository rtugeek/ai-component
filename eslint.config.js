import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  typescript: true,
  vue: true,
  jsonc: false,
  yaml: false,
  ignores: [
    '**/fixtures',
  ],
  rules: {
    'curly': ['error', 'multi-line'],
    'ts/no-use-before-define': 'off',
  },
})
