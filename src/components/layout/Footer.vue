<template>
  <footer
    class="bg-[#2A1D15] text-[#F6F4EE] pt-16 pb-12 border-t border-[#3D2B1F]"
  >
    <div class="max-w-7xl mx-auto px-4 lg:px-12">
      <!-- Top Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-stone-800"
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

        <!-- Quick Links -->
        <div class="space-y-3 font-sans text-xs">
          <h3
            class="font-serif text-sm font-bold tracking-wider text-[#AD9277] uppercase"
          >
            Koleksi Produk
          </h3>
          <ul class="space-y-2 text-[#D1C7BD]">
            <li>
              <router-link
                to="/shop?category=leather"
                class="hover:text-white transition-colors"
                >Leather Goods Premium</router-link
              >
            </li>
            <li>
              <router-link
                to="/shop?category=wear"
                class="hover:text-white transition-colors"
                >Busana & Sepatu Suede</router-link
              >
            </li>
            <li>
              <router-link
                to="/shop?category=accessories"
                class="hover:text-white transition-colors"
                >Aksesoris & Jam Tangan</router-link
              >
            </li>
            <li>
              <router-link
                to="/shop?category=fragrance"
                class="hover:text-white transition-colors"
                >Parfum & Wewangian Niche</router-link
              >
            </li>
            <li>
              <router-link to="/shop" class="hover:text-white transition-colors"
                >Katalog Lengkap</router-link
              >
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

        <!-- Newsletter Subscription -->
        <div class="space-y-4 font-sans">
          <h3
            class="font-serif text-sm font-bold tracking-wider text-[#AD9277] uppercase"
          >
            Langganan Privé
          </h3>
          <p class="text-xs text-[#D1C7BD] leading-relaxed">
            Dapatkan akses awal ke koleksi terbatas dan penawaran istimewa dari
            Avara Studio.
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-[#8C755E]"
      >
        <p>© 2026 AVARA STUDIO. Seluruh hak cipta dilindungi undang-undang.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToastStore } from "../../store/toastStore";
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-vue-next";

const emailInput = ref("");
const toastStore = useToastStore();

function handleSubscribe() {
  if (emailInput.value.includes("@")) {
    toastStore.showToast(
      "Langganan Berhasil!",
      "Terima kasih telah bergabung. Gunakan kode AVARA10 untuk diskon 10%.",
      "success",
    );
    emailInput.value = "";
  } else {
    toastStore.showToast(
      "Email Tidak Valid",
      "Silakan masukkan alamat email yang benar.",
      "warning",
    );
  }
}
</script>
