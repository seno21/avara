<template>
  <button
    :class="[
      'px-6 py-3.5 transition-all duration-300 font-sans tracking-widest uppercase text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98] rounded-full',
      variant === 'primary'
        ? 'bg-[#AD9277] text-white hover:bg-[#8C755E] hover:shadow-md hover:shadow-[#AD9277]/20'
        : variant === 'dark'
        ? 'bg-[#1A1A1A] text-white hover:bg-[#3D2B1F] hover:shadow-md'
        : variant === 'outline'
        ? 'bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#AD9277] hover:border-[#AD9277] hover:text-white'
        : variant === 'outline-bronze'
        ? 'bg-transparent border border-[#AD9277] text-[#AD9277] hover:bg-[#AD9277] hover:text-white'
        : 'bg-transparent text-[#1A1A1A] hover:text-[#AD9277]',
      fullWidth ? 'w-full' : '',
      disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
    ]"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'dark' | 'outline' | 'outline-bronze' | 'ghost';
  fullWidth?: boolean;
  disabled?: boolean;
}>(), {
  variant: 'primary',
  fullWidth: false,
  disabled: false
});

const emit = defineEmits(['click']);
</script>
