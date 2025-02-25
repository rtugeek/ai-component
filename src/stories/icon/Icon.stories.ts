import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

import type Button from '../Button.vue'
import IconList from '@/stories/icon/IconList.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Icon',
  component: IconList,
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
