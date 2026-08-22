<template>
  <section class="py-20 bg-[#2A1D15] text-[#F6F4EE] relative overflow-hidden">
    <!-- Subtle Background Pattern -->
    <div
      class="max-w-7xl mx-auto px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
    >
      <!-- Visual Left -->
      <div class="space-y-4">
        <div class="border-2 border-[#AD9277] p-2 rounded-3xl">
          <img
            src="/images/hero_fashion.jpg"
            alt="Craftsmanship Avara Studio"
            class="w-full h-[400px] object-cover rounded-2xl"
          />
        </div>
      </div>

      <!-- Text Right -->
      <div class="space-y-6 font-sans">
        <span
          class="text-xs font-bold uppercase tracking-[0.3em] text-[#AD9277]"
        >
          Filosofi & Identitas Brand
        </span>

        <h2
          class="font-serif text-3xl sm:text-4xl font-extrabold text-[#F6F4EE] leading-tight"
        >
          Sentuhan Warna Cokelat Warm Cream & Keahlian Pengrajin Sejati
        </h2>

        <p class="text-xs sm:text-sm text-[#D1C7BD] leading-relaxed">
          Terinspirasi oleh logo Avara Studio yang merefleksikan estetika mewah
          nan bersahaja, setiap koleksi dirancang dengan perpaduan palet warna
          Warm Cream (#F6F4EE), Deep Bronze (#8C755E), dan Elegant Bronze
          (#AD9277).
        </p>

        <p class="text-xs sm:text-sm text-[#D1C7BD] leading-relaxed">
          Kami percaya bahwa kemewahan sejati bukanlah sesuatu yang mencolok,
          melainkan detail halus pada setiap jahitan kulit asli, tekstur kain
          pilihan, serta daya tahan produk yang melintasi generasi.
        </p>

        <div class="pt-4">
          <router-link to="/about">
            <BaseButton variant="outline-bronze">
              Baca Cerita Lengkap
            </BaseButton>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "../common/BaseButton.vue";
</script>
