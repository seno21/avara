<template>
  <Teleport to="body">
    <!-- Backdrop Overlay -->
    <Transition name="fade">
      <div
        v-if="cartStore.isCartOpen"
        @click="cartStore.closeCart()"
        class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
      ></div>
    </Transition>

    <!-- Slide-over Drawer Panel -->
    <Transition name="slide">
      <div
        v-if="cartStore.isCartOpen"
        class="fixed inset-y-0 right-0 max-w-md w-full bg-[#F6F4EE] shadow-2xl z-50 flex flex-col justify-between border-l border-[#E3D9CE] rounded-l-3xl overflow-hidden"
      >
        <!-- Header -->
        <div class="p-6 border-b border-[#E3D9CE] bg-white flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-[#F3EDE6] rounded-full text-[#AD9277]">
              <ShoppingBag class="w-5 h-5" />
            </div>
            <h2 class="font-cinzel text-lg font-bold tracking-wider text-[#1A1A1A]">
              Keranjang ({{ cartStore.totalItemCount }})
            </h2>
          </div>
          <button
            @click="cartStore.closeCart()"
            class="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors p-2 rounded-full hover:bg-stone-100"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Free Shipping Progress Bar -->
        <div class="bg-[#2A1D15] text-[#F6F4EE] px-6 py-3.5 text-xs font-sans">
          <div v-if="cartStore.isFreeShipping" class="flex items-center gap-2 text-emerald-400 font-medium">
            <Truck class="w-4 h-4" />
            <span>Selamat! Pesanan Anda mendapatkan <strong>Gratis Ongkir Express</strong>.</span>
          </div>
          <div v-else>
            <div class="flex items-center justify-between mb-1.5 text-[11px] uppercase tracking-wider">
              <span>Bebas Ongkir Pengiriman</span>
              <span>Kurang {{ formatRupiah(cartStore.remainingForFreeShipping) }}</span>
            </div>
            <div class="w-full bg-stone-700 h-2 overflow-hidden rounded-full">
              <div
                class="bg-[#AD9277] h-full transition-all duration-500 rounded-full"
                :style="{ width: `${cartStore.freeShippingProgress}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Cart Items List -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div v-if="cartStore.items.length === 0" class="text-center py-16 text-[#6B6B6B] font-sans">
            <div class="w-16 h-16 bg-[#F3EDE6] rounded-full flex items-center justify-center mx-auto mb-3 text-[#AD9277]">
              <ShoppingBag class="w-8 h-8" />
            </div>
            <p class="font-serif text-lg text-[#1A1A1A] mb-2">Keranjang Anda Masih Kosong</p>
            <p class="text-xs mb-6">Jelajahi koleksi eksklusif Avara Studio sekarang.</p>
            <BaseButton variant="primary" @click="cartStore.closeCart()">
              Mulai Belanja
            </BaseButton>
          </div>

          <div
            v-for="(item, index) in cartStore.items"
            :key="`${item.product.id}-${index}`"
            class="bg-white p-4 border border-[#E3D9CE] rounded-2xl flex gap-4 items-center group relative shadow-xs"
          >
            <img
              :src="item.product.imageUrl"
              :alt="item.product.name"
              class="w-20 h-24 object-cover shrink-0 bg-[#F6F4EE] rounded-xl"
            />

            <div class="flex-1 min-w-0 font-sans">
              <div class="flex items-start justify-between gap-2">
                <h3 class="font-serif font-semibold text-sm text-[#1A1A1A] truncate">
                  {{ item.product.name }}
                </h3>
                <button
                  @click="cartStore.removeFromCart(index)"
                  class="text-[#6B6B6B] hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                  title="Hapus"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>

              <p v-if="item.selectedColor || item.selectedSize" class="text-[11px] text-[#6B6B6B] mt-0.5">
                <span v-if="item.selectedColor">Warna: {{ item.selectedColor }}</span>
                <span v-if="item.selectedColor && item.selectedSize"> | </span>
                <span v-if="item.selectedSize">Ukuran: {{ item.selectedSize }}</span>
              </p>

              <div class="flex items-center justify-between mt-3">
                <!-- Quantity Controls -->
                <div class="flex items-center border border-[#E3D9CE] rounded-full overflow-hidden bg-[#F6F4EE]">
                  <button
                    @click="cartStore.updateQuantity(index, item.quantity - 1)"
                    class="w-7 h-7 flex items-center justify-center text-xs text-[#1A1A1A] hover:bg-stone-200"
                  >
                    -
                  </button>
                  <span class="w-8 text-center text-xs font-semibold text-[#1A1A1A]">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="cartStore.updateQuantity(index, item.quantity + 1)"
                    class="w-7 h-7 flex items-center justify-center text-xs text-[#1A1A1A] hover:bg-stone-200"
                  >
                    +
                  </button>
                </div>

                <div class="text-right">
                  <span class="font-serif font-bold text-sm text-[#3D2B1F]">
                    {{ formatRupiah(item.product.price * item.quantity) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer / Checkout Area -->
        <div v-if="cartStore.items.length > 0" class="p-6 border-t border-[#E3D9CE] bg-white space-y-4 rounded-t-3xl">
          <!-- Voucher Form -->
          <div class="flex gap-2">
            <input
              type="text"
              v-model="inputPromoCode"
              placeholder="Kode Voucher (ex: AVARA10)"
              class="flex-1 px-4 py-2.5 text-xs border border-[#E3D9CE] rounded-full focus:outline-none focus:border-[#AD9277] uppercase"
            />
            <button
              @click="handleApplyPromo"
              class="px-5 py-2.5 bg-[#2A1D15] text-[#F6F4EE] text-xs font-semibold uppercase tracking-wider hover:bg-[#AD9277] transition-colors rounded-full"
            >
              Pasang
            </button>
          </div>

          <div v-if="cartStore.promoApplied" class="flex items-center justify-between text-xs bg-[#F3EDE6] p-3 text-[#3D2B1F] rounded-xl">
            <span class="flex items-center gap-1.5 font-medium">
              <Tag class="w-3.5 h-3.5 text-[#AD9277]" />
              Voucher Applied: <strong>{{ cartStore.promoCode }}</strong>
            </span>
            <button @click="cartStore.removePromoCode()" class="text-red-700 underline text-[11px]">
              Hapus
            </button>
          </div>

          <!-- Price Calculation Breakdown -->
          <div class="space-y-1.5 text-xs font-sans text-[#6B6B6B]">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span class="text-[#1A1A1A] font-medium">{{ formatRupiah(cartStore.subtotal) }}</span>
            </div>
            <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-emerald-700">
              <span>Diskon Voucher</span>
              <span>-{{ formatRupiah(cartStore.discountAmount) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Ongkos Kirim</span>
              <span class="text-[#1A1A1A] font-medium">
                {{ cartStore.isFreeShipping ? 'GRATIS' : formatRupiah(cartStore.shippingCost) }}
              </span>
            </div>
            <div class="flex justify-between text-base font-serif font-bold text-[#1A1A1A] pt-2 border-t border-[#E3D9CE]">
              <span>Total Akhir</span>
              <span class="text-[#3D2B1F]">{{ formatRupiah(cartStore.grandTotal) }}</span>
            </div>
          </div>

          <!-- Checkout Button -->
          <router-link to="/checkout" @click="cartStore.closeCart()" class="block w-full">
            <BaseButton variant="primary" fullWidth>
              <Lock class="w-3.5 h-3.5" />
              Lanjut Ke Pembayaran
            </BaseButton>
          </router-link>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../../store/cartStore';
import BaseButton from '../common/BaseButton.vue';
import { X, ShoppingBag, Trash2, Tag, Truck, Lock } from 'lucide-vue-next';

const cartStore = useCartStore();
const inputPromoCode = ref('');

function handleApplyPromo() {
  if (inputPromoCode.value) {
    cartStore.applyPromoCode(inputPromoCode.value);
  }
}

function formatRupiah(val: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>
