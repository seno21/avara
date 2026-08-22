<template>
  <div class="bg-[#F6F4EE] min-h-screen py-10 border-b border-[#E3D9CE]">
    <div class="max-w-7xl mx-auto px-4 lg:px-12">
      <!-- Breadcrumb & Header -->
      <div class="mb-8 space-y-2">
        <div
          class="flex items-center gap-2 text-xs text-[#6B6B6B] font-sans uppercase tracking-wider"
        >
          <router-link to="/" class="hover:text-[#AD9277]">Beranda</router-link>
          <span>/</span>
          <span class="text-[#1A1A1A] font-semibold">Katalog Belanja</span>
        </div>

        <h1
          class="font-serif text-3xl md:text-4xl font-extrabold text-[#1A1A1A]"
        >
          Katalog Produk Avara Studio
        </h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Filters -->
        <aside class="space-y-6 font-sans">
          <!-- Search Box -->
          <div
            class="bg-white p-5 border border-[#E3D9CE] rounded-2xl shadow-xs space-y-3"
          >
            <h3
              class="font-serif font-bold text-sm text-[#1A1A1A] uppercase tracking-wider"
            >
              Pencarian
            </h3>
            <div class="relative">
              <input
                type="text"
                v-model="productStore.searchQuery"
                placeholder="Cari nama produk..."
                class="w-full pl-9 pr-3 py-2.5 text-xs border border-[#E3D9CE] rounded-full focus:outline-none focus:border-[#AD9277]"
              />
              <Search class="w-4 h-4 absolute left-3 top-3 text-[#6B6B6B]" />
            </div>
          </div>

          <!-- Category Selection -->
          <div
            class="bg-white p-5 border border-[#E3D9CE] rounded-2xl shadow-xs space-y-3"
          >
            <h3
              class="font-serif font-bold text-sm text-[#1A1A1A] uppercase tracking-wider"
            >
              Kategori
            </h3>
            <div class="space-y-1 text-xs">
              <button
                v-for="cat in productStore.categories"
                :key="cat.id"
                @click="setCategory(cat.id)"
                class="w-full flex items-center justify-between py-2 px-3 rounded-xl transition-colors cursor-pointer text-left"
                :class="
                  productStore.selectedCategory === cat.id
                    ? 'bg-[#F3EDE6] text-[#3D2B1F] font-bold border-l-4 border-[#AD9277]'
                    : 'text-[#1A1A1A] hover:bg-[#F6F4EE]'
                "
              >
                <span>{{ cat.name }}</span>
                <span
                  class="text-[10px] text-[#6B6B6B] bg-[#F6F4EE] px-2 py-0.5 rounded-full"
                  >{{ cat.count }}</span
                >
              </button>
            </div>
          </div>

          <!-- Sorting Option -->
          <div
            class="bg-white p-5 border border-[#E3D9CE] rounded-2xl shadow-xs space-y-3"
          >
            <h3
              class="font-serif font-bold text-sm text-[#1A1A1A] uppercase tracking-wider"
            >
              Urutkan Berdasarkan
            </h3>
            <select
              v-model="productStore.selectedSort"
              class="w-full p-2.5 text-xs border border-[#E3D9CE] bg-white rounded-xl focus:outline-none focus:border-[#AD9277]"
            >
              <option value="featured">Rekomendasi Teratas</option>
              <option value="price-low">Harga: Terendah ke Tertinggi</option>
              <option value="price-high">Harga: Tertinggi ke Terendah</option>
              <option value="rating">Rating Pelanggan</option>
            </select>
          </div>
        </aside>

        <!-- Product Grid Main Section -->
        <main class="lg:col-span-3 space-y-6">
          <!-- Active Filter Status Bar -->
          <div
            class="bg-white p-4 border border-[#E3D9CE] rounded-2xl flex flex-wrap items-center justify-between gap-4 font-sans text-xs shadow-xs"
          >
            <div>
              Menampilkan
              <strong class="text-[#3D2B1F]">{{
                productStore.filteredProducts.length
              }}</strong>
              produk
              <span v-if="productStore.searchQuery">
                untuk pencarian "<span class="italic text-[#AD9277]">{{
                  productStore.searchQuery
                }}</span
                >"</span
              >
            </div>

            <button
              v-if="
                productStore.searchQuery ||
                productStore.selectedCategory !== 'all'
              "
              @click="resetFilters"
              class="text-xs text-red-700 underline hover:text-red-900"
            >
              Reset Filter
            </button>
          </div>

          <!-- Empty State -->
          <div
            v-if="productStore.filteredProducts.length === 0"
            class="bg-white p-12 text-center border border-[#E3D9CE] rounded-3xl font-sans"
          >
            <PackageSearch class="w-12 h-12 text-[#AD9277] mx-auto mb-3" />
            <h3 class="font-serif text-lg font-bold text-[#1A1A1A] mb-1">
              Produk Tidak Ditemukan
            </h3>
            <p class="text-xs text-[#6B6B6B] mb-4">
              Coba cari kata kunci lain atau ubah kategori pilihan Anda.
            </p>
            <BaseButton variant="primary" @click="resetFilters"
              >Lihat Semua Koleksi</BaseButton
            >
          </div>

          <!-- Product Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="product in productStore.filteredProducts"
              :key="product.id"
              class="bg-white border border-[#E3D9CE] rounded-2xl group flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <!-- Wishlist Heart Button -->
              <button
                @click="wishlistStore.toggleWishlist(product)"
                class="absolute top-3 right-3 z-10 bg-white/80 p-2 text-[#1A1A1A] hover:text-red-600 transition-colors rounded-full shadow-xs cursor-pointer"
              >
                <Heart
                  class="w-4 h-4"
                  :class="
                    wishlistStore.isInWishlist(product.id)
                      ? 'fill-red-600 text-red-600'
                      : ''
                  "
                />
              </button>

              <!-- Image & Overlay -->
              <div
                class="relative overflow-hidden bg-[#F6F4EE] group cursor-pointer m-2 rounded-xl"
                @click="productStore.openQuickView(product)"
              >
                <img
                  :src="product.imageUrl"
                  :alt="product.name"
                  class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                />

                <div
                  class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2"
                >
                  <BaseButton
                    variant="primary"
                    class="flex-1 text-[11px] py-2"
                    @click.stop="cartStore.addToCart(product)"
                  >
                    <ShoppingBag class="w-3.5 h-3.5" /> Beli
                  </BaseButton>
                  <button
                    @click.stop="productStore.openQuickView(product)"
                    class="bg-white text-[#1A1A1A] px-3 py-2 text-[11px] font-semibold uppercase hover:bg-[#AD9277] hover:text-white transition-colors rounded-full"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <!-- Product Info -->
              <div
                class="p-5 flex-1 flex flex-col justify-between space-y-3 font-sans"
              >
                <div>
                  <div
                    class="flex items-center justify-between text-[11px] text-[#6B6B6B] mb-1"
                  >
                    <span>{{ product.categoryLabel }}</span>
                    <div class="flex items-center text-amber-500">
                      <Star class="w-3.5 h-3.5 fill-amber-400" />
                      <span class="ml-1 text-xs font-semibold text-[#1A1A1A]">{{
                        product.rating
                      }}</span>
                    </div>
                  </div>

                  <h3
                    class="font-serif font-bold text-base text-[#1A1A1A] group-hover:text-[#AD9277] transition-colors"
                  >
                    <button
                      @click="productStore.openQuickView(product)"
                      class="text-left cursor-pointer"
                    >
                      {{ product.name }}
                    </button>
                  </h3>
                  <p class="text-xs text-[#6B6B6B] line-clamp-1 mt-0.5">
                    {{ product.tagline }}
                  </p>
                </div>

                <!-- Color Swatches & Price -->
                <div
                  class="pt-3 border-t border-[#E3D9CE] flex items-center justify-between"
                >
                  <div
                    v-if="product.colors && product.colors.length > 0"
                    class="flex gap-1"
                  >
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
                    <span
                      v-if="product.originalPrice"
                      class="text-xs text-[#6B6B6B] line-through"
                    >
                      {{ formatRupiah(product.originalPrice) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import BaseButton from "../components/common/BaseButton.vue";
import {
  Search,
  Heart,
  ShoppingBag,
  Star,
  PackageSearch,
} from "lucide-vue-next";

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

function setCategory(catId: string) {
  productStore.selectedCategory = catId;
}

function resetFilters() {
  productStore.searchQuery = "";
  productStore.selectedCategory = "all";
}

onMounted(() => {
  if (route.query.category) {
    productStore.selectedCategory = route.query.category as string;
  }
});

watch(
  () => route.query.category,
  (newCat) => {
    if (newCat) {
      productStore.selectedCategory = newCat as string;
    }
  },
);

function formatRupiah(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
}
</script>
