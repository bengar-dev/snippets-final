<template>
  <div class="flex gap-2 w-full p-4 rounded-lg bg-white" :class="col ? 'flex-col' : 'flex-row'">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  col?: boolean;
}

withDefaults(defineProps<Props>(), {
  col: false,
});
</script>
