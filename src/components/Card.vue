<script setup lang="ts">

</script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped lang="css">
.card{
  background: var(--surface-background);
  border: var(--surface-border);
  border-radius: var(--border-radius);
}
</style>
