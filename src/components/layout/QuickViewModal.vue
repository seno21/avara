<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="productStore.quickViewProduct"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto"
        @click="productStore.closeQuickView()"
      >
        <div
          @click.stop
          class="bg-[#F6F4EE] max-w-5xl w-full border border-[#E3D9CE] shadow-2xl relative animate-fade-in my-6 overflow-hidden rounded-3xl"
        >
          <!-- Close Button -->
          <button
            @click="productStore.closeQuickView()"
            class="absolute top-4 right-4 z-20 bg-white/90 p-2.5 text-[#1A1A1A] hover:text-[#AD9277] transition-colors rounded-full shadow-md hover:scale-105 cursor-pointer"
            aria-label="Tutup"
          >
            <X class="w-5 h-5" />
          </button>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <!-- Product Image Gallery (7 Cols in LG) -->
            <div
              class="lg:col-span-7 bg-white p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E3D9CE]"
            >
              <!-- 1 Main Large View -->
              <div
                class="relative bg-[#F6F4EE] rounded-2xl overflow-hidden mb-4 flex items-center justify-center h-80 sm:h-96 md:h-[420px]"
              >
                <img
                  :src="currentMainImage"
                  :alt="product.name"
                  class="w-full h-full object-cover rounded-2xl transition-all duration-300"
                />
              </div>

              <!-- 4 Angle Thumbnails Below -->
              <div class="grid grid-cols-4 gap-3">
                <button
                  v-for="(img, idx) in productImages"
                  :key="idx"
                  @click="activeImageIndex = idx"
                  class="relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#F6F4EE]"
                  :class="
                    activeImageIndex === idx
                      ? 'border-[#AD9277] ring-2 ring-[#AD9277]/30 scale-105 shadow-md'
                      : 'border-[#E3D9CE] opacity-70 hover:opacity-100 hover:border-[#AD9277]'
                  "
                >
                  <img
                    :src="img"
                    :alt="`${product.name} angle ${idx + 1}`"
                    class="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            <!-- Product Info (5 Cols in LG) -->
            <div class="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between font-sans">
              <div class="space-y-4">
                <div>
                  <BaseBadge variant="bronze">{{
                    product.categoryLabel
                  }}</BaseBadge>
                </div>

                <div>
                  <h2 class="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] mb-1">
                    {{ product.name }}
                  </h2>
                  <p class="text-xs text-[#6B6B6B] italic">
                    {{ product.tagline }}
                  </p>
                </div>

                <!-- Price (No Rating Stars) -->
                <div class="flex items-baseline gap-3 pt-2 border-t border-[#E3D9CE]">
                  <span class="font-serif font-bold text-2xl sm:text-3xl text-[#3D2B1F]">
                    {{ formatRupiah(product.price) }}
                  </span>
                  <span
                    v-if="product.originalPrice"
                    class="text-sm text-[#6B6B6B] line-through"
                  >
                    {{ formatRupiah(product.originalPrice) }}
                  </span>
                </div>

                <p class="text-xs text-[#6B6B6B] leading-relaxed">
                  {{ product.description }}
                </p>

                <!-- Color Options -->
                <div
                  v-if="product.colors && product.colors.length > 0"
                  class="pt-2"
                >
                  <label
                    class="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2"
                  >
                    Pilihan Warna:
                    <span class="text-[#AD9277] font-normal">{{
                      selectedColor
                    }}</span>
                  </label>
                  <div class="flex gap-2">
                    <button
                      v-for="color in product.colors"
                      :key="color.name"
                      @click="selectedColor = color.name"
                      class="w-8 h-8 rounded-full border-2 transition-all p-0.5 cursor-pointer"
                      :class="
                        selectedColor === color.name
                          ? 'border-[#AD9277] scale-110 shadow-xs'
                          : 'border-transparent'
                      "
                      :title="color.name"
                    >
                      <span
                        class="block w-full h-full rounded-full"
                        :style="{ backgroundColor: color.hex }"
                      ></span>
                    </button>
                  </div>
                </div>

                <!-- Size Options -->
                <div
                  v-if="product.sizes && product.sizes.length > 0"
                  class="pt-2"
                >
                  <label
                    class="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2"
                  >
                    Ukuran:
                  </label>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="size in product.sizes"
                      :key="size"
                      @click="selectedSize = size"
                      class="px-4 py-1.5 text-xs rounded-full border transition-all cursor-pointer font-medium"
                      :class="
                        selectedSize === size
                          ? 'bg-[#AD9277] text-white border-[#AD9277]'
                          : 'bg-white border-[#E3D9CE] text-[#1A1A1A] hover:border-[#AD9277]'
                      "
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Action Button & Wishlist -->
              <div class="pt-6 mt-6 border-t border-[#E3D9CE] flex items-center gap-3">
                <a
                  :href="product.shopeeUrl || 'https://shopee.co.id/avarastudio'"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 py-3 px-6 bg-[#EE4D2D] hover:bg-[#d83f21] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag class="w-4 h-4" />
                  <span>Beli di Shopee</span>
                  <ExternalLink class="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  @click="wishlistStore.toggleWishlist(product)"
                  class="p-3 border border-[#E3D9CE] bg-white rounded-full hover:border-[#AD9277] transition-colors cursor-pointer"
                  :class="
                    wishlistStore.isInWishlist(product.id)
                      ? 'text-red-600 border-red-200 bg-red-50'
                      : 'text-[#1A1A1A]'
                  "
                  :title="wishlistStore.isInWishlist(product.id) ? 'Hapus Wishlist' : 'Simpan Wishlist'"
                >
                  <Heart
                    class="w-5 h-5"
                    :class="
                      wishlistStore.isInWishlist(product.id)
                        ? 'fill-red-600'
                        : ''
                    "
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useProductStore } from "../../store/productStore";
import { useWishlistStore } from "../../store/wishlistStore";
import BaseBadge from "../common/BaseBadge.vue";
import { X, ShoppingBag, Heart, ExternalLink } from "lucide-vue-next";

const productStore = useProductStore();
const wishlistStore = useWishlistStore();

const product = computed(() => productStore.quickViewProduct!);
const quantity = ref(1);
const selectedColor = ref("");
const selectedSize = ref("");
const activeImageIndex = ref(0);

const productImages = computed(() => {
  if (!product.value) return [];
  if (product.value.images && product.value.images.length > 0) {
    return product.value.images.slice(0, 4);
  }
  if (product.value.secondaryImages && product.value.secondaryImages.length > 0) {
    return [product.value.imageUrl, ...product.value.secondaryImages].slice(0, 4);
  }
  return [
    product.value.imageUrl,
    product.value.imageUrl,
    product.value.imageUrl,
    product.value.imageUrl,
  ];
});

const currentMainImage = computed(() => {
  if (productImages.value.length > 0 && productImages.value[activeImageIndex.value]) {
    return productImages.value[activeImageIndex.value];
  }
  return product.value?.imageUrl || '';
});

watch(product, (newVal) => {
  if (newVal) {
    quantity.value = 1;
    activeImageIndex.value = 0;
    selectedColor.value =
      newVal.colors && newVal.colors[0] ? newVal.colors[0].name : "";
    selectedSize.value = newVal.sizes && newVal.sizes[0] ? newVal.sizes[0] : "";
  }
});

function formatRupiah(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
}
</script>
