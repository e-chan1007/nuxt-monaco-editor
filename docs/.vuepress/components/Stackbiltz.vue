<template>
  <iframe :src="'https://stackblitz.com/edit/' + src" width="100%" height="400px" scrolling="no" frameborder="no" />
</template>

<script lang="ts" setup>
defineProps<{ src: string }>()
</script>

<style lang="scss" scoped>
iframe {
  border: 1px solid var(--c-border);
  border-radius: 6px;
}
</style>
