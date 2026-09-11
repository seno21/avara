<template>
  <Teleport to="body">
    <div
      v-if="authStore.isAuthModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
      @click.self="authStore.closeAuthModal"
    >
      <div
        class="bg-[#F6F4EE] border border-[#E3D9CE] rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden my-8 transform transition-all"
      >
        <!-- Modal Header -->
        <div class="bg-[#2A1D15] text-[#F6F4EE] px-6 py-5 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <UserCheck v-if="authStore.authModalTab === 'login'" class="w-6 h-6 text-[#AD9277]" />
            <UserPlus v-else class="w-6 h-6 text-[#AD9277]" />
            <div>
              <h3 class="font-serif text-lg font-bold tracking-wide">
                {{ authStore.authModalTab === 'login' ? 'Masuk ke Akun Avara' : 'Daftar Akun Baru' }}
              </h3>
              <p class="text-[11px] text-[#AD9277]">
                {{ authStore.authModalTab === 'login' ? 'Akses favorit dan profil Anda' : 'Simpan barang favorit Anda secara permanen' }}
              </p>
            </div>
          </div>
          <button
            @click="authStore.closeAuthModal"
            class="text-[#AD9277] hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Tab Selector -->
        <div class="flex border-b border-[#E3D9CE] bg-white font-sans text-xs font-bold uppercase tracking-wider">
          <button
            @click="authStore.authModalTab = 'login'"
            class="flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer"
            :class="authStore.authModalTab === 'login' ? 'border-[#AD9277] text-[#AD9277] bg-[#F6F4EE]/50' : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'"
          >
            Masuk
          </button>
          <button
            @click="authStore.authModalTab = 'register'"
            class="flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer"
            :class="authStore.authModalTab === 'register' ? 'border-[#AD9277] text-[#AD9277] bg-[#F6F4EE]/50' : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'"
          >
            Daftar Akun
          </button>
        </div>

        <div class="p-6">
          <!-- LOGIN FORM -->
          <form v-if="authStore.authModalTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Email</label>
              <div class="relative">
                <input
                  v-model="loginEmail"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  class="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
                />
                <Mail class="w-4 h-4 text-[#AD9277] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Password</label>
              <div class="relative">
                <input
                  v-model="loginPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  class="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
                />
                <Lock class="w-4 h-4 text-[#AD9277] absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3 bg-[#2A1D15] hover:bg-[#AD9277] text-[#F6F4EE] text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <LogIn class="w-4 h-4" />
              <span>{{ isSubmitting ? 'Memproses...' : 'Masuk Sekarang' }}</span>
            </button>

            <div class="text-center pt-2">
              <p class="text-xs text-[#6B6B6B]">
                Belum punya akun?
                <button
                  type="button"
                  @click="authStore.authModalTab = 'register'"
                  class="text-[#AD9277] font-bold underline hover:text-[#1A1A1A] cursor-pointer ml-1"
                >
                  Daftar di sini
                </button>
              </p>
            </div>
          </form>

          <!-- REGISTER FORM -->
          <form v-else @submit.prevent="handleRegister" class="space-y-3">
            <!-- Nama Lengkap -->
            <div>
              <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Nama Lengkap *</label>
              <div class="relative">
                <input
                  v-model="regForm.fullName"
                  type="text"
                  required
                  placeholder="Contoh: Hendro Wijaya"
                  class="w-full pl-10 pr-4 py-2 bg-white border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
                />
                <User class="w-4 h-4 text-[#AD9277] absolute left-3.5 top-2.5" />
              </div>
            </div>

            <!-- Email & Password Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Email *</label>
                <div class="relative">
                  <input
                    v-model="regForm.email"
                    type="email"
                    required
                    placeholder="nama@email.com"
                    class="w-full pl-10 pr-3 py-2 bg-white border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
                  />
                  <Mail class="w-4 h-4 text-[#AD9277] absolute left-3.5 top-2.5" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Password *</label>
                <div class="relative">
                  <input
                    v-model="regForm.password"
                    type="password"
                    required
                    placeholder="Min. 6 karakter"
                    class="w-full pl-10 pr-3 py-2 bg-white border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
                  />
                  <Lock class="w-4 h-4 text-[#AD9277] absolute left-3.5 top-2.5" />
                </div>
              </div>
            </div>

            <!-- WhatsApp Number -->
            <div>
              <label class="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">No. WhatsApp *</label>
              <div class="relative">
                <input
                  v-model="regForm.phone"
                  type="tel"
                  required
                  placeholder="081234567890"
                  class="w-full pl-10 pr-4 py-2 bg-white border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
                />
                <Phone class="w-4 h-4 text-[#AD9277] absolute left-3.5 top-2.5" />
              </div>
            </div>

            <!-- Alamat Rumah Section -->
            <div class="border-t border-[#E3D9CE] pt-3 mt-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-[#AD9277] mb-2 flex items-center gap-1.5">
                <MapPin class="w-3.5 h-3.5" />
                <span>Alamat Rumah (Otomatis Indonesia)</span>
              </h4>

              <div class="space-y-2.5">
                <!-- Select Provinsi -->
                <div>
                  <label class="block text-[11px] font-semibold text-[#6B6B6B] mb-0.5">Provinsi *</label>
                  <select
                    v-model="selectedProvinceId"
                    @change="onProvinceChange"
                    required
                    class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
                  >
                    <option value="" disabled>-- Pilih Provinsi --</option>
                    <option v-for="prov in provinces" :key="prov.id" :value="prov.id">
                      {{ prov.name }}
                    </option>
                  </select>
                </div>

                <!-- Select Kota / Kabupaten -->
                <div>
                  <label class="block text-[11px] font-semibold text-[#6B6B6B] mb-0.5">Kota / Kabupaten *</label>
                  <select
                    v-model="selectedRegencyId"
                    @change="onRegencyChange"
                    :disabled="!selectedProvinceId || loadingRegencies"
                    required
                    class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277] disabled:bg-stone-100"
                  >
                    <option value="" disabled>
                      {{ loadingRegencies ? 'Memuat Kota/Kabupaten...' : '-- Pilih Kota / Kabupaten --' }}
                    </option>
                    <option v-for="reg in regencies" :key="reg.id" :value="reg.id">
                      {{ reg.name }}
                    </option>
                  </select>
                </div>

                <!-- Select Kecamatan / Desa -->
                <div>
                  <label class="block text-[11px] font-semibold text-[#6B6B6B] mb-0.5">Kecamatan / Desa *</label>
                  <select
                    v-model="selectedDistrictId"
                    @change="onDistrictChange"
                    :disabled="!selectedRegencyId || loadingDistricts"
                    required
                    class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277] disabled:bg-stone-100"
                  >
                    <option value="" disabled>
                      {{ loadingDistricts ? 'Memuat Kecamatan...' : '-- Pilih Kecamatan / Desa --' }}
                    </option>
                    <option v-for="dist in districts" :key="dist.id" :value="dist.id">
                      {{ dist.name }}
                    </option>
                  </select>
                </div>

                <!-- Detail Jalan / No Rumah -->
                <div>
                  <label class="block text-[11px] font-semibold text-[#6B6B6B] mb-0.5">Detail Jalan, RT/RW, No. Rumah</label>
                  <input
                    v-model="streetDetail"
                    type="text"
                    placeholder="Jl. Merdeka No. 45, RT 02/05"
                    class="w-full px-3 py-2 bg-white border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3 bg-[#2A1D15] hover:bg-[#AD9277] text-[#F6F4EE] text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <UserPlus class="w-4 h-4" />
              <span>{{ isSubmitting ? 'Mendaftarkan...' : 'Daftar Akun Sekarang' }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';
import {
  fetchProvinces,
  fetchRegencies,
  fetchDistricts,
  type Province,
  type Regency,
  type District
} from '../../services/indonesiaRegionService';
import { X, Mail, Lock, User, Phone, MapPin, UserPlus, LogIn, UserCheck } from 'lucide-vue-next';

const authStore = useAuthStore();
const toastStore = useToastStore();

const isSubmitting = ref(false);

// Login state
const loginEmail = ref('');
const loginPassword = ref('');

// Registration form state
const regForm = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: ''
});

// Indonesia Regional Cascading State
const provinces = ref<Province[]>([]);
const regencies = ref<Regency[]>([]);
const districts = ref<District[]>([]);

const selectedProvinceId = ref('');
const selectedRegencyId = ref('');
const selectedDistrictId = ref('');
const streetDetail = ref('');

const loadingRegencies = ref(false);
const loadingDistricts = ref(false);

onMounted(async () => {
  try {
    provinces.value = await fetchProvinces();
  } catch (e) {
    console.warn('Error loading provinces on mounted:', e);
  }
});

async function onProvinceChange() {
  selectedRegencyId.value = '';
  selectedDistrictId.value = '';
  regencies.value = [];
  districts.value = [];

  if (selectedProvinceId.value) {
    loadingRegencies.value = true;
    try {
      regencies.value = await fetchRegencies(selectedProvinceId.value);
    } finally {
      loadingRegencies.value = false;
    }
  }
}

async function onRegencyChange() {
  selectedDistrictId.value = '';
  districts.value = [];

  if (selectedRegencyId.value) {
    loadingDistricts.value = true;
    try {
      districts.value = await fetchDistricts(selectedRegencyId.value);
    } finally {
      loadingDistricts.value = false;
    }
  }
}

function onDistrictChange() {}

async function handleLogin() {
  if (!loginEmail.value || !loginPassword.value) return;
  isSubmitting.value = true;
  try {
    await authStore.loginUser(loginEmail.value, loginPassword.value);
  } finally {
    isSubmitting.value = false;
  }
}

async function handleRegister() {
  if (!regForm.fullName || !regForm.email || !regForm.phone || !selectedProvinceId.value || !selectedRegencyId.value || !selectedDistrictId.value) {
    toastStore.showToast('Data Belum Lengkap', 'Mohon lengkapi seluruh formulir termasuk alamat wilayah.', 'error');
    return;
  }

  const provObj = provinces.value.find(p => p.id === selectedProvinceId.value);
  const regObj = regencies.value.find(r => r.id === selectedRegencyId.value);
  const distObj = districts.value.find(d => d.id === selectedDistrictId.value);

  isSubmitting.value = true;
  try {
    const success = await authStore.registerUser({
      fullName: regForm.fullName,
      email: regForm.email,
      phone: regForm.phone,
      password: regForm.password,
      address: {
        provinceId: selectedProvinceId.value,
        provinceName: provObj ? provObj.name : '',
        regencyId: selectedRegencyId.value,
        regencyName: regObj ? regObj.name : '',
        districtId: selectedDistrictId.value,
        districtName: distObj ? distObj.name : '',
        streetDetail: streetDetail.value
      }
    });

    if (success) {
      // Reset form
      regForm.fullName = '';
      regForm.email = '';
      regForm.phone = '';
      regForm.password = '';
      selectedProvinceId.value = '';
      selectedRegencyId.value = '';
      selectedDistrictId.value = '';
      streetDetail.value = '';
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>
