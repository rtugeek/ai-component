<script setup lang="ts">
withDefaults(defineProps<{
  color?: ''
  size: number
}>(), { color: '#4D6BFE', size: 24 })
</script>

<template>
  <div class="icon" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg :fill="color" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
      <slot />
    </svg>
  </div>
</template>

<style scoped lang="scss">

</style>
