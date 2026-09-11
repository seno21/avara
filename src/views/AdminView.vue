<template>
  <div class="bg-[#F6F4EE] min-h-screen py-10 border-b border-[#E3D9CE]">
    <!-- ADMIN LOGIN GATE -->
    <div v-if="!authStore.isAdminLoggedIn" class="max-w-md mx-auto px-4 py-12">
      <div class="bg-white border border-[#E3D9CE] rounded-3xl shadow-xl p-8 space-y-6">
        <div class="text-center space-y-2">
          <div class="w-14 h-14 bg-[#2A1D15] rounded-2xl flex items-center justify-center mx-auto text-[#AD9277] shadow-md">
            <Lock class="w-7 h-7" />
          </div>
          <h2 class="font-serif text-2xl font-bold text-[#1A1A1A]">Login Admin Studio</h2>
          <p class="text-xs text-[#6B6B6B]">Masukkan akun pengelola untuk mengakses Dashboard Admin.</p>
        </div>

        <form @submit.prevent="handleAdminLogin" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Username Admin</label>
            <div class="relative">
              <input
                v-model="adminUser"
                type="text"
                required
                placeholder="Username (admin)"
                class="w-full pl-10 pr-4 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs font-medium focus:outline-none focus:border-[#AD9277]"
              />
              <User class="w-4 h-4 text-[#AD9277] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Password Admin</label>
            <div class="relative">
              <input
                v-model="adminPass"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Password admin"
                class="w-full pl-10 pr-10 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs font-medium focus:outline-none focus:border-[#AD9277]"
              />
              <Lock class="w-4 h-4 text-[#AD9277] absolute left-3.5 top-3" />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-3 text-[#6B6B6B] hover:text-[#1A1A1A]"
              >
                <Eye v-if="!showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-[#2A1D15] hover:bg-[#AD9277] text-[#F6F4EE] text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <LogIn class="w-4 h-4" />
            <span>Masuk Dashboard</span>
          </button>
        </form>

        <div class="bg-[#F6F4EE] p-3 rounded-xl border border-[#E3D9CE] text-[11px] text-[#6B6B6B] flex items-start gap-2">
          <Clock class="w-4 h-4 text-[#AD9277] shrink-0 mt-0.5" />
          <span>Sesi admin dilengkapi proteksi otomatis. Jika tidak ada aktivitas selama 15 menit, sesi akan ditutup otomatis.</span>
        </div>
      </div>
    </div>

    <!-- MAIN ADMIN DASHBOARD CONTENT -->
    <div v-else class="max-w-7xl mx-auto px-4 lg:px-12 font-sans">
      <!-- Breadcrumb & Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-[#E3D9CE] pb-6">
        <div>
          <div class="flex items-center gap-2 text-xs text-[#6B6B6B] uppercase tracking-wider mb-1">
            <router-link to="/" class="hover:text-[#AD9277]">Beranda</router-link>
            <span>/</span>
            <span class="text-[#1A1A1A] font-semibold">Dashboard Pengelola</span>
          </div>
          <h1 class="font-serif text-3xl font-extrabold text-[#1A1A1A] flex flex-wrap items-center gap-3">
            <span>Admin & Konten Studio</span>
            <span class="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-sans font-semibold border border-emerald-300 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Firebase Terhubung
            </span>
            <span class="text-xs bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-sans font-semibold border border-amber-300 flex items-center gap-1.5" title="Otomatis logout jika 15 menit inaktif">
              <Clock class="w-3.5 h-3.5 text-amber-700" />
              Sesi Admin Aktif (Timeout 15 mnt)
            </span>
          </h1>
        </div>

        <!-- Header Quick Action Buttons -->
        <div class="flex items-center gap-3">
          <button
            @click="seedFirebase"
            :disabled="isSeeding"
            class="px-4 py-2.5 bg-white border border-[#E3D9CE] text-[#3D2B1F] text-xs font-semibold rounded-full hover:border-[#AD9277] transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
            title="Isi Firebase dengan 6 sampel produk bawaan"
          >
            <Database class="w-4 h-4 text-[#AD9277]" />
            <span>{{ isSeeding ? 'Mengisi Firebase...' : 'Reset & Sync Sample Data' }}</span>
          </button>

          <button
            @click="openAddModal"
            class="px-5 py-2.5 bg-[#2A1D15] hover:bg-[#AD9277] text-[#F6F4EE] text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus class="w-4 h-4" />
            <span>Tambah Produk Baru</span>
          </button>

          <button
            @click="authStore.adminLogoutManual"
            class="px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-full hover:bg-rose-600 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            title="Keluar dari sesi Admin"
          >
            <LogOut class="w-4 h-4" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex border-b border-[#E3D9CE] mb-8 gap-6 text-sm font-semibold">
        <button
          @click="activeTab = 'products'"
          class="pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2"
          :class="activeTab === 'products' ? 'border-[#AD9277] text-[#AD9277]' : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'"
        >
          <Package class="w-4 h-4" />
          <span>Katalog Produk ({{ productStore.products.length }})</span>
        </button>

        <button
          @click="activeTab = 'content'"
          class="pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2"
          :class="activeTab === 'content' ? 'border-[#AD9277] text-[#AD9277]' : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'"
        >
          <Sliders class="w-4 h-4" />
          <span>Pengaturan Banner & Shopee</span>
        </button>
      </div>

      <!-- TAB 1: PRODUCT CATALOG MANAGEMENT -->
      <div v-if="activeTab === 'products'" class="space-y-6">
        <!-- Search & Filter Bar -->
        <div class="bg-white p-4 border border-[#E3D9CE] rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xs">
          <div class="relative w-full sm:w-80">
            <input
              type="text"
              v-model="adminSearch"
              placeholder="Cari ID atau nama produk..."
              class="w-full pl-9 pr-4 py-2 bg-[#F6F4EE] border border-[#E3D9CE] rounded-full text-xs focus:outline-none focus:border-[#AD9277]"
            />
            <Search class="w-4 h-4 text-[#AD9277] absolute left-3 top-2.5" />
          </div>

          <div class="text-xs text-[#6B6B6B]">
            Menampilkan <strong class="text-[#1A1A1A]">{{ filteredAdminProducts.length }}</strong> dari {{ productStore.products.length }} total produk
          </div>
        </div>

        <!-- Product Table -->
        <div class="bg-white border border-[#E3D9CE] rounded-2xl overflow-hidden shadow-2xs">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#2A1D15] text-[#F6F4EE] uppercase tracking-wider font-semibold">
                  <th class="p-4">Produk</th>
                  <th class="p-4">Kategori</th>
                  <th class="p-4">Harga & Stok</th>
                  <th class="p-4">Status & Badge</th>
                  <th class="p-4">Tautan Shopee</th>
                  <th class="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E3D9CE]">
                <tr
                  v-for="prod in filteredAdminProducts"
                  :key="prod.id"
                  class="hover:bg-[#F6F4EE]/50 transition-colors"
                >
                  <!-- Info Produk -->
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <img
                        :src="prod.imageUrl"
                        :alt="prod.name"
                        class="w-12 h-12 rounded-xl object-cover border border-[#E3D9CE] shrink-0"
                      />
                      <div>
                        <div class="font-bold text-[#1A1A1A] text-sm">{{ prod.name }}</div>
                        <div class="text-[11px] text-[#6B6B6B] font-mono">ID: {{ prod.id }}</div>
                      </div>
                    </div>
                  </td>

                  <!-- Kategori -->
                  <td class="p-4">
                    <span class="px-2.5 py-1 bg-[#F6F4EE] text-[#3D2B1F] border border-[#E3D9CE] rounded-full font-semibold">
                      {{ prod.categoryLabel }}
                    </span>
                  </td>

                  <!-- Harga & Stok -->
                  <td class="p-4">
                    <div class="font-bold text-[#AD9277]">{{ formatRupiah(prod.price) }}</div>
                    <div v-if="prod.originalPrice" class="line-through text-[10px] text-[#6B6B6B]">
                      {{ formatRupiah(prod.originalPrice) }}
                    </div>
                    <div class="text-[11px] mt-1 font-semibold text-[#1A1A1A]">
                      Stok: {{ prod.stockCount || 0 }} unit
                    </div>
                  </td>

                  <!-- Status & Badge -->
                  <td class="p-4">
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-if="prod.inStock"
                        class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md"
                      >
                        Tersedia
                      </span>
                      <span
                        v-else
                        class="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded-md"
                      >
                        Habis
                      </span>

                      <span
                        v-if="prod.isBestSeller"
                        class="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-md"
                      >
                        Best Seller
                      </span>
                      <span
                        v-if="prod.isNewArrival"
                        class="px-2 py-0.5 bg-sky-100 text-sky-900 text-[10px] font-bold rounded-md"
                      >
                        Terbaru
                      </span>
                    </div>
                  </td>

                  <!-- Shopee Link -->
                  <td class="p-4">
                    <a
                      :href="prod.shopeeUrl || 'https://shopee.co.id'"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-xs text-[#EE4D2D] hover:underline font-semibold flex items-center gap-1 max-w-[150px] truncate"
                    >
                      <ShoppingBag class="w-3.5 h-3.5 shrink-0" />
                      <span class="truncate">{{ prod.shopeeUrl || 'shopee.co.id' }}</span>
                    </a>
                  </td>

                  <!-- Action Buttons -->
                  <td class="p-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        @click="openEditModal(prod)"
                        class="p-2 text-[#3D2B1F] hover:bg-[#AD9277] hover:text-white rounded-lg transition-all"
                        title="Edit Produk"
                      >
                        <Edit class="w-4 h-4" />
                      </button>
                      <button
                        @click="confirmDelete(prod)"
                        class="p-2 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all"
                        title="Hapus Produk"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- TAB 2: SITE CONTENT & SHOPEE SETTINGS -->
      <div v-if="activeTab === 'content'" class="bg-white p-6 lg:p-8 border border-[#E3D9CE] rounded-3xl shadow-2xs">
        <h2 class="font-serif text-xl font-bold text-[#1A1A1A] mb-6">Pengaturan Banner & Shopee Store</h2>

        <form @submit.prevent="saveContentSettings" class="space-y-6 max-w-2xl">
          <div>
            <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-2">
              Tautan Utama Toko Shopee Official:
            </label>
            <input
              type="text"
              v-model="contentForm.shopeeStoreUrl"
              placeholder="https://shopee.co.id/nama_toko"
              class="w-full px-4 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
            />
            <p class="text-[11px] text-[#6B6B6B] mt-1">Tautan ini digunakan saat pengunjung menekan tombol Shopee di Header/Navbar.</p>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-2">
              Judul Utama Hero Banner (Headline):
            </label>
            <input
              type="text"
              v-model="contentForm.heroHeadline"
              class="w-full px-4 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-2">
              Sub-judul Hero Banner (Deskripsi Singkat):
            </label>
            <textarea
              v-model="contentForm.heroSubheadline"
              rows="3"
              class="w-full px-4 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
            ></textarea>
          </div>

          <button
            type="submit"
            class="px-6 py-3 bg-[#2A1D15] hover:bg-[#AD9277] text-[#F6F4EE] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
          >
            Simpan Pengaturan Utama
          </button>
        </form>
      </div>
    </div>

    <!-- MODAL FORM EDIT / ADD PRODUCT -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
    >
      <div class="bg-[#F6F4EE] border border-[#E3D9CE] rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden my-8">
        <!-- Modal Header -->
        <div class="bg-[#2A1D15] text-[#F6F4EE] px-6 py-4 flex items-center justify-between">
          <h3 class="font-serif text-lg font-bold">
            {{ isEditing ? 'Edit Produk' : 'Tambah Produk Baru' }}
          </h3>
          <button @click="showModal = false" class="text-[#AD9277] hover:text-white transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Body -->
        <form @submit.prevent="saveProductForm" class="p-6 space-y-4 font-sans text-xs">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- ID & Name -->
            <div>
              <label class="block font-bold text-[#1A1A1A] mb-1">ID Produk *</label>
              <input
                type="text"
                v-model="form.id"
                :disabled="isEditing"
                placeholder="avara-007"
                required
                class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277] disabled:bg-stone-200"
              />
            </div>
            <div>
              <label class="block font-bold text-[#1A1A1A] mb-1">Nama Produk *</label>
              <input
                type="text"
                v-model="form.name"
                placeholder="Avara Handbag Leather"
                required
                class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Category & Tagline -->
            <div>
              <label class="block font-bold text-[#1A1A1A] mb-1">Kategori *</label>
              <select
                v-model="form.category"
                class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
              >
                <option value="leather">Leather Goods</option>
                <option value="wear">Busana & Sepatu</option>
                <option value="accessories">Aksesoris & Jam</option>
                <option value="fragrance">Parfum & Wewangian</option>
                <option value="home">Home & Living</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#1A1A1A] mb-1">Tagline Singkat</label>
              <input
                type="text"
                v-model="form.tagline"
                placeholder="Tas Kulit Handcrafted"
                class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Price, Original Price, Stock -->
            <div>
              <label class="block font-bold text-[#1A1A1A] mb-1">Harga (Rp) *</label>
              <input
                type="number"
                v-model.number="form.price"
                required
                class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
              />
            </div>
            <div>
              <label class="block font-bold text-[#1A1A1A] mb-1">Harga Coret (Rp)</label>
              <input
                type="number"
                v-model.number="form.originalPrice"
                placeholder="Opsional"
                class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
              />
            </div>
            <div>
              <label class="block font-bold text-[#1A1A1A] mb-1">Jumlah Stok *</label>
              <input
                type="number"
                v-model.number="form.stockCount"
                required
                class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
              />
            </div>
          </div>

          <!-- Shopee Image URL & Live Preview -->
          <div>
            <label class="block font-bold text-[#1A1A1A] mb-1">URL Gambar Produk (Shopee / CDN / Web) *</label>
            <div class="flex gap-2 items-center">
              <input
                type="text"
                v-model="form.imageUrl"
                required
                placeholder="https://cf.shopee.co.id/file/... atau /images/product_tote.jpg"
                class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
              />
              <img
                v-if="form.imageUrl"
                :src="form.imageUrl"
                alt="Preview"
                class="w-10 h-10 rounded-lg object-cover border border-[#E3D9CE] shrink-0"
              />
            </div>
          </div>

          <!-- Shopee Product URL -->
          <div>
            <label class="block font-bold text-[#1A1A1A] mb-1">Tautan Produk Shopee (URL Beli) *</label>
            <input
              type="text"
              v-model="form.shopeeUrl"
              required
              placeholder="https://shopee.co.id/product-name-i.123456.78910"
              class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
            />
          </div>

          <!-- Badges & Checkboxes -->
          <div class="flex flex-wrap gap-6 py-2 border-y border-[#E3D9CE]">
            <label class="flex items-center gap-2 font-semibold cursor-pointer">
              <input type="checkbox" v-model="form.inStock" class="accent-[#AD9277]" />
              <span>Status Stok Tersedia</span>
            </label>

            <label class="flex items-center gap-2 font-semibold cursor-pointer">
              <input type="checkbox" v-model="form.isBestSeller" class="accent-[#AD9277]" />
              <span>Best Seller Badge</span>
            </label>

            <label class="flex items-center gap-2 font-semibold cursor-pointer">
              <input type="checkbox" v-model="form.isNewArrival" class="accent-[#AD9277]" />
              <span>Produk Terbaru Badge</span>
            </label>
          </div>

          <!-- Description -->
          <div>
            <label class="block font-bold text-[#1A1A1A] mb-1">Deskripsi Lengkap Produk</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
            ></textarea>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end gap-3 pt-3">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 bg-stone-200 text-[#1A1A1A] rounded-xl font-semibold hover:bg-stone-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-[#2A1D15] hover:bg-[#AD9277] text-white rounded-xl font-bold transition-all shadow-md"
            >
              Simpan ke Firebase
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useProductStore } from '../store/productStore';
import { useContentStore } from '../store/contentStore';
import { useAuthStore } from '../store/authStore';
import type { Product } from '../types/Product';
import {
  Package,
  Sliders,
  Plus,
  Edit,
  Trash2,
  Search,
  Database,
  ShoppingBag,
  Clock,
  Lock,
  User,
  LogIn,
  LogOut,
  Eye,
  EyeOff,
  X
} from 'lucide-vue-next';

const productStore = useProductStore();
const contentStore = useContentStore();
const authStore = useAuthStore();

// Admin login form state
const adminUser = ref('');
const adminPass = ref('');
const showPassword = ref(false);

function handleAdminLogin() {
  if (authStore.adminLogin(adminUser.value, adminPass.value)) {
    adminUser.value = '';
    adminPass.value = '';
  }
}

const activeTab = ref<'products' | 'content'>('products');
const adminSearch = ref('');
const showModal = ref(false);
const isEditing = ref(false);
const isSeeding = ref(false);

const contentForm = reactive({
  shopeeStoreUrl: contentStore.content.shopeeStoreUrl,
  heroHeadline: contentStore.content.heroHeadline,
  heroSubheadline: contentStore.content.heroSubheadline
});

const form = reactive({
  id: '',
  name: '',
  tagline: '',
  category: 'leather' as Product['category'],
  price: 0,
  originalPrice: undefined as number | undefined,
  imageUrl: '',
  shopeeUrl: '',
  stockCount: 10,
  inStock: true,
  isBestSeller: false,
  isNewArrival: true,
  description: ''
});

const filteredAdminProducts = computed(() => {
  if (!adminSearch.value) return productStore.products;
  const q = adminSearch.value.toLowerCase();
  return productStore.products.filter(p =>
    p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q)
  );
});

function openAddModal() {
  isEditing.value = false;
  form.id = '';
  form.name = '';
  form.tagline = '';
  form.category = 'leather';
  form.price = 0;
  form.originalPrice = undefined;
  form.imageUrl = '/images/product_tote.jpg';
  form.shopeeUrl = contentStore.content.shopeeStoreUrl || 'https://shopee.co.id/avarastudio';
  form.stockCount = 10;
  form.inStock = true;
  form.isBestSeller = false;
  form.isNewArrival = true;
  form.description = '';
  showModal.value = true;
}

function openEditModal(prod: Product) {
  isEditing.value = true;
  form.id = prod.id;
  form.name = prod.name;
  form.tagline = prod.tagline || '';
  form.category = prod.category;
  form.price = prod.price;
  form.originalPrice = prod.originalPrice;
  form.imageUrl = prod.imageUrl;
  form.shopeeUrl = prod.shopeeUrl || 'https://shopee.co.id/avarastudio';
  form.stockCount = prod.stockCount || 10;
  form.inStock = prod.inStock;
  form.isBestSeller = !!prod.isBestSeller;
  form.isNewArrival = !!prod.isNewArrival;
  form.description = prod.description || '';
  showModal.value = true;
}

async function saveProductForm() {
  try {
    await productStore.saveProduct({ ...form });
    showModal.value = false;
  } catch (e) {
    alert('Gagal menyimpan produk ke Firebase');
  }
}

async function confirmDelete(prod: Product) {
  if (confirm(`Apakah Anda yakin ingin menghapus produk "${prod.name}"?`)) {
    await productStore.deleteProduct(prod.id);
  }
}

async function seedFirebase() {
  if (confirm('Ini akan mengunggah 6 produk bawaan ke koleksi Firebase Firestore Anda. Lanjutkan?')) {
    isSeeding.value = true;
    try {
      await productStore.seedInitialData();
      alert('Berhasil mengisikan sampel data ke Firebase Firestore!');
    } catch (e) {
      alert('Gagal mengisikan data ke Firebase');
    } finally {
      isSeeding.value = false;
    }
  }
}

async function saveContentSettings() {
  try {
    await contentStore.updateContent(contentForm);
    alert('Pengaturan konten berhasil disimpan!');
  } catch (e) {
    alert('Gagal menyimpan pengaturan konten');
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
