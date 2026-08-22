import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastMessage[]>([]);

  function showToast(title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    toasts.value.push({ id, type, title, message });

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }

  return {
    toasts,
    showToast,
    removeToast
  };
});
