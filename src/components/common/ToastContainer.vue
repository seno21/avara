<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="pointer-events-auto bg-[#1A1A1A] text-white p-4 shadow-2xl border border-stone-800 flex items-start gap-3 rounded-2xl animate-fade-in"
      >
        <div class="p-1.5 text-[#AD9277] bg-stone-800/80 rounded-full shrink-0">
          <CheckCircle v-if="toast.type === 'success'" class="w-4 h-4 text-[#AD9277]" />
          <Info v-else-if="toast.type === 'info'" class="w-4 h-4 text-[#AD9277]" />
          <AlertCircle v-else class="w-4 h-4 text-amber-500" />
        </div>

        <div class="flex-1 text-xs font-sans">
          <div class="font-semibold text-sm text-white tracking-wide uppercase font-serif">{{ toast.title }}</div>
          <div class="text-[#D1C7BD] mt-0.5 leading-relaxed">{{ toast.message }}</div>
        </div>

        <button
          @click="toastStore.removeToast(toast.id)"
          class="text-gray-400 hover:text-white transition-colors p-1"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '../../store/toastStore';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-vue-next';

const toastStore = useToastStore();
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
