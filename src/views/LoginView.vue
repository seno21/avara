<template>
  <div class="bg-[#F6F4EE] min-h-[85vh] py-8 sm:py-12 px-3 sm:px-6 flex items-center justify-center font-sans border-b border-[#E3D9CE]">
    <div class="max-w-md w-full">
      <!-- Card Container -->
      <div class="bg-white border border-[#E3D9CE] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden p-5 sm:p-8 space-y-6">
        <!-- Header -->
        <div class="text-center space-y-1.5 sm:space-y-2">
          <router-link to="/" class="inline-flex items-center gap-2 group mb-1">
            <span class="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#AD9277] transition-colors">
              AVARA
            </span>
            <div class="w-2 h-2 rounded-full bg-[#AD9277]"></div>
          </router-link>
          <h1 class="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">Masuk ke Akun Anda</h1>
          <p class="text-xs text-[#6B6B6B]">
            Akses produk favorit yang telah Anda simpan dan profil belanja Anda.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
              Alamat Email *
            </label>
            <div class="relative">
              <input
                v-model="email"
                type="email"
                required
                placeholder="nama@email.com"
                class="w-full pl-9 sm:pl-10 pr-4 py-3 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277] font-medium"
              />
              <Mail class="w-4 h-4 text-[#AD9277] absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
              Password *
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full pl-9 sm:pl-10 pr-10 py-3 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277] font-medium"
              />
              <Lock class="w-4 h-4 text-[#AD9277] absolute left-3 top-3.5" />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-3.5 text-[#6B6B6B] hover:text-[#1A1A1A]"
              >
                <Eye v-if="!showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3.5 bg-[#2A1D15] hover:bg-[#AD9277] text-[#F6F4EE] text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            <LogIn class="w-4 h-4" />
            <span>{{ isSubmitting ? 'Memproses Login...' : 'Masuk Sekarang' }}</span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="pt-4 border-t border-[#E3D9CE] text-center text-xs text-[#6B6B6B]">
          Belum memiliki akun Avara Studio?
          <router-link
            to="/register"
            class="text-[#AD9277] font-bold underline hover:text-[#1A1A1A] ml-1 inline-flex items-center gap-1"
          >
            <span>Daftar Akun Baru</span>
            <ArrowRight class="w-3 h-3" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, LogIn, Eye, EyeOff, ArrowRight } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isSubmitting = ref(false);

async function handleLogin() {
  if (!email.value || !password.value) return;
  isSubmitting.value = true;
  try {
    const success = await authStore.loginUser(email.value, password.value);
    if (success) {
      router.push('/shop');
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>
