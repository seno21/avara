<template>
  <div class="min-h-screen flex flex-col bg-[#F6F4EE] text-[#1A1A1A] font-sans antialiased selection:bg-[#AD9277] selection:text-white">
    <!-- Navbar -->
    <Navbar />

    <!-- Main View Content -->
    <div class="flex-1">
      <router-view />
    </div>

    <!-- Footer -->
    <Footer />

    <!-- Cart Drawer Modal -->
    <CartDrawer />

    <!-- Quick View Product Modal -->
    <QuickViewModal />

    <!-- Toast Notifications Container -->
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import CartDrawer from './components/layout/CartDrawer.vue';
import QuickViewModal from './components/layout/QuickViewModal.vue';
import ToastContainer from './components/common/ToastContainer.vue';
</script>
