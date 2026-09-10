<template>
  <footer
    class="bg-[#2A1D15] text-[#F6F4EE] pt-16 pb-12 border-t border-[#3D2B1F]"
  >
    <div class="max-w-7xl mx-auto px-4 lg:px-12">
      <!-- Top Grid (3 Columns) -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-10 pb-14 border-b border-stone-800"
      >
        <!-- Brand Info -->
        <div class="space-y-4">
          <div class="flex flex-col">
            <span
              class="font-cinzel text-2xl font-extrabold tracking-[0.25em] text-[#F6F4EE]"
            >
              AVARA
            </span>
            <span
              class="font-sans text-[9px] uppercase tracking-[0.45em] text-[#AD9277] -mt-1 font-semibold"
            >
              STUDIO
            </span>
          </div>
          <p class="text-xs text-[#D1C7BD] leading-relaxed font-sans">
            Avara Studio menghadirkan koleksi barang kulit, pakaian, dan
            wewangian dengan estetika minimalis elegan dan craftsmanship tinggi.
          </p>
          <div class="flex items-center gap-3 pt-2 text-[#AD9277]">
            <div
              class="p-2 bg-stone-900 rounded-full hover:bg-[#AD9277] hover:text-white transition-colors cursor-pointer"
            >
              <Instagram class="w-4 h-4" />
            </div>
            <div
              class="p-2 bg-stone-900 rounded-full hover:bg-[#AD9277] hover:text-white transition-colors cursor-pointer"
            >
              <Facebook class="w-4 h-4" />
            </div>
          </div>
        </div>

        <!-- Categories Link (Kategori - Maksimal 5) -->
        <div class="space-y-3 font-sans text-xs">
          <h3
            class="font-serif text-sm font-bold tracking-wider text-[#AD9277] uppercase"
          >
            Kategori
          </h3>
          <ul class="space-y-2 text-[#D1C7BD]">
            <li v-for="cat in footerCategories" :key="cat.id">
              <router-link
                :to="`/shop?category=${cat.id}`"
                class="hover:text-white transition-colors"
              >
                {{ cat.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Customer Care -->
        <div class="space-y-3 font-sans text-xs">
          <h3
            class="font-serif text-sm font-bold tracking-wider text-[#AD9277] uppercase"
          >
            Layanan Pelanggan
          </h3>
          <ul class="space-y-2 text-[#D1C7BD]">
            <li class="flex items-center gap-2">
              <Phone class="w-4 h-4 text-[#AD9277] shrink-0" />
              <span>WhatsApp VIP: +62 812-9988-7766</span>
            </li>
            <li class="flex items-center gap-2">
              <Mail class="w-4 h-4 text-[#AD9277] shrink-0" />
              <span>concierge@avarastudio.id</span>
            </li>
            <li class="pt-1">
              <span class="text-[#AD9277] font-semibold"
                >Jam Operasional Concierge:</span
              ><br />
              Senin - Minggu (09:00 - 21:00 WIB)
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-8 flex flex-col sm:flex-row items-center justify-between text-center gap-4 text-xs font-sans text-[#8C755E]"
      >
        <p>© 2026 AVARA STUDIO. Seluruh hak cipta dilindungi undang-undang.</p>
        <router-link to="/admin" class="hover:text-white transition-colors underline flex items-center gap-1">
          <span>Dashboard Admin Studio</span>
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProductStore } from "../../store/productStore";
import { Instagram, Facebook, Phone, Mail } from "lucide-vue-next";

const productStore = useProductStore();

const footerCategories = computed(() => {
  return productStore.categories
    .filter((cat) => cat.id !== "all")
    .slice(0, 5);
});
</script>
