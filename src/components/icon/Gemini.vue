<script setup lang="ts">
withDefaults(defineProps<{
  color?: ''
  size: number
}>(), { color: '#4D6BFE', size: 24 })
</script>

<template>
  <div class="icon" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
      <defs>
        <linearGradient id="gemini-linear" x1="0%" x2="68.73%" y1="100%" y2="30.395%">
          <stop offset="0%" stop-color="#1C7DFF" />
          <stop offset="52.021%" stop-color="#1C69FF" />
          <stop offset="100%" stop-color="#F0DCD6" />
        </linearGradient>
      </defs>
      <path fill="url('#gemini-linear')" fill-rule="nonzero" d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12" />
    </svg>
  </div>
</template>

<style scoped lang="scss">

</style>
