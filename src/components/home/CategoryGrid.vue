<template>
  <section class="py-16 bg-white border-b border-[#E3D9CE]">
    <div class="max-w-7xl mx-auto px-4 lg:px-12">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span class="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#AD9277]">
          Kategori Pilihan
        </span>
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
          Temukan Gaya Mewah Anda
        </h2>
        <div class="w-12 h-0.5 bg-[#AD9277] mx-auto mt-3 rounded-full"></div>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link
          v-for="cat in categories"
          :key="cat.id"
          :to="`/shop?category=${cat.id}`"
          class="group relative h-80 overflow-hidden bg-[#F6F4EE] border border-[#E3D9CE] shadow-xs hover:shadow-xl transition-all duration-500 rounded-3xl"
        >
          <img
            :src="cat.image"
            :alt="cat.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-3xl"
          />
          <!-- Dark Overlay Gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl"></div>

          <!-- Category Info Bottom -->
          <div class="absolute bottom-0 inset-x-0 p-6 text-white space-y-1">
            <span class="text-[10px] uppercase font-bold tracking-widest text-[#AD9277]">
              {{ cat.subtitle }}
            </span>
            <h3 class="font-serif text-xl font-bold text-white group-hover:text-[#F3EDE6] transition-colors">
              {{ cat.title }}
            </h3>
            <p class="text-xs text-stone-300 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              Lihat Koleksi &rarr;
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  {
    id: 'leather',
    title: 'Leather Goods',
    subtitle: 'Tas & Dompet Kulit Premium',
    image: '/images/product_tote.jpg'
  },
  {
    id: 'wear',
    title: 'Busana & Sepatu',
    subtitle: 'Wool Cashmere & Suede',
    image: '/images/product_loafers.jpg'
  },
  {
    id: 'accessories',
    title: 'Aksesoris & Jam',
    subtitle: 'Bronze Chronograph',
    image: '/images/product_watch.jpg'
  },
  {
    id: 'fragrance',
    title: 'Parfum Niche',
    subtitle: 'Amber Woods Collection',
    image: '/images/product_perfume.jpg'
  }
];
</script>
