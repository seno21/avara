import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem } from '../types/Cart';
import type { Product } from '../types/Product';
import { useToastStore } from './toastStore';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const isCartOpen = ref(false);
  const promoCode = ref('');
  const discountPercent = ref(0);
  const discountFixed = ref(0);
  const promoApplied = ref(false);
  const freeShippingThreshold = 3000000; // Rp 3.000.000

  const toastStore = useToastStore();

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value;
  }

  function openCart() {
    isCartOpen.value = true;
  }

  function closeCart() {
    isCartOpen.value = false;
  }

  function addToCart(product: Product, quantity: number = 1, color?: string, size?: string) {
    const existingIndex = items.value.findIndex(
      item => item.product.id === product.id &&
              item.selectedColor === color &&
              item.selectedSize === size
    );

    if (existingIndex > -1 && items.value[existingIndex]) {
      items.value[existingIndex].quantity += quantity;
    } else {
      items.value.push({
        product,
        quantity,
        selectedColor: color || (product.colors && product.colors[0] ? product.colors[0].name : undefined),
        selectedSize: size || (product.sizes && product.sizes[0] ? product.sizes[0] : undefined)
      });
    }

    toastStore.showToast(
      'Berhasil Ditambahkan',
      `${product.name} telah masuk ke keranjang belanja Anda.`,
      'success'
    );

    openCart();
  }

  function removeFromCart(index: number) {
    const item = items.value[index];
    if (item) {
      items.value.splice(index, 1);
      toastStore.showToast('Produk Dihapus', `${item.product.name} dihapus dari keranjang.`, 'info');
    }
  }

  function updateQuantity(index: number, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(index);
    } else {
      const item = items.value[index];
      if (item) {
        item.quantity = quantity;
      }
    }
  }


  function applyPromoCode(code: string) {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'AVARA10') {
      discountPercent.value = 10;
      discountFixed.value = 0;
      promoApplied.value = true;
      promoCode.value = cleanCode;
      toastStore.showToast('Voucher Berhasil!', 'Diskon 10% berhasil diterapkan.', 'success');
    } else if (cleanCode === 'WARMCOFFEE' || cleanCode === 'COKLAT') {
      discountFixed.value = 150000;
      discountPercent.value = 0;
      promoApplied.value = true;
      promoCode.value = cleanCode;
      toastStore.showToast('Voucher Berhasil!', 'Potongan Rp 150.000 berhasil diterapkan.', 'success');
    } else {
      toastStore.showToast('Kode Tidak Valid', 'Gunakan kode AVARA10 atau COKLAT.', 'warning');
    }
  }

  function removePromoCode() {
    promoCode.value = '';
    discountPercent.value = 0;
    discountFixed.value = 0;
    promoApplied.value = false;
    toastStore.showToast('Voucher Dibatalkan', 'Potongan harga telah dihapus.', 'info');
  }

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  const totalItemCount = computed(() => {
    return items.value.reduce((count, item) => count + item.quantity, 0);
  });

  const discountAmount = computed(() => {
    if (discountPercent.value > 0) {
      return (subtotal.value * discountPercent.value) / 100;
    }
    return Math.min(discountFixed.value, subtotal.value);
  });

  const isFreeShipping = computed(() => subtotal.value >= freeShippingThreshold);
  const remainingForFreeShipping = computed(() => Math.max(0, freeShippingThreshold - subtotal.value));
  const freeShippingProgress = computed(() => {
    return Math.min(100, (subtotal.value / freeShippingThreshold) * 100);
  });

  const shippingCost = computed(() => {
    if (subtotal.value === 0 || isFreeShipping.value) return 0;
    return 50000; // Standard express Rp 50.000
  });

  const grandTotal = computed(() => {
    return Math.max(0, subtotal.value - discountAmount.value + shippingCost.value);
  });

  function clearCart() {
    items.value = [];
  }

  return {
    items,
    isCartOpen,
    promoCode,
    promoApplied,
    freeShippingThreshold,
    subtotal,
    totalItemCount,
    discountAmount,
    isFreeShipping,
    remainingForFreeShipping,
    freeShippingProgress,
    shippingCost,
    grandTotal,
    toggleCart,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyPromoCode,
    removePromoCode,
    clearCart
  };
});
