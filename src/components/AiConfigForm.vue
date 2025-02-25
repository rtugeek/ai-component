<script setup lang="ts">
import type { ElForm, FormRules } from 'element-plus'
import { BrowserWindowApi } from '@widget-js/core'
import type { PropType } from 'vue'
import { computed, reactive, ref } from 'vue'
import { useDark } from '@vueuse/core'
import type { AiConfig } from '@/ai/AiConfig'
import type { AiService } from '@/ai/AiService'
import { aiServiceList } from '@/ai/AiService'

const emits = defineEmits(['submit'])
const formRef = ref<InstanceType<typeof ElForm>>()
const selectedServiceName = defineModel('name', { type: String, default: 'DeepSeek' })
const selectedService = computed(() => {
  return aiServiceList.find(it => it.name === selectedServiceName.value)
})
const isDark = useDark()
isDark.value = true

// 去除响应式
const configModel = defineModel({ type: Object as PropType<AiConfig>, default: {
  apiKey: '',
  url: '',
  model: '',
} })
const rules = reactive<FormRules>({
  apiKey: [
    { required: true, message: '请输入API KEY', trigger: 'change' },
  ],
  url: [
    {
      required: true,
      message: '请输入URL',
      trigger: 'change',
    },
  ],
  model: [
    {
      required: true,
      message: '请输入模型',
      trigger: 'change',
    },
  ],
})

async function save() {
  if (!formRef.value) {
    return
  }
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      emits('submit', configModel.value)
    }
  })
}

function onServiceClick(service: AiService) {
  selectedServiceName.value = service.name
  configModel.value.url = service.apiUrl
  configModel.value.model = service.chatModel
}
</script>

<template>
  <ElForm ref="formRef" label-width="80" :rules="rules" :model="configModel">
    <ElFormItem label="AI服务">
      <div class="flex gap-2">
        <template v-for="item in aiServiceList" :key="item.name">
          <ElTooltip :content="item.name" placement="top">
            <component :is="item.logo" :class="{ active: selectedServiceName === item.name }" class="cursor-pointer" :alt="item.name" @click="onServiceClick(item)" />
          </ElTooltip>
        </template>
      </div>
    </ElFormItem>
    <ElFormItem v-if="selectedService" label="申请链接">
      <ElText class="cursor-pointer" @click="BrowserWindowApi.openUrl(selectedService.url, { external: true })">
        查看 {{ selectedService.name }} 文档
      </ElText>
    </ElFormItem>
    <ElFormItem label="API KEY" required prop="apiKey">
      <ElInput v-model="configModel.apiKey" placeholder="" />
    </ElFormItem>
    <ElFormItem label="请求地址" required prop="url">
      <ElInput v-model="configModel.url" placeholder="必须以https://开头，例如：https://api.deepseek.com" />
    </ElFormItem>
    <ElFormItem label="模型" required prop="model">
      <ElInput v-model="configModel.model" placeholder="例如：deepseek-chat" />
    </ElFormItem>
    <el-button type="primary" class="w-full" @click="save">
      确 定
    </el-button>
  </ElForm>
</template>

<style scoped lang="css">
.icon{
  opacity: 0.4;
}
.icon.active{
  opacity: 1;
}
</style>
