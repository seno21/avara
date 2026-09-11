import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Product } from '../types/Product';
import { useToastStore } from './toastStore';
import { useAuthStore } from './authStore';
import { useProductStore } from './productStore';

const LOCAL_WISHLIST_KEY = 'avara_guest_wishlist';

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistItems = ref<Product[]>([]);
  const toastStore = useToastStore();
  const authStore = useAuthStore();
  const productStore = useProductStore();

  // Initialize wishlist from localStorage or User profile
  function initWishlist() {
    if (authStore.currentUser) {
      loadUserFavorites(authStore.currentUser.favorites || []);
    } else {
      const saved = localStorage.getItem(LOCAL_WISHLIST_KEY);
      if (saved) {
        try {
          const ids: string[] = JSON.parse(saved);
          loadFavoritesFromIds(ids);
        } catch (e) {}
      }
    }
  }

  function loadFavoritesFromIds(ids: string[]) {
    const matched: Product[] = [];
    for (const id of ids) {
      const found = productStore.products.find(p => p.id === id);
      if (found) {
        matched.push(found);
      }
    }
    wishlistItems.value = matched;
  }

  function loadUserFavorites(favoriteIds: string[]) {
    loadFavoritesFromIds(favoriteIds);
  }

  // Sync favorites whenever currentUser changes
  watch(
    () => authStore.currentUser,
    (newUser) => {
      if (newUser) {
        // If user just logged in, merge local guest items with account favorites
        const guestSaved = localStorage.getItem(LOCAL_WISHLIST_KEY);
        let guestIds: string[] = [];
        if (guestSaved) {
          try {
            guestIds = JSON.parse(guestSaved);
          } catch (e) {}
        }
        const combined = Array.from(new Set([...(newUser.favorites || []), ...guestIds]));
        authStore.syncUserFavorites(combined);
        loadUserFavorites(combined);
        localStorage.removeItem(LOCAL_WISHLIST_KEY);
      } else {
        wishlistItems.value = [];
      }
    },
    { immediate: true }
  );

  // Sync if products list finishes loading from Firebase
  watch(
    () => productStore.products,
    () => {
      if (authStore.currentUser && authStore.currentUser.favorites) {
        loadUserFavorites(authStore.currentUser.favorites);
      }
    }
  );

  function toggleWishlist(product: Product) {
    const index = wishlistItems.value.findIndex(item => item.id === product.id);

    if (index > -1) {
      wishlistItems.value.splice(index, 1);
      toastStore.showToast('Favorit Diperbarui', `${product.name} dihapus dari favorit.`, 'info');
    } else {
      wishlistItems.value.push(product);
      if (authStore.currentUser) {
        toastStore.showToast(
          'Tersimpan di Akun!',
          `${product.name} disimpan ke favorit akun ${authStore.currentUser.fullName}. Data tidak akan hilang.`,
          'success'
        );
      } else {
        toastStore.showToast(
          'Favorit Ditambahkan',
          `${product.name} disimpan ke favorit. Daftar akun agar favorit tersimpan permanen!`,
          'success'
        );
      }
    }

    const currentIds = wishlistItems.value.map(p => p.id);

    if (authStore.currentUser) {
      authStore.syncUserFavorites(currentIds);
    } else {
      localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(currentIds));
    }
  }

  function isInWishlist(productId: string): boolean {
    return wishlistItems.value.some(item => item.id === productId);
  }

  const wishlistCount = computed(() => wishlistItems.value.length);

  initWishlist();

  return {
    wishlistItems,
    wishlistCount,
    toggleWishlist,
    isInWishlist,
    initWishlist
  };
});
