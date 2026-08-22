<template>
  <section
    class="relative bg-[#F6F4EE] border-b border-[#E3D9CE] overflow-hidden"
  >
    <div
      class="max-w-7xl mx-auto px-4 lg:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
    >
      <!-- Text Content Left -->
      <div class="lg:col-span-7 space-y-6 z-10 animate-fade-in">
        <h1
          class="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] leading-[1.15] tracking-tight"
        >
          Kemewahan Elegan Dalam
          <span class="text-[#AD9277] italic font-normal">Warna Hangat</span> &
          Desain Abadi
        </h1>

        <p
          class="font-sans text-sm sm:text-base text-[#6B6B6B] leading-relaxed max-w-xl"
        >
          Setiap karya Avara Studio dirancang presisi dengan bahan pilihan
          bermutu tinggi, memadukan tone warna cokelat warm cream & bronze yang
          mewah untuk gaya yang menawan.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <router-link to="/shop">
            <BaseButton variant="primary">
              Eksplor Koleksi <ArrowRight class="w-4 h-4" />
            </BaseButton>
          </router-link>
          <router-link to="/about">
            <BaseButton variant="outline"> Filosofi Brand </BaseButton>
          </router-link>
        </div>
      </div>

      <!-- Hero Visual Right -->
      <div class="lg:col-span-5 relative">
        <div class="relative mx-auto max-w-md lg:max-w-none">
          <!-- Background Decorative Shape -->
          <div
            class="absolute -top-4 -left-4 w-full h-full border-2 border-[#AD9277] rounded-3xl translate-x-3 translate-y-3 pointer-events-none"
          ></div>

          <!-- Image Frame -->
          <div
            class="relative bg-white p-3 shadow-xl border border-[#E3D9CE] rounded-3xl overflow-hidden"
          >
            <img
              src="/images/hero_fashion.jpg"
              alt="Avara Studio Fashion Collection"
              class="w-full h-[420px] lg:h-[500px] object-cover rounded-2xl"
            />
            <!-- Floating Overlay Tag -->
            <div
              class="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xs p-4 border border-[#E3D9CE] shadow-lg rounded-2xl flex items-center justify-between"
            >
              <div>
                <span
                  class="text-[10px] text-[#AD9277] uppercase font-bold tracking-widest block"
                  >Signature Edition</span
                >
                <span class="font-serif font-semibold text-sm text-[#1A1A1A]"
                  >Camel Cashmere Trench & Bag</span
                >
              </div>
              <router-link
                to="/shop"
                class="text-xs font-semibold text-[#3D2B1F] underline hover:text-[#AD9277]"
              >
                Lihat
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "../common/BaseButton.vue";
import { ArrowRight, Sparkles } from "lucide-vue-next";
</script>
