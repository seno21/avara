<template>
  <main>
    <HeroBanner />
    <CategoryGrid />
    <FeaturedProducts />
    <BrandStory />
    <Testimonials />
  </main>
</template>

<script setup lang="ts">
import HeroBanner from '../components/home/HeroBanner.vue';
import CategoryGrid from '../components/home/CategoryGrid.vue';
import FeaturedProducts from '../components/home/FeaturedProducts.vue';
import BrandStory from '../components/home/BrandStory.vue';
import Testimonials from '../components/home/Testimonials.vue';
</script>
