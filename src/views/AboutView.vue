<template>
  <div class="bg-[#F6F4EE] min-h-screen py-16 border-b border-[#E3D9CE]">
    <div class="max-w-5xl mx-auto px-4 lg:px-12 font-sans space-y-16">
      
      <!-- Header Banner -->
      <div class="text-center space-y-4">
        <span class="text-xs font-bold uppercase tracking-[0.3em] text-[#AD9277]">
          Kisah & Brand Identity
        </span>
        <h1 class="font-serif text-4xl sm:text-5xl font-extrabold text-[#1A1A1A]">
          Tentang Avara Studio
        </h1>
        <p class="text-xs sm:text-sm text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
          Platform e-commerce studio eksklusif dengan fokus pada gaya hidup mewah, estetika minimalis, dan dedikasi pada keaslian bahan.
        </p>
        <div class="w-16 h-0.5 bg-[#AD9277] mx-auto rounded-full"></div>
      </div>

      <!-- Hero Visual Image -->
      <div class="border-2 border-[#E3D9CE] bg-white p-3 shadow-xl rounded-3xl overflow-hidden">
        <img src="/images/hero_fashion.jpg" alt="Avara Studio Identity" class="w-full h-96 object-cover rounded-2xl" />
      </div>

      <!-- Color Palette Showcase Section (matching design.md) -->
      <div class="bg-white p-8 border border-[#E3D9CE] rounded-3xl shadow-xs space-y-6">
        <div class="space-y-1">
          <span class="text-xs uppercase font-bold text-[#AD9277] tracking-widest">Desain & Warna</span>
          <h2 class="font-serif text-2xl font-bold text-[#1A1A1A]">Palet Warna Khusus Avara Studio</h2>
          <p class="text-xs text-[#6B6B6B]">
            Skema warna netral dan mewah yang diambil langsung dari panduan desain logo Avara Studio (design.md):
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-sans">
          <div class="p-3 border border-[#E3D9CE] rounded-2xl text-center space-y-2">
            <div class="w-full h-12 bg-[#F6F4EE] border border-stone-300 rounded-xl"></div>
            <span class="font-bold block text-[#1A1A1A]">Warm Cream</span>
            <span class="text-[10px] text-[#6B6B6B]">#F6F4EE</span>
          </div>
          <div class="p-3 border border-[#E3D9CE] rounded-2xl text-center space-y-2">
            <div class="w-full h-12 bg-white border border-stone-300 rounded-xl"></div>
            <span class="font-bold block text-[#1A1A1A]">Pure White</span>
            <span class="text-[10px] text-[#6B6B6B]">#FFFFFF</span>
          </div>
          <div class="p-3 border border-[#E3D9CE] rounded-2xl text-center space-y-2">
            <div class="w-full h-12 bg-[#AD9277] rounded-xl"></div>
            <span class="font-bold block text-[#1A1A1A]">Elegant Bronze</span>
            <span class="text-[10px] text-[#6B6B6B]">#AD9277</span>
          </div>
          <div class="p-3 border border-[#E3D9CE] rounded-2xl text-center space-y-2">
            <div class="w-full h-12 bg-[#8C755E] rounded-xl"></div>
            <span class="font-bold block text-[#1A1A1A]">Deep Bronze</span>
            <span class="text-[10px] text-[#6B6B6B]">#8C755E</span>
          </div>
          <div class="p-3 border border-[#E3D9CE] rounded-2xl text-center space-y-2">
            <div class="w-full h-12 bg-[#3D2B1F] rounded-xl"></div>
            <span class="font-bold block text-white bg-[#3D2B1F] py-0.5 rounded-full">Espresso</span>
            <span class="text-[10px] text-[#6B6B6B]">#3D2B1F</span>
          </div>
          <div class="p-3 border border-[#E3D9CE] rounded-2xl text-center space-y-2">
            <div class="w-full h-12 bg-[#1A1A1A] rounded-xl"></div>
            <span class="font-bold block text-[#1A1A1A]">Deep Black</span>
            <span class="text-[10px] text-[#6B6B6B]">#1A1A1A</span>
          </div>
        </div>
      </div>

      <!-- Principles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-6 border border-[#E3D9CE] rounded-2xl space-y-3">
          <div class="w-10 h-10 bg-[#F3EDE6] text-[#AD9277] rounded-full flex items-center justify-center font-serif font-bold text-lg">1</div>
          <h3 class="font-serif font-bold text-lg text-[#1A1A1A]">Minimalisme Anggun</h3>
          <p class="text-xs text-[#6B6B6B] leading-relaxed">
            Menghargai ruang negatif untuk membiarkan keindahan produk dan karakter kulit asli bersinar tanpa ornamen berlebihan.
          </p>
        </div>

        <div class="bg-white p-6 border border-[#E3D9CE] rounded-2xl space-y-3">
          <div class="w-10 h-10 bg-[#F3EDE6] text-[#AD9277] rounded-full flex items-center justify-center font-serif font-bold text-lg">2</div>
          <h3 class="font-serif font-bold text-lg text-[#1A1A1A]">Dual Tipografi Serif & Sans</h3>
          <p class="text-xs text-[#6B6B6B] leading-relaxed">
            Penggunaan Playfair Display / Cinzel untuk judul kemewahan klasik, dipadu Montserrat untuk keterbacaan modern yang bersih.
          </p>
        </div>

        <div class="bg-white p-6 border border-[#E3D9CE] rounded-2xl space-y-3">
          <div class="w-10 h-10 bg-[#F3EDE6] text-[#AD9277] rounded-full flex items-center justify-center font-serif font-bold text-lg">3</div>
          <h3 class="font-serif font-bold text-lg text-[#1A1A1A]">Standard Kualitas Tinggi</h3>
          <p class="text-xs text-[#6B6B6B] leading-relaxed">
            Menggunakan 100% genuine full-grain leather, wool cashmere, dan bahan ramah lingkungan bersertifikasi internasional.
          </p>
        </div>
      </div>

      <!-- Concierge & Showroom CTA -->
      <div class="bg-[#2A1D15] text-[#F6F4EE] p-8 lg:p-12 text-center space-y-6 border border-[#3D2B1F] rounded-3xl">
        <span class="text-xs uppercase font-bold text-[#AD9277] tracking-widest block">Privé Concierge</span>
        <h2 class="font-serif text-3xl font-extrabold">Kunjungi Flagship Showroom Kami</h2>
        <p class="text-xs text-[#D1C7BD] max-w-lg mx-auto leading-relaxed">
          Nikmati pengalaman belanja privat ditemani personal stylist berpengalaman di showroom Avara Studio Senopati, Jakarta Selatan.
        </p>
        <router-link to="/shop">
          <BaseButton variant="primary">Eksplor Produk Sekarang</BaseButton>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../components/common/BaseButton.vue';
</script>
