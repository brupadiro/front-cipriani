<template>
  <div :class="`vf-row`">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  gap?: string;
}>();
</script>
