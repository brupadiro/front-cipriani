<template>
  <div :class="`grid grid-cols-${cols}`">
    <slot>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cols: number;
}>();
</script>
