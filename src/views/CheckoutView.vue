<template>
  <div class="bg-[#F6F4EE] min-h-screen py-12 border-b border-[#E3D9CE]">
    <div class="max-w-6xl mx-auto px-4 lg:px-12 font-sans">
      
      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="font-serif text-3xl font-extrabold text-[#1A1A1A]">
          Pembayaran & Checkout Privé
        </h1>
        <p class="text-xs text-[#6B6B6B] mt-1">Selesaikan pesanan Anda dengan aman melalui enkripsi 256-bit SSL.</p>
      </div>

      <div v-if="cartStore.items.length === 0 && !orderCompleted" class="bg-white p-12 text-center border border-[#E3D9CE] rounded-3xl shadow-xs">
        <div class="w-16 h-16 bg-[#F3EDE6] rounded-full flex items-center justify-center mx-auto mb-3 text-[#AD9277]">
          <ShoppingBag class="w-8 h-8" />
        </div>
        <h2 class="font-serif text-xl font-bold mb-2">Keranjang Anda Masih Kosong</h2>
        <p class="text-xs text-[#6B6B6B] mb-6">Silakan pilih produk favorit Anda di katalog kami.</p>
        <router-link to="/shop">
          <BaseButton variant="primary">Lihat Katalog Produk</BaseButton>
        </router-link>
      </div>

      <!-- Checkout Grid -->
      <div v-else-if="!orderCompleted" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Form Left -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Shipping Address -->
          <div class="bg-white p-6 border border-[#E3D9CE] rounded-2xl shadow-xs space-y-4">
            <h2 class="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              <MapPin class="w-5 h-5 text-[#AD9277]" /> 1. Alamat Pengiriman
            </h2>

            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label class="block font-semibold mb-1">Nama Depan *</label>
                <input v-model="form.firstName" type="text" class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none" required />
              </div>
              <div>
                <label class="block font-semibold mb-1">Nama Belakang *</label>
                <input v-model="form.lastName" type="text" class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none" required />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label class="block font-semibold mb-1">Email *</label>
                <input v-model="form.email" type="email" class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none" required />
              </div>
              <div>
                <label class="block font-semibold mb-1">Nomor WhatsApp *</label>
                <input v-model="form.phone" type="tel" class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none" required />
              </div>
            </div>

            <div class="text-xs">
              <label class="block font-semibold mb-1">Alamat Lengkap (Jalan, No. Rumah, RT/RW) *</label>
              <textarea v-model="form.address" rows="3" class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none" required></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label class="block font-semibold mb-1">Kota / Kabupaten *</label>
                <input v-model="form.city" type="text" class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none" required />
              </div>
              <div>
                <label class="block font-semibold mb-1">Kode Pos *</label>
                <input v-model="form.postalCode" type="text" class="w-full p-2.5 border border-[#E3D9CE] rounded-xl focus:border-[#AD9277] focus:outline-none" required />
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="bg-white p-6 border border-[#E3D9CE] rounded-2xl shadow-xs space-y-4">
            <h2 class="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              <CreditCard class="w-5 h-5 text-[#AD9277]" /> 2. Metode Pembayaran
            </h2>

            <div class="space-y-3 text-xs">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                class="flex items-start gap-3 p-4 border rounded-2xl cursor-pointer transition-all"
                :class="form.paymentMethod === method.id ? 'border-[#AD9277] bg-[#F3EDE6]' : 'border-[#E3D9CE] hover:bg-[#F6F4EE]'"
              >
                <input type="radio" v-model="form.paymentMethod" :value="method.id" class="mt-0.5 text-[#AD9277]" />
                <div class="flex-1">
                  <div class="font-semibold text-[#1A1A1A] flex items-center justify-between">
                    <span>{{ method.name }}</span>
                    <span class="text-[10px] bg-white px-2 py-0.5 rounded-full border border-stone-300 text-[#AD9277] uppercase font-bold">{{ method.badge }}</span>
                  </div>
                  <p class="text-[#6B6B6B] text-[11px] mt-0.5">{{ method.description }}</p>
                </div>
              </label>
            </div>
          </div>

          <BaseButton variant="primary" fullWidth @click="processOrder">
            <CheckCircle class="w-4 h-4" /> Konfirmasi & Bayar {{ formatRupiah(cartStore.grandTotal) }}
          </BaseButton>
        </div>

        <!-- Order Summary Right -->
        <div class="lg:col-span-5">
          <div class="bg-white p-6 border border-[#E3D9CE] rounded-2xl shadow-xs sticky top-28 space-y-4">
            <h2 class="font-serif text-lg font-bold text-[#1A1A1A]">Ringkasan Pesanan</h2>

            <!-- Items -->
            <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
              <div
                v-for="item in cartStore.items"
                :key="item.product.id"
                class="flex items-center gap-3 py-2 border-b border-[#E3D9CE] text-xs"
              >
                <img :src="item.product.imageUrl" :alt="item.product.name" class="w-12 h-14 object-cover bg-[#F6F4EE] rounded-lg" />
                <div class="flex-1 min-w-0">
                  <h4 class="font-serif font-semibold text-[#1A1A1A] truncate">{{ item.product.name }}</h4>
                  <p class="text-[#6B6B6B] text-[11px]">Qty: {{ item.quantity }}</p>
                </div>
                <div class="font-serif font-bold text-[#3D2B1F]">
                  {{ formatRupiah(item.product.price * item.quantity) }}
                </div>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-2 text-xs pt-2 font-sans border-t border-[#E3D9CE]">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>{{ formatRupiah(cartStore.subtotal) }}</span>
              </div>
              <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-emerald-700 font-medium">
                <span>Voucher Diskon</span>
                <span>-{{ formatRupiah(cartStore.discountAmount) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Ongkos Kirim Express</span>
                <span>{{ cartStore.isFreeShipping ? 'GRATIS' : formatRupiah(cartStore.shippingCost) }}</span>
              </div>
              <div class="flex justify-between text-base font-serif font-bold text-[#1A1A1A] pt-3 border-t border-[#E3D9CE]">
                <span>Total Pembayaran</span>
                <span class="text-[#3D2B1F]">{{ formatRupiah(cartStore.grandTotal) }}</span>
              </div>
            </div>

            <div class="bg-[#F3EDE6] p-3 text-[11px] text-[#3D2B1F] rounded-xl flex items-start gap-2">
              <ShieldCheck class="w-4 h-4 text-[#AD9277] shrink-0 mt-0.5" />
              <span>Garansi Keaslian Produk 100% & Pengembalian Bebas Risiko 30 Hari.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Completed Success State -->
      <div v-else class="max-w-2xl mx-auto bg-white p-8 lg:p-12 border border-[#E3D9CE] rounded-3xl shadow-2xl text-center space-y-6 animate-fade-in">
        <div class="w-16 h-16 bg-[#F3EDE6] text-[#AD9277] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle class="w-10 h-10" />
        </div>

        <div>
          <span class="text-xs uppercase font-bold text-[#AD9277] tracking-widest block">Pesanan Diterima</span>
          <h2 class="font-serif text-3xl font-extrabold text-[#1A1A1A] mt-1">Terima Kasih, {{ form.firstName }}!</h2>
          <p class="text-xs text-[#6B6B6B] mt-2">
            Pesanan Anda telah dikonfirmasi dan sedang diproses oleh Tim Concierge Avara Studio.
          </p>
        </div>

        <div class="bg-[#F6F4EE] p-5 text-xs space-y-2 text-left border border-[#E3D9CE] rounded-2xl">
          <div class="flex justify-between">
            <span class="text-[#6B6B6B]">Nomor Pesanan:</span>
            <strong class="font-mono text-[#3D2B1F]">{{ orderId }}</strong>
          </div>
          <div class="flex justify-between">
            <span class="text-[#6B6B6B]">Nomor Resi Pengiriman:</span>
            <strong class="font-mono text-[#AD9277]">{{ trackingNumber }}</strong>
          </div>
          <div class="flex justify-between">
            <span class="text-[#6B6B6B]">Metode Pembayaran:</span>
            <span class="uppercase font-semibold">{{ form.paymentMethod }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#6B6B6B]">Total Diberbayar:</span>
            <span class="font-serif font-bold text-[#3D2B1F]">{{ formatRupiah(finalPaidTotal) }}</span>
          </div>
        </div>

        <div class="pt-4 flex flex-wrap gap-4 justify-center">
          <router-link to="/">
            <BaseButton variant="primary">Kembali Ke Beranda</BaseButton>
          </router-link>
          <router-link to="/shop">
            <BaseButton variant="outline">Belanja Lagi</BaseButton>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import BaseButton from '../components/common/BaseButton.vue';
import { MapPin, CreditCard, ShieldCheck, CheckCircle, ShoppingBag } from 'lucide-vue-next';

const cartStore = useCartStore();
const toastStore = useToastStore();

const orderCompleted = ref(false);
const orderId = ref('');
const trackingNumber = ref('');
const finalPaidTotal = ref(0);

const form = reactive({
  firstName: 'Budi',
  lastName: 'Santoso',
  email: 'budi.santoso@example.com',
  phone: '081234567890',
  address: 'Jl. Senopati No. 45, Kebayoran Baru',
  city: 'Jakarta Selatan',
  postalCode: '12190',
  paymentMethod: 'bca_va'
});

const paymentMethods = [
  { id: 'bca_va', name: 'Virtual Account BCA / Mandiri', badge: 'Instan', description: 'Konfirmasi otomatis dalam 1 menit.' },
  { id: 'qris', name: 'QRIS (Gopay, OVO, ShopeePay, Dana)', badge: 'Bebas Biaya', description: 'Scan QR code dengan aplikasi e-wallet apa saja.' },
  { id: 'credit_card', name: 'Kartu Kredit / Debit (Visa / Mastercard)', badge: 'SSL 256-bit', description: 'Cicilan 0% hingga 12 bulan.' },
  { id: 'cod', name: 'Bayar di Tempat (COD)', badge: 'Khusus Jabodetabek', description: 'Bayar kas saat kurir tiba.' }
];

function processOrder() {
  if (!form.firstName || !form.address || !form.email) {
    toastStore.showToast('Data Belum Lengkap', 'Silakan isi seluruh formulir pengiriman.', 'warning');
    return;
  }

  orderId.value = 'AVR-' + Math.floor(100000 + Math.random() * 900000);
  trackingNumber.value = 'AVR-EXP-' + Math.floor(10000000 + Math.random() * 90000000);
  finalPaidTotal.value = cartStore.grandTotal;

  orderCompleted.value = true;
  cartStore.clearCart();

  toastStore.showToast(
    'Pembayaran Berhasil!',
    `Pesanan ${orderId.value} telah diterima dan siap dikirim.`,
    'success'
  );
}

function formatRupiah(val: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
}
</script>
