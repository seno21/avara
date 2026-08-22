<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-widest font-semibold rounded-full shadow-2xs',
      variant === 'bronze'
        ? 'bg-[#AD9277] text-white'
        : variant === 'cream'
        ? 'bg-[#F6F4EE] text-[#3D2B1F] border border-[#E3D9CE]'
        : variant === 'dark'
        ? 'bg-[#1A1A1A] text-white'
        : 'bg-emerald-800 text-white'
    ]"
  >
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'bronze' | 'cream' | 'dark' | 'success';
}>(), {
  variant: 'bronze'
});
</script>
