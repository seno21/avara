<template>
  <div class="bg-[#F6F4EE] min-h-screen py-10 border-b border-[#E3D9CE]">
    <div class="max-w-7xl mx-auto px-4 lg:px-12">
      <!-- Breadcrumb & Header -->
      <div class="mb-6 space-y-2">
        <div
          class="flex items-center gap-2 text-xs text-[#6B6B6B] font-sans uppercase tracking-wider"
        >
          <router-link to="/" class="hover:text-[#AD9277]">Beranda</router-link>
          <span>/</span>
          <span class="text-[#1A1A1A] font-semibold">Katalog Belanja</span>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1
            class="font-serif text-3xl md:text-4xl font-extrabold text-[#1A1A1A]"
          >
            Katalog Produk Avara Studio
          </h1>
        </div>

        <!-- USER FAVORITES STATUS BANNER -->
        <div
          v-if="authStore.currentUser"
          class="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs text-emerald-900 shadow-2xs font-sans mt-3"
        >
          <div class="flex items-center gap-2.5">
            <UserCheck class="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Selamat datang, <strong>{{ authStore.currentUser.fullName }}</strong>! Produk favorit Anda disinkronkan aman di akun Anda (<strong>{{ wishlistStore.wishlistCount }} favorit</strong>).
            </span>
          </div>
        </div>
        <div
          v-else
          class="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900 shadow-2xs font-sans mt-3"
        >
          <div class="flex items-center gap-2.5">
            <Heart class="w-4 h-4 text-[#AD9277] shrink-0" />
            <span>
              Anda masuk sebagai <strong>Tamu</strong>. Daftar akun gratis agar daftar favorit Anda tidak hilang!
            </span>
          </div>
          <button
            @click="authStore.openAuthModal('register')"
            class="px-3.5 py-1.5 bg-[#2A1D15] hover:bg-[#AD9277] text-white font-bold rounded-full transition-all text-[11px] uppercase tracking-wider cursor-pointer"
          >
            Daftar Akun Sekarang
          </button>
        </div>
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

          <!-- Empty State for Wishlist -->
          <div
            v-if="productStore.filteredProducts.length === 0 && productStore.selectedCategory === 'wishlist'"
            class="bg-white p-12 text-center border border-[#E3D9CE] rounded-3xl font-sans space-y-3"
          >
            <Heart class="w-12 h-12 text-[#AD9277] mx-auto" />
            <h3 class="font-serif text-lg font-bold text-[#1A1A1A]">
              Belum Ada Produk Favorit
            </h3>
            <p class="text-xs text-[#6B6B6B] max-w-sm mx-auto">
              Anda belum menambahkan produk ke daftar favorit. Klik ikon hati pada produk pilihan Anda untuk menyimpannya di sini.
            </p>
            <BaseButton variant="primary" @click="resetFilters">
              Lihat Semua Koleksi
            </BaseButton>
          </div>

          <!-- General Empty State -->
          <div
            v-else-if="productStore.filteredProducts.length === 0"
            class="bg-white p-12 text-center border border-[#E3D9CE] rounded-3xl font-sans space-y-3"
          >
            <PackageSearch class="w-12 h-12 text-[#AD9277] mx-auto" />
            <h3 class="font-serif text-lg font-bold text-[#1A1A1A]">
              Produk Tidak Ditemukan
            </h3>
            <p class="text-xs text-[#6B6B6B]">
              Coba cari kata kunci lain atau ubah kategori pilihan Anda.
            </p>
            <BaseButton variant="primary" @click="resetFilters">
              Lihat Semua Koleksi
            </BaseButton>
          </div>

          <!-- Product Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="product in productStore.filteredProducts"
              :key="product.id"
              class="bg-white border border-[#E3D9CE] rounded-2xl group flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <!-- Wishlist Heart Button (Only for logged-in users) -->
              <button
                v-if="authStore.currentUser"
                @click="wishlistStore.toggleWishlist(product)"
                class="absolute top-3 right-3 z-10 bg-white/80 p-2 text-[#1A1A1A] hover:text-red-600 transition-colors rounded-full shadow-xs cursor-pointer"
                title="Simpan ke favorit akun Anda"
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

                <!-- Translucent Dark Fade Overlay on Hover -->
                <div
                  class="absolute inset-0 bg-black/55 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2.5 rounded-xl"
                >
                  <div class="w-10 h-10 rounded-full bg-[#2A1D15]/90 border border-[#AD9277]/60 flex items-center justify-center text-[#AD9277] shadow-lg group-hover:scale-110 transition-transform">
                    <ShoppingBag class="w-5 h-5" />
                  </div>
                  <span class="font-sans text-[11px] uppercase tracking-[0.3em] font-bold text-[#F6F4EE]">
                    Detail
                  </span>
                </div>
              </div>

              <!-- Product Info -->
              <div
                class="p-5 flex-1 flex flex-col justify-between space-y-3 font-sans"
              >
                <div>
                  <div
                    class="text-[11px] text-[#6B6B6B] mb-1"
                  >
                    <span>{{ product.categoryLabel }}</span>
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
                  <div>
                    <span class="font-bold text-[#AD9277] text-sm">
                      {{ formatRupiah(product.price) }}
                    </span>
                    <span
                      v-if="product.originalPrice"
                      class="text-[10px] text-[#6B6B6B] line-clamp-1 line-through ml-1"
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
import { useWishlistStore } from "../store/wishlistStore";
import { useAuthStore } from "../store/authStore";
import BaseButton from "../components/common/BaseButton.vue";
import {
  Search,
  Heart,
  ShoppingBag,
  PackageSearch,
  UserCheck
} from "lucide-vue-next";

const route = useRoute();
const productStore = useProductStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();

function setCategory(catId: string) {
  productStore.selectedCategory = catId;
}

function resetFilters() {
  productStore.searchQuery = "";
  productStore.selectedCategory = "all";
}

onMounted(() => {
  if (route.query.filter === 'wishlist' || route.query.category === 'wishlist') {
    productStore.selectedCategory = 'wishlist';
  } else if (route.query.category) {
    productStore.selectedCategory = route.query.category as string;
  }
});

watch(
  () => [route.query.category, route.query.filter],
  ([newCat, newFilter]) => {
    if (newFilter === 'wishlist' || newCat === 'wishlist') {
      productStore.selectedCategory = 'wishlist';
    } else if (newCat) {
      productStore.selectedCategory = newCat as string;
    }
  }
);

function formatRupiah(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
}
</script>
