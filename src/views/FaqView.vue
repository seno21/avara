<template>
  <div class="bg-[#F6F4EE] min-h-screen py-16 border-b border-[#E3D9CE]">
    <div class="max-w-3xl mx-auto px-4 lg:px-8 font-sans space-y-10">
      
      <!-- Header -->
      <div class="text-center space-y-3">
        <span class="text-xs font-bold uppercase tracking-[0.3em] text-[#AD9277]">
          Bantuan & Informasi
        </span>
        <h1 class="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
          Pertanyaan Umum (FAQ)
        </h1>
        <p class="text-xs sm:text-sm text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
          Temukan jawaban atas pertanyaan seputar produk, pengiriman, perawatan bahan, dan layanan pelanggan Avara Studio.
        </p>
        <div class="w-12 h-0.5 bg-[#AD9277] mx-auto rounded-full mt-4"></div>
      </div>

      <!-- Simple Accordion FAQ List -->
      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white border border-[#E3D9CE] rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-serif font-bold text-base text-[#1A1A1A] hover:text-[#AD9277] transition-colors cursor-pointer"
          >
            <span>{{ faq.question }}</span>
            <ChevronDown
              class="w-5 h-5 text-[#AD9277] shrink-0 transition-transform duration-300"
              :class="openIndex === index ? 'rotate-180' : ''"
            />
          </button>

          <div
            v-if="openIndex === index"
            class="px-6 pb-6 pt-1 text-xs text-[#6B6B6B] leading-relaxed border-t border-[#F6F4EE] font-sans animate-fade-in"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>

      <!-- Minimal Concierge Note -->
      <div class="bg-white p-6 border border-[#E3D9CE] rounded-2xl text-center space-y-2">
        <h3 class="font-serif font-bold text-sm text-[#1A1A1A]">Punya Pertanyaan Lain?</h3>
        <p class="text-xs text-[#6B6B6B]">
          Tim Concierge kami siap membantu Anda setiap hari pukul 09:00 - 21:00 WIB melalui WhatsApp VIP: <strong class="text-[#3D2B1F]">+62 812-9988-7766</strong>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

const openIndex = ref<number | null>(0);

function toggleFaq(index: number) {
  openIndex.value = openIndex.value === index ? null : index;
}

const faqs = [
  {
    question: 'Apakah seluruh produk barang kulit di Avara Studio menggunakan kulit asli?',
    answer: 'Ya, seluruh koleksi Leather Goods Avara Studio dibuat dari 100% Genuine Full-Grain Leather pilihan dengan proses pengerjaan halus oleh pengrajin berpengalaman.'
  },
  {
    question: 'Berapa lama estimasi waktu pengiriman pesanan?',
    answer: 'Pengiriman area Jabodetabek membutuhkan waktu 1-2 hari kerja. Untuk wilayah luar Jabodetabek dan kota lainnya di seluruh Indonesia membutuhkan waktu 2-4 hari kerja.'
  },
  {
    question: 'Bagaimana prosedur penukaran atau pengembalian barang?',
    answer: 'Kami melayani penukaran ukuran maupun produk dalam jangka waktu 7 hari sejak produk diterima, selama kondisi fisik barang masih baru dan lengkap dengan kemasan asli.'
  },
  {
    question: 'Bagaimana cara perawatan produk kulit dan suede Avara Studio?',
    answer: 'Untuk kulit, bersihkan secara berkala menggunakan kain lembut yang sedikit lembap dan berikan leather conditioner. Untuk suede, gunakan sikat khusus suede agar serat tetap terjaga.'
  },
  {
    question: 'Apakah tersedia konsultasi gaya atau pesanan khusus?',
    answer: 'Tentu. Anda dapat berkonsultasi langsung dengan personal concierge kami melalui WhatsApp VIP untuk bantuan pilihan produk, panduan ukuran, hingga pesanan hadiah eksklusif.'
  }
];
</script>
