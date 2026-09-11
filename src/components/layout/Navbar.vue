<template>
  <header class="sticky top-0 z-40 w-full transition-all duration-300">
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
          <router-link
            v-if="authStore.isAdminLoggedIn"
            to="/admin"
            class="text-[#AD9277] hover:text-[#2A1D15] font-bold transition-colors py-1 relative flex items-center gap-1"
          >
            <ShieldCheck class="w-3.5 h-3.5" />
            <span>Admin</span>
          </router-link>
        </div>

        <!-- Right Action Icons -->
        <div class="flex items-center gap-3 sm:gap-5 text-[#1A1A1A]">
          <!-- Wishlist Toggle (Only for logged-in users) -->
          <router-link
            v-if="authStore.currentUser"
            to="/shop?filter=wishlist"
            class="relative p-2 hover:text-[#AD9277] hover:bg-stone-100 transition-colors rounded-full"
            title="Favorit Akun Tersimpan"
          >
            <Heart class="w-5 h-5" :class="wishlistStore.wishlistCount > 0 ? 'fill-[#AD9277] text-[#AD9277]' : ''" />
            <span
              v-if="wishlistStore.wishlistCount > 0"
              class="absolute -top-0.5 -right-0.5 bg-[#AD9277] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
            >
              {{ wishlistStore.wishlistCount }}
            </span>
          </router-link>

          <!-- Shopee Store Link (Logo Only) -->
          <a
            :href="contentStore.content.shopeeStoreUrl || 'https://shopee.co.id/avarastudio'"
            target="_blank"
            rel="noopener noreferrer"
            class="relative p-2 text-[#1A1A1A] hover:text-[#AD9277] hover:bg-stone-100 transition-colors rounded-full"
            title="Toko Official Shopee Avara Studio"
          >
            <ShoppingBag class="w-5 h-5" />
          </a>

          <!-- USER AUTHENTICATION CONTAINER -->
          <div class="relative">
            <!-- LOGGED IN USER STATE -->
            <div v-if="authStore.currentUser" class="relative group">
              <button
                @click="userMenuOpen = !userMenuOpen"
                class="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E3D9CE] rounded-full hover:border-[#AD9277] transition-all cursor-pointer"
              >
                <div class="w-6 h-6 rounded-full bg-[#2A1D15] text-[#F6F4EE] flex items-center justify-center text-[10px] font-bold">
                  {{ authStore.currentUser.fullName.charAt(0).toUpperCase() }}
                </div>
                <span class="text-xs font-semibold text-[#1A1A1A] max-w-[100px] truncate hidden sm:inline-block">
                  {{ authStore.currentUser.fullName }}
                </span>
                <ChevronDown class="w-3.5 h-3.5 text-[#6B6B6B]" />
              </button>

              <!-- USER DROPDOWN -->
              <div
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-64 bg-white border border-[#E3D9CE] rounded-2xl shadow-xl p-3 z-50 text-xs space-y-2 animate-fade-in"
              >
                <div class="p-2.5 bg-[#F6F4EE] rounded-xl border border-[#E3D9CE]">
                  <div class="font-bold text-[#1A1A1A] text-sm">{{ authStore.currentUser.fullName }}</div>
                  <div class="text-[11px] text-[#6B6B6B] truncate">{{ authStore.currentUser.email }}</div>
                  <div class="text-[10px] text-[#AD9277] font-semibold mt-1">WA: {{ authStore.currentUser.phone }}</div>
                  <div v-if="authStore.currentUser.address" class="text-[10px] text-[#6B6B6B] mt-1 pt-1 border-t border-[#E3D9CE] truncate">
                    📍 {{ authStore.currentUser.address.regencyName }}, {{ authStore.currentUser.address.provinceName }}
                  </div>
                </div>

                <div class="space-y-1">
                  <router-link
                    to="/shop?filter=wishlist"
                    @click="userMenuOpen = false"
                    class="w-full flex items-center justify-between p-2 hover:bg-[#F6F4EE] rounded-lg text-[#1A1A1A] font-medium"
                  >
                    <span class="flex items-center gap-2">
                      <Heart class="w-4 h-4 text-[#AD9277]" />
                      Favorit Tersimpan
                    </span>
                    <span class="bg-[#AD9277] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {{ wishlistStore.wishlistCount }}
                    </span>
                  </router-link>

                  <button
                    @click="handleLogout"
                    class="w-full flex items-center gap-2 p-2 hover:bg-rose-50 text-rose-600 rounded-lg font-semibold cursor-pointer"
                  >
                    <LogOut class="w-4 h-4" />
                    Keluar Akun
                  </button>
                </div>
              </div>
            </div>

            <!-- GUEST STATE: MASUK BUTTON ONLY -->
            <div v-else class="flex items-center">
              <router-link
                to="/login"
                class="px-4 py-2 bg-[#2A1D15] hover:bg-[#AD9277] text-[#F6F4EE] text-xs font-semibold rounded-full transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <User class="w-4 h-4 text-[#AD9277]" />
                <span>Masuk Akun</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden mt-4 p-5 bg-white border border-[#E6E0D4] rounded-2xl flex flex-col gap-3 font-sans text-sm uppercase tracking-widest animate-fade-in shadow-xl"
      >
        <!-- Mobile User State -->
        <div v-if="authStore.currentUser" class="p-3 bg-[#F6F4EE] rounded-xl border border-[#E3D9CE] font-sans">
          <div class="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
            <UserCheck class="w-4 h-4 text-[#AD9277]" />
            <span>{{ authStore.currentUser.fullName }}</span>
          </div>
          <div class="text-xs text-[#6B6B6B] lowercase normal-case mt-0.5">{{ authStore.currentUser.email }}</div>
          <button
            @click="handleLogout"
            class="mt-2 text-xs text-rose-600 font-bold hover:underline cursor-pointer"
          >
            Keluar Akun
          </button>
        </div>
        <div v-else class="font-sans">
          <router-link
            @click="mobileMenuOpen = false"
            to="/login"
            class="w-full block py-2.5 bg-[#2A1D15] text-[#F6F4EE] text-xs font-bold rounded-xl text-center cursor-pointer"
          >
            Masuk Akun
          </router-link>
        </div>

        <div class="px-1 mt-1">
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

        <a
          :href="contentStore.content.shopeeStoreUrl || 'https://shopee.co.id/avarastudio'"
          target="_blank"
          rel="noopener noreferrer"
          class="py-2 border-b border-[#E6E0D4] text-[#1A1A1A] hover:text-[#AD9277] transition-colors flex items-center gap-2"
        >
          <ShoppingBag class="w-4 h-4 text-[#AD9277]" />
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
import { useContentStore } from "../../store/contentStore";
import { useAuthStore } from "../../store/authStore";
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  User,
  UserCheck,
  ChevronDown,
  LogOut,
  ShieldCheck
} from "lucide-vue-next";

const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);

const wishlistStore = useWishlistStore();
const productStore = useProductStore();
const contentStore = useContentStore();
const authStore = useAuthStore();

function handleLogout() {
  userMenuOpen.value = false;
  mobileMenuOpen.value = false;
  authStore.logoutUser();
}
</script>
