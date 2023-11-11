<template>
  <button :type="type" class="flex items-center space-x-2 p-2 px-4 rounded-md" :class="handleVariant(variant)">
    <div v-if="icon" class="text-xl"><Icon :name="icon" color="white" /></div>
    <span> {{ value }}</span>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  value: string;
  type: 'button' | 'submit';
  variant?: Variant;
  icon?: string;
}

type Variant = 'secondary' | 'github';

defineProps<Props>();

const handleVariant = (variant: Variant): string => {
  switch (variant) {
    case 'secondary':
      return 'text-white bg-secondary hover:bg-violet-700/90';
    case 'github':
      return 'text-white bg-stone-500 hover:bg-stone-700';
    default:
      return 'text-white bg-red-500';
  }
};
</script>
