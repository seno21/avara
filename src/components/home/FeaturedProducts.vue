<template>
  <section class="py-16 bg-[#F6F4EE] border-b border-[#E3D9CE]">
    <div class="max-w-7xl mx-auto px-4 lg:px-12">
      <!-- Header & Filter Tabs -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span class="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#AD9277]">
            Rekomendasi Utama
          </span>
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-1">
            Koleksi Terpopuler Avara Studio
          </h2>
        </div>

        <!-- Filter Category Tabs -->
        <div class="flex flex-wrap gap-2 text-xs font-sans uppercase font-semibold">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            class="px-5 py-2.5 border transition-all cursor-pointer rounded-full"
            :class="activeCategory === cat.id ? 'bg-[#AD9277] text-white border-[#AD9277] shadow-sm' : 'bg-white text-[#1A1A1A] border-[#E3D9CE] hover:border-[#AD9277]'"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white border border-[#E3D9CE] rounded-2xl group flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <!-- Badges -->
          <div class="absolute top-3 left-3 z-10 flex flex-col gap-1">
            <BaseBadge v-if="product.isBestSeller" variant="bronze">Best Seller</BaseBadge>
            <BaseBadge v-if="product.isNewArrival" variant="dark">New</BaseBadge>
          </div>

          <!-- Wishlist Heart Button -->
          <button
            @click="wishlistStore.toggleWishlist(product)"
            class="absolute top-3 right-3 z-10 bg-white/80 p-2.5 text-[#1A1A1A] hover:text-red-600 transition-colors rounded-full shadow-xs cursor-pointer hover:scale-110"
            :title="wishlistStore.isInWishlist(product.id) ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'"
          >
            <Heart class="w-4 h-4" :class="wishlistStore.isInWishlist(product.id) ? 'fill-red-600 text-red-600' : ''" />
          </button>

          <!-- Product Image & Quick Actions Overlay -->
          <div class="relative overflow-hidden bg-[#F6F4EE] group cursor-pointer m-2 rounded-xl" @click="productStore.openQuickView(product)">
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
            />
            
            <!-- Hover Action Overlay -->
            <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
              <BaseButton variant="primary" class="flex-1 text-[11px] py-2" @click.stop="cartStore.addToCart(product)">
                <ShoppingBag class="w-3.5 h-3.5" /> Beli Sekarang
              </BaseButton>
              <button
                @click.stop="productStore.openQuickView(product)"
                class="bg-white text-[#1A1A1A] px-3 py-2 text-[11px] font-semibold uppercase hover:bg-[#AD9277] hover:text-white transition-colors rounded-full"
              >
                Quick View
              </button>
            </div>
          </div>

          <!-- Product Content Info -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-3 font-sans">
            <div>
              <div class="flex items-center justify-between text-[11px] text-[#6B6B6B] mb-1">
                <span>{{ product.categoryLabel }}</span>
                <div class="flex items-center text-amber-500">
                  <Star class="w-3.5 h-3.5 fill-amber-400" />
                  <span class="ml-1 text-xs font-semibold text-[#1A1A1A]">{{ product.rating }}</span>
                </div>
              </div>

              <h3 class="font-serif font-bold text-lg text-[#1A1A1A] group-hover:text-[#AD9277] transition-colors">
                <button @click="productStore.openQuickView(product)" class="text-left cursor-pointer">
                  {{ product.name }}
                </button>
              </h3>
              <p class="text-xs text-[#6B6B6B] line-clamp-1 mt-0.5">{{ product.tagline }}</p>
            </div>

            <!-- Color Swatches & Price -->
            <div class="pt-3 border-t border-[#E3D9CE] flex items-center justify-between">
              <div v-if="product.colors && product.colors.length > 0" class="flex gap-1">
                <span
                  v-for="color in product.colors"
                  :key="color.name"
                  class="w-3.5 h-3.5 rounded-full border border-stone-300"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                ></span>
              </div>

              <div class="flex items-baseline gap-2">
                <span class="font-serif font-bold text-base text-[#3D2B1F]">
                  {{ formatRupiah(product.price) }}
                </span>
                <span v-if="product.originalPrice" class="text-xs text-[#6B6B6B] line-through">
                  {{ formatRupiah(product.originalPrice) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <router-link to="/shop">
          <BaseButton variant="dark">
            Lihat Seluruh Katalog ({{ productStore.products.length }} Produk) &rarr;
          </BaseButton>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import BaseButton from '../common/BaseButton.vue';
import BaseBadge from '../common/BaseBadge.vue';
import { Heart, ShoppingBag, Star } from 'lucide-vue-next';

const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const activeCategory = ref('all');

const categories = [
  { id: 'all', name: 'Semua Produk' },
  { id: 'leather', name: 'Leather Goods' },
  { id: 'wear', name: 'Busana & Sepatu' },
  { id: 'accessories', name: 'Aksesoris & Jam' },
  { id: 'fragrance', name: 'Parfum' }
];

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') return productStore.products;
  return productStore.products.filter(p => p.category === activeCategory.value);
});

function formatRupiah(val: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
}
</script>
