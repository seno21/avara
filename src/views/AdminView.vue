<template>
  <div class="bg-[#F6F4EE] min-h-screen py-10 border-b border-[#E3D9CE]">
    <div class="max-w-7xl mx-auto px-4 lg:px-12 font-sans">
      <!-- Breadcrumb & Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-[#E3D9CE] pb-6">
        <div>
          <div class="flex items-center gap-2 text-xs text-[#6B6B6B] uppercase tracking-wider mb-1">
            <router-link to="/" class="hover:text-[#AD9277]">Beranda</router-link>
            <span>/</span>
            <span class="text-[#1A1A1A] font-semibold">Dashboard Pengelola</span>
          </div>
          <h1 class="font-serif text-3xl font-extrabold text-[#1A1A1A] flex items-center gap-3">
            <span>Admin & Konten Studio</span>
            <span class="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-sans font-semibold border border-emerald-300 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Firebase Terhubung
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
              placeholder="Cari nama atau ID produk..."
              class="w-full pl-9 pr-3 py-2 text-xs border border-[#E3D9CE] rounded-full focus:outline-none focus:border-[#AD9277]"
            />
            <Search class="w-4 h-4 absolute left-3 top-2.5 text-[#6B6B6B]" />
          </div>

          <div class="text-xs text-[#6B6B6B]">
            Menampilkan <strong class="text-[#1A1A1A]">{{ filteredAdminProducts.length }}</strong> dari {{ productStore.products.length }} Produk
          </div>
        </div>

        <!-- Products Table / Cards -->
        <div class="bg-white border border-[#E3D9CE] rounded-2xl overflow-hidden shadow-xs">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-[#F3EDE6] text-[#3D2B1F] text-xs uppercase tracking-wider font-serif border-b border-[#E3D9CE]">
                  <th class="p-4">Produk</th>
                  <th class="p-4">Kategori</th>
                  <th class="p-4">Harga</th>
                  <th class="p-4">Tautan Shopee</th>
                  <th class="p-4">Stok</th>
                  <th class="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E3D9CE] text-xs">
                <tr
                  v-for="prod in filteredAdminProducts"
                  :key="prod.id"
                  class="hover:bg-[#F6F4EE]/60 transition-colors"
                >
                  <!-- Product Image & Title -->
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <img
                        :src="prod.imageUrl"
                        :alt="prod.name"
                        class="w-12 h-12 object-cover rounded-xl border border-[#E3D9CE] bg-stone-100 shrink-0"
                      />
                      <div>
                        <div class="font-serif font-bold text-sm text-[#1A1A1A]">{{ prod.name }}</div>
                        <div class="text-[11px] text-[#6B6B6B] italic">{{ prod.tagline }}</div>
                        <div class="flex gap-1 mt-1">
                          <span v-if="prod.isBestSeller" class="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">Best Seller</span>
                          <span v-if="prod.isNewArrival" class="text-[9px] bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded font-semibold">New</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Category -->
                  <td class="p-4">
                    <span class="px-2.5 py-1 bg-[#F3EDE6] text-[#3D2B1F] rounded-full font-medium text-[11px]">
                      {{ prod.categoryLabel }}
                    </span>
                  </td>

                  <!-- Price -->
                  <td class="p-4">
                    <div class="font-bold text-[#3D2B1F]">{{ formatRupiah(prod.price) }}</div>
                    <div v-if="prod.originalPrice" class="text-[11px] text-stone-400 line-through">
                      {{ formatRupiah(prod.originalPrice) }}
                    </div>
                  </td>

                  <!-- Shopee Link -->
                  <td class="p-4 max-w-xs">
                    <a
                      :href="prod.shopeeUrl || 'https://shopee.co.id'"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[#EE4D2D] hover:underline flex items-center gap-1 font-semibold truncate text-[11px]"
                    >
                      <ShoppingBag class="w-3.5 h-3.5 shrink-0" />
                      <span class="truncate">{{ prod.shopeeUrl || 'shopee.co.id' }}</span>
                      <ExternalLink class="w-3 h-3 shrink-0" />
                    </a>
                  </td>

                  <!-- Stock -->
                  <td class="p-4">
                    <span
                      class="px-2 py-0.5 rounded text-[11px] font-semibold"
                      :class="prod.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                    >
                      {{ prod.inStock ? `Tersedia (${prod.stockCount})` : 'Habis' }}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="p-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        @click="openEditModal(prod)"
                        class="p-2 bg-stone-100 hover:bg-[#AD9277] hover:text-white text-[#1A1A1A] rounded-lg transition-colors cursor-pointer"
                        title="Edit Produk"
                      >
                        <Pencil class="w-4 h-4" />
                      </button>
                      <button
                        @click="confirmDelete(prod)"
                        class="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-lg transition-colors cursor-pointer"
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
      <div v-if="activeTab === 'content'" class="max-w-3xl space-y-6">
        <div class="bg-white p-6 border border-[#E3D9CE] rounded-2xl shadow-xs space-y-5">
          <h2 class="font-serif text-xl font-bold text-[#1A1A1A]">Pengaturan Banner & Shopee Store</h2>

          <div class="space-y-4">
            <!-- Shopee Store URL -->
            <div>
              <label class="block text-xs uppercase font-bold text-[#1A1A1A] mb-1">
                Tautan Utama Toko Shopee Official:
              </label>
              <input
                type="text"
                v-model="contentForm.shopeeStoreUrl"
                placeholder="https://shopee.co.id/nama_toko"
                class="w-full p-3 text-xs border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
              />
              <p class="text-[11px] text-[#6B6B6B] mt-1">Tautan ini digunakan saat pengunjung menekan tombol Shopee di Header/Navbar.</p>
            </div>

            <!-- Hero Headline -->
            <div>
              <label class="block text-xs uppercase font-bold text-[#1A1A1A] mb-1">
                Judul Utama Hero Banner (Homepage):
              </label>
              <input
                type="text"
                v-model="contentForm.heroHeadline"
                class="w-full p-3 text-xs border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
              />
            </div>

            <!-- Hero Subheadline -->
            <div>
              <label class="block text-xs uppercase font-bold text-[#1A1A1A] mb-1">
                Deskripsi Singkat Banner:
              </label>
              <textarea
                rows="3"
                v-model="contentForm.heroSubheadline"
                class="w-full p-3 text-xs border border-[#E3D9CE] rounded-xl focus:outline-none focus:border-[#AD9277]"
              ></textarea>
            </div>

            <button
              @click="saveContentSettings"
              :disabled="contentStore.isLoading"
              class="px-6 py-3 bg-[#2A1D15] hover:bg-[#AD9277] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md"
            >
              {{ contentStore.isLoading ? 'Menyimpan...' : 'Simpan Pengaturan Content' }}
            </button>
          </div>
        </div>
      </div>

      <!-- PRODUCT ADD / EDIT MODAL -->
      <Teleport to="body">
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
          @click="showModal = false"
        >
          <div
            @click.stop
            class="bg-white max-w-2xl w-full border border-[#E3D9CE] shadow-2xl rounded-3xl p-6 sm:p-8 my-8 relative max-h-[90vh] overflow-y-auto"
          >
            <!-- Modal Header -->
            <div class="flex items-center justify-between pb-4 mb-6 border-b border-[#E3D9CE]">
              <h3 class="font-serif text-xl font-bold text-[#1A1A1A]">
                {{ isEditing ? 'Edit Produk' : 'Tambah Produk Baru' }}
              </h3>
              <button @click="showModal = false" class="p-2 hover:bg-stone-100 rounded-full cursor-pointer">
                <X class="w-5 h-5 text-[#1A1A1A]" />
              </button>
            </div>

            <!-- Modal Form -->
            <form @submit.prevent="saveProductForm" class="space-y-4 text-xs font-sans">
              <!-- Name & Tagline -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block uppercase font-bold text-[#1A1A1A] mb-1">Nama Produk *</label>
                  <input
                    type="text"
                    required
                    v-model="form.name"
                    placeholder="Contoh: Avara Leather Tote"
                    class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none"
                  />
                </div>

                <div>
                  <label class="block uppercase font-bold text-[#1A1A1A] mb-1">Tagline Ringkas</label>
                  <input
                    type="text"
                    v-model="form.tagline"
                    placeholder="Contoh: Tas Kulit Premium Handcrafted"
                    class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none"
                  />
                </div>
              </div>

              <!-- Category & Prices -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block uppercase font-bold text-[#1A1A1A] mb-1">Kategori *</label>
                  <select
                    v-model="form.category"
                    class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none bg-white"
                  >
                    <option value="leather">Leather Goods</option>
                    <option value="wear">Busana & Sepatu</option>
                    <option value="accessories">Aksesoris & Jam</option>
                    <option value="fragrance">Parfum & Wewangian</option>
                  </select>
                </div>

                <div>
                  <label class="block uppercase font-bold text-[#1A1A1A] mb-1">Harga (IDR) *</label>
                  <input
                    type="number"
                    required
                    v-model.number="form.price"
                    placeholder="2500000"
                    class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none"
                  />
                </div>

                <div>
                  <label class="block uppercase font-bold text-[#1A1A1A] mb-1">Harga Coret / Original (IDR)</label>
                  <input
                    type="number"
                    v-model.number="form.originalPrice"
                    placeholder="2800000"
                    class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none"
                  />
                </div>
              </div>

              <!-- Shopee Image URL & Live Preview -->
              <div>
                <label class="block uppercase font-bold text-[#1A1A1A] mb-1">
                  URL Gambar Produk (Shopee / CDN / Web) *
                </label>
                <div class="flex gap-2">
                  <input
                    type="text"
                    required
                    v-model="form.imageUrl"
                    placeholder="https://cf.shopee.co.id/file/... atau /images/product_tote.jpg"
                    class="flex-1 p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none"
                  />
                </div>
                <div v-if="form.imageUrl" class="mt-2 flex items-center gap-3 bg-[#F6F4EE] p-2 rounded-xl">
                  <img :src="form.imageUrl" alt="Preview" class="w-12 h-12 object-cover rounded-lg border border-[#E3D9CE]" />
                  <span class="text-[11px] text-stone-500">Preview Gambar Utama</span>
                </div>
              </div>

              <!-- Shopee Product URL -->
              <div>
                <label class="block uppercase font-bold text-[#1A1A1A] mb-1">
                  Tautan Produk Shopee (URL Beli) *
                </label>
                <input
                  type="text"
                  required
                  v-model="form.shopeeUrl"
                  placeholder="https://shopee.co.id/product-name-i.123456.78910"
                  class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none"
                />
              </div>

              <!-- Stock & Badges -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E3D9CE]">
                <div>
                  <label class="block uppercase font-bold text-[#1A1A1A] mb-1">Jumlah Stok</label>
                  <input
                    type="number"
                    v-model.number="form.stockCount"
                    class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none"
                  />
                </div>

                <div class="flex items-center gap-2 pt-6">
                  <input type="checkbox" id="inStock" v-model="form.inStock" class="w-4 h-4 accent-[#AD9277]" />
                  <label for="inStock" class="font-semibold text-[#1A1A1A]">Tersedia dalam Stok</label>
                </div>

                <div class="flex items-center gap-2 pt-6">
                  <input type="checkbox" id="isBestSeller" v-model="form.isBestSeller" class="w-4 h-4 accent-[#AD9277]" />
                  <label for="isBestSeller" class="font-semibold text-[#1A1A1A]">Set sebagai Best Seller</label>
                </div>
              </div>

              <!-- Description -->
              <div>
                <label class="block uppercase font-bold text-[#1A1A1A] mb-1">Deskripsi Lengkap</label>
                <textarea
                  rows="3"
                  v-model="form.description"
                  placeholder="Deskripsikan bahan, pembuatan, dan keunggulan produk..."
                  class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none"
                ></textarea>
              </div>

              <!-- Modal Footer Actions -->
              <div class="pt-4 border-t border-[#E3D9CE] flex justify-end gap-3">
                <button
                  type="button"
                  @click="showModal = false"
                  class="px-5 py-2.5 border border-[#E3D9CE] rounded-full text-[#1A1A1A] hover:bg-stone-100 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="productStore.isSyncing"
                  class="px-6 py-2.5 bg-[#2A1D15] hover:bg-[#AD9277] text-white font-bold uppercase tracking-wider rounded-full shadow-md cursor-pointer transition-all"
                >
                  {{ productStore.isSyncing ? 'Menyimpan...' : 'Simpan Produk ke Firebase' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useProductStore } from '../store/productStore';
import { useContentStore } from '../store/contentStore';
import type { Product } from '../types/Product';
import {
  Package,
  Sliders,
  Plus,
  Search,
  Pencil,
  Trash2,
  Database,
  ShoppingBag,
  ExternalLink,
  X
} from 'lucide-vue-next';

const productStore = useProductStore();
const contentStore = useContentStore();

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
