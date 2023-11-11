<template>
  <div class="relative my-4 min-w-full h-[2px] bg-white">
    <div class="absolute m-auto w-fit left-0 right-0 bottom-0 -top-3 bg-primary">
      <span class="text-white px-4">{{ value }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  value: string;
}

defineProps<Props>();
</script>
