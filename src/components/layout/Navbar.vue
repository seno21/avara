<template>
  <header class="sticky top-0 z-40 w-full transition-all duration-300">
    <!-- Announcement Bar -->
    <!-- <div
      class="bg-[#2A1D15] text-[#F6F4EE] text-[11px] font-sans tracking-widest uppercase py-2 px-4 text-center flex items-center justify-center gap-2"
    >
      <Sparkles class="w-3.5 h-3.5 text-[#AD9277] animate-pulse" />
      <span
        >Gunakan kode
        <strong class="text-[#AD9277] underline">AVARA10</strong> diskon 10% |
        Gratis Ongkir Indonesia min. Rp 3 Juta</span
      >
      <Sparkles
        class="w-3.5 h-3.5 text-[#AD9277] animate-pulse hidden sm:inline-block"
      />
    </div> -->

    <!-- Main Navigation Header -->
    <nav class="glass-header border-b border-[#E6E0D4] px-4 lg:px-12 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Mobile Menu Toggle -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden text-[#1A1A1A] p-2 hover:text-[#AD9277] transition-colors rounded-full"
          aria-label="Buka Menu"
        >
          <Menu class="w-6 h-6" />
        </button>

        <!-- Brand Logo -->
        <router-link to="/" class="flex flex-col items-start group">
          <div class="flex items-center gap-2">
            <span
              class="font-cinzel text-2xl lg:text-3xl font-extrabold tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#AD9277] transition-colors"
            >
              AVARA
            </span>
            <div class="w-2 h-2 rounded-full bg-[#AD9277]"></div>
          </div>
          <span
            class="font-sans text-[9px] uppercase tracking-[0.45em] text-[#6B6B6B] -mt-1 font-semibold"
          >
            STUDIO
          </span>
        </router-link>

        <!-- Desktop Navigation Links -->
        <div
          class="hidden lg:flex items-center gap-8 text-xs font-sans tracking-widest uppercase font-medium text-[#1A1A1A]"
        >
          <router-link
            to="/"
            class="hover:text-[#AD9277] transition-colors py-1 relative group"
            active-class="text-[#AD9277] font-semibold"
          >
            Beranda
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AD9277] rounded-full transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
          <router-link
            to="/shop"
            class="hover:text-[#AD9277] transition-colors py-1 relative group"
            active-class="text-[#AD9277] font-semibold"
          >
            Katalog & Belanja
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AD9277] rounded-full transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
          <router-link
            to="/shop?category=leather"
            class="hover:text-[#AD9277] transition-colors py-1 relative group"
          >
            Leather Goods
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AD9277] rounded-full transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
          <router-link
            to="/shop?category=wear"
            class="hover:text-[#AD9277] transition-colors py-1 relative group"
          >
            Busana
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AD9277] rounded-full transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
          <router-link
            to="/about"
            class="hover:text-[#AD9277] transition-colors py-1 relative group"
            active-class="text-[#AD9277] font-semibold"
          >
            Tentang Avara
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AD9277] rounded-full transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
          <router-link
            to="/faq"
            class="hover:text-[#AD9277] transition-colors py-1 relative group"
            active-class="text-[#AD9277] font-semibold"
          >
            FAQ
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AD9277] rounded-full transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
        </div>

        <!-- Right Action Icons -->
        <div class="flex items-center gap-4 sm:gap-6 text-[#1A1A1A]">
          <!-- Wishlist Toggle -->
          <router-link
            to="/shop"
            class="relative p-2 hover:text-[#AD9277] hover:bg-stone-100 transition-colors rounded-full"
            title="Wishlist"
          >
            <Heart class="w-5 h-5" />
            <span
              v-if="wishlistStore.wishlistCount > 0"
              class="absolute -top-0.5 -right-0.5 bg-[#AD9277] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
            >
              {{ wishlistStore.wishlistCount }}
            </span>
          </router-link>

          <!-- Shopee Store Link -->
          <a
            href="https://shopee.co.id/avarastudio"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#EE4D2D]/10 text-[#EE4D2D] hover:bg-[#EE4D2D] hover:text-white transition-all cursor-pointer shadow-2xs"
            title="Toko Shopee Official Avara Studio"
          >
            <ShoppingBag class="w-3.5 h-3.5" />
            <span>Shopee</span>
          </a>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden mt-4 p-5 bg-white border border-[#E6E0D4] rounded-2xl flex flex-col gap-3 font-sans text-sm uppercase tracking-widest animate-fade-in shadow-xl"
      >
        <div class="px-1">
          <input
            type="text"
            v-model="productStore.searchQuery"
            placeholder="Cari produk..."
            class="w-full pl-9 pr-3 py-2 text-xs bg-[#F6F4EE] border border-[#E3D9CE] rounded-full focus:outline-none focus:border-[#AD9277]"
          />
        </div>
        <router-link
          @click="mobileMenuOpen = false"
          to="/"
          class="py-2 border-b border-[#E6E0D4] text-[#1A1A1A]"
          >Beranda</router-link
        >
        <router-link
          @click="mobileMenuOpen = false"
          to="/shop"
          class="py-2 border-b border-[#E6E0D4] text-[#1A1A1A]"
          >Katalog Produk</router-link
        >
        <router-link
          @click="mobileMenuOpen = false"
          to="/shop?category=leather"
          class="py-2 border-b border-[#E6E0D4] text-[#1A1A1A]"
          >Leather Goods</router-link
        >
        <router-link
          @click="mobileMenuOpen = false"
          to="/shop?category=wear"
          class="py-2 border-b border-[#E6E0D4] text-[#1A1A1A]"
          >Busana & Sepatu</router-link
        >
        <a
          href="https://shopee.co.id/avarastudio"
          target="_blank"
          rel="noopener noreferrer"
          class="py-2 border-b border-[#E6E0D4] text-[#EE4D2D] font-bold flex items-center gap-2"
        >
          <ShoppingBag class="w-4 h-4" />
          <span>Toko Official Shopee</span>
        </a>
        <router-link
          @click="mobileMenuOpen = false"
          to="/about"
          class="py-2 border-b border-[#E6E0D4] text-[#1A1A1A]"
          >Tentang Avara</router-link
        >
        <router-link
          @click="mobileMenuOpen = false"
          to="/faq"
          class="py-2 text-[#1A1A1A]"
          >FAQ</router-link
        >
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useWishlistStore } from "../../store/wishlistStore";
import { useProductStore } from "../../store/productStore";
import { Menu, Search, Heart, ShoppingBag, Sparkles } from "lucide-vue-next";

const mobileMenuOpen = ref(false);
const wishlistStore = useWishlistStore();
const productStore = useProductStore();
</script>
