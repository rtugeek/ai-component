import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

import { reactive, ref } from 'vue'
import type Button from '../Button.vue'
import AiConfigForm from '@/components/AiConfigForm.vue'
import type { AiConfig } from '@/ai/AiConfig'

const meta = {
  title: 'Form/AiConfigForm',
  component: AiConfigForm,
  render: () => {
    return {
      components: { AiConfigForm },
      setup: () => {
        const model = reactive<AiConfig>({ apiKey: '', model: '', url: '' })
        const name = ref('DeepSeek')
        return { model, name }
      },
      template: '<ai-config-form v-model="model" v-model:name="name"/>',
    }
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number' },
  },
  args: {
    primary: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
}
