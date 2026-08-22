<template>
  <section class="py-16 bg-[#F6F4EE] border-b border-[#E3D9CE]">
    <div class="max-w-7xl mx-auto px-4 lg:px-12">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span class="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#AD9277]">
          Ulasan Pembeli Privé
        </span>
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
          Apa Kata Pelanggan Avara
        </h2>
        <div class="w-12 h-0.5 bg-[#AD9277] mx-auto mt-3 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="item in testimonials"
          :key="item.id"
          class="bg-white p-6 border border-[#E3D9CE] shadow-xs space-y-4 flex flex-col justify-between rounded-2xl hover:shadow-lg transition-all duration-300"
        >
          <div class="space-y-3">
            <div class="flex text-amber-500">
              <Star v-for="n in 5" :key="n" class="w-4 h-4 fill-amber-400" />
            </div>

            <p class="text-xs text-[#1A1A1A] leading-relaxed italic font-serif text-base">
              "{{ item.comment }}"
            </p>
          </div>

          <div class="pt-4 border-t border-[#E3D9CE] flex items-center justify-between font-sans">
            <div>
              <h4 class="font-semibold text-xs text-[#1A1A1A]">{{ item.name }}</h4>
              <span class="text-[10px] text-[#6B6B6B]">{{ item.city }} • Verified Buyer</span>
            </div>
            <BaseBadge variant="bronze">{{ item.productPurchased }}</BaseBadge>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next';
import BaseBadge from '../common/BaseBadge.vue';

const testimonials = [
  {
    id: '1',
    name: 'Anindya Putri',
    city: 'Jakarta Selatan',
    productPurchased: 'Avara Signature Tote',
    comment: 'Kualitas kulit cognac asli sangat tebal dan wangi. Warna warm bronze dan gold hardware nya bener-bener memberikan kesan mewah yang understated.'
  },
  {
    id: '2',
    name: 'Reza Pratama',
    city: 'Surabaya',
    productPurchased: 'Bronze Chronograph',
    comment: 'Jam tangan dengan dial cokelat ini sangat elegan dipadukan dengan kemeja maupun jas. Pengiriman kilat dan kemasan kardusnya mewah sekali.'
  },
  {
    id: '3',
    name: 'Clara Wijaya',
    city: 'Bandung',
    productPurchased: 'Aethelred Parfum',
    comment: 'Wangi amber wood nya sangat tahan lama dan lembut di kulit. Suami saya selalu memuji aroma parfum ini. Recommended!'
  }
];
</script>
