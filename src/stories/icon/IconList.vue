<script setup lang="ts">
import Gemini from '@/components/icon/Gemini.vue'
import OpenAI from '@/components/icon/OpenAI.vue'
import Qwen from '@/components/icon/Qwen.vue'
import TencentCloud from '@/components/icon/TencentCloud.vue'
import DeepSeek from '@/components/icon/DeepSeek.vue'
import Spark from '@/components/icon/Spark.vue'
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-2">
      <DeepSeek :size="32" />
      <DeepSeek :size="24" />
      <DeepSeek :size="16" />
    </div>

    <div class="flex gap-2">
      <Gemini :size="32" />
      <Gemini :size="24" />
      <Gemini :size="16" />
    </div>

    <div class="flex gap-2">
      <OpenAI :size="32" />
      <OpenAI :size="24" />
      <OpenAI :size="16" />
    </div>

    <div class="flex gap-2">
      <Qwen :size="32" />
      <Qwen :size="24" />
      <Qwen :size="16" />
    </div>

    <div class="flex gap-2">
      <TencentCloud :size="32" />
      <TencentCloud :size="24" />
      <TencentCloud :size="16" />
    </div>

    <div class="flex gap-2">
      <Spark :size="32" />
      <Spark :size="24" />
      <Spark :size="16" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
