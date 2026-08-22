import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '../types/Product';
import { useToastStore } from './toastStore';

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistItems = ref<Product[]>([]);
  const toastStore = useToastStore();

  function toggleWishlist(product: Product) {
    const index = wishlistItems.value.findIndex(item => item.id === product.id);
    if (index > -1) {
      wishlistItems.value.splice(index, 1);
      toastStore.showToast('Wishlist Diperbarui', `${product.name} dihapus dari wishlist.`, 'info');
    } else {
      wishlistItems.value.push(product);
      toastStore.showToast('Wishlist Diperbarui', `${product.name} disimpan ke favorit Anda.`, 'success');
    }
  }

  function isInWishlist(productId: string): boolean {
    return wishlistItems.value.some(item => item.id === productId);
  }

  const wishlistCount = computed(() => wishlistItems.value.length);

  return {
    wishlistItems,
    wishlistCount,
    toggleWishlist,
    isInWishlist
  };
});
