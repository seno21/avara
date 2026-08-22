<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="productStore.quickViewProduct"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      >
        <div
          @click.stop
          class="bg-[#F6F4EE] max-w-3xl w-full border border-[#E3D9CE] shadow-2xl relative animate-fade-in my-8 overflow-hidden rounded-3xl"
        >
          <!-- Close Button -->
          <button
            @click="productStore.closeQuickView()"
            class="absolute top-4 right-4 z-10 bg-white/90 p-2.5 text-[#1A1A1A] hover:text-[#AD9277] transition-colors rounded-full shadow-md hover:scale-105"
          >
            <X class="w-5 h-5" />
          </button>

          <div class="grid grid-cols-1 md:grid-cols-2">
            <!-- Product Image -->
            <div
              class="bg-white p-6 flex items-center justify-center border-r border-[#E3D9CE]"
            >
              <img
                :src="product.imageUrl"
                :alt="product.name"
                class="w-full h-80 md:h-96 object-cover shadow-sm rounded-2xl"
              />
            </div>

            <!-- Product Info -->
            <div class="p-6 md:p-8 flex flex-col justify-between font-sans">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <BaseBadge variant="bronze">{{
                    product.categoryLabel
                  }}</BaseBadge>
                </div>

                <h2 class="font-serif text-2xl font-bold text-[#1A1A1A] mb-1">
                  {{ product.name }}
                </h2>
                <p class="text-xs text-[#6B6B6B] italic mb-3">
                  {{ product.tagline }}
                </p>

                <!-- Price -->
                <div class="flex items-baseline gap-3 mb-4">
                  <span class="font-serif font-bold text-2xl text-[#3D2B1F]">
                    {{ formatRupiah(product.price) }}
                  </span>
                  <span
                    v-if="product.originalPrice"
                    class="text-sm text-[#6B6B6B] line-through"
                  >
                    {{ formatRupiah(product.originalPrice) }}
                  </span>
                </div>

                <p class="text-xs text-[#6B6B6B] leading-relaxed mb-4">
                  {{ product.description }}
                </p>

                <!-- Color Options -->
                <div
                  v-if="product.colors && product.colors.length > 0"
                  class="mb-4"
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
                      class="w-7 h-7 rounded-full border-2 transition-all p-0.5"
                      :class="
                        selectedColor === color.name
                          ? 'border-[#AD9277] scale-110'
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
                  class="mb-4"
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
                      class="px-4 py-1.5 text-xs rounded-full border transition-all"
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

              <!-- Quantity and Action Buttons -->
              <div class="pt-4 border-t border-[#E3D9CE] space-y-3">
                <div class="flex items-center gap-4">
                  <BaseButton
                    variant="primary"
                    class="flex-1"
                    @click="handleAddToCart"
                  >
                    <ShoppingBag class="w-4 h-4" />
                    Order di Shopee
                  </BaseButton>

                  <button
                    @click="wishlistStore.toggleWishlist(product)"
                    class="p-2.5 border border-[#E3D9CE] bg-white rounded-full hover:border-[#AD9277] transition-colors"
                    :class="
                      wishlistStore.isInWishlist(product.id)
                        ? 'text-red-600 border-red-200'
                        : 'text-[#1A1A1A]'
                    "
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
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useProductStore } from "../../store/productStore";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import BaseButton from "../common/BaseButton.vue";
import BaseBadge from "../common/BaseBadge.vue";
import { X, Star, ShoppingBag, Heart } from "lucide-vue-next";

const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const product = computed(() => productStore.quickViewProduct!);
const quantity = ref(1);
const selectedColor = ref("");
const selectedSize = ref("");

watch(product, (newVal) => {
  if (newVal) {
    quantity.value = 1;
    selectedColor.value =
      newVal.colors && newVal.colors[0] ? newVal.colors[0].name : "";
    selectedSize.value = newVal.sizes && newVal.sizes[0] ? newVal.sizes[0] : "";
  }
});

function handleAddToCart() {
  if (product.value) {
    cartStore.addToCart(
      product.value,
      quantity.value,
      selectedColor.value,
      selectedSize.value,
    );
    productStore.closeQuickView();
  }
}

function formatRupiah(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
}
</script>
