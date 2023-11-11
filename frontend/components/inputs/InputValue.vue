<template>
  <div class="flex flex-col space-y-1">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border p-2 border-secondary rounded-md outline-none"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  id: string;
  type: 'email' | 'text' | 'password';
  modelValue: string;
  label?: string;
  placeholder?: string;
  widthFull?: boolean;
}

withDefaults(defineProps<Props>(), {
  widthFull: false,
});

defineEmits(['update:modelValue']);
</script>
