<template>
  <div class="bg-[#F6F4EE] min-h-[85vh] py-8 sm:py-12 px-3 sm:px-6 flex items-center justify-center font-sans border-b border-[#E3D9CE]">
    <div class="max-w-2xl w-full">
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
          <h1 class="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">Pendaftaran Akun Baru</h1>
          <p class="text-xs text-[#6B6B6B]">
            Lengkapi data diri dan alamat Anda agar seluruh daftar barang favorit tersimpan permanen.
          </p>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Row 1: Nama Lengkap & No. WhatsApp -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Nama Lengkap *
              </label>
              <div class="relative">
                <input
                  v-model="regForm.fullName"
                  type="text"
                  required
                  placeholder="Contoh: Hendro Wijaya"
                  class="w-full pl-9 sm:pl-10 pr-3 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277] font-medium"
                />
                <User class="w-4 h-4 text-[#AD9277] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                No. WhatsApp *
              </label>
              <div class="relative">
                <input
                  v-model="regForm.phone"
                  type="tel"
                  required
                  placeholder="081234567890"
                  class="w-full pl-9 sm:pl-10 pr-3 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277] font-medium"
                />
                <Phone class="w-4 h-4 text-[#AD9277] absolute left-3 top-3" />
              </div>
            </div>
          </div>

          <!-- Row 2: Email & Password -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Alamat Email *
              </label>
              <div class="relative">
                <input
                  v-model="regForm.email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  class="w-full pl-9 sm:pl-10 pr-3 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277] font-medium"
                />
                <Mail class="w-4 h-4 text-[#AD9277] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Password *
              </label>
              <div class="relative">
                <input
                  v-model="regForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="Min. 6 karakter"
                  class="w-full pl-9 sm:pl-10 pr-9 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277] font-medium"
                />
                <Lock class="w-4 h-4 text-[#AD9277] absolute left-3 top-3" />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-3 text-[#6B6B6B] hover:text-[#1A1A1A]"
                >
                  <Eye v-if="!showPassword" class="w-4 h-4" />
                  <EyeOff v-else class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Alamat Rumah Section -->
          <div class="border-t border-[#E3D9CE] pt-4 mt-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-[#AD9277] mb-3 flex items-center gap-1.5">
              <MapPin class="w-4 h-4" />
              <span>Alamat Rumah (Otomatis Wilayah Indonesia)</span>
            </h3>

            <div class="space-y-3.5">
              <!-- Grid Provinsi & Kota/Kabupaten -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <!-- Select Provinsi -->
                <div>
                  <label class="block text-[11px] font-semibold text-[#6B6B6B] mb-1">Pilih Provinsi *</label>
                  <select
                    v-model="selectedProvinceId"
                    @change="onProvinceChange"
                    required
                    class="w-full px-3 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
                  >
                    <option value="" disabled>-- Pilih Provinsi --</option>
                    <option v-for="prov in provinces" :key="prov.id" :value="prov.id">
                      {{ prov.name }}
                    </option>
                  </select>
                </div>

                <!-- Select Kota / Kabupaten -->
                <div>
                  <label class="block text-[11px] font-semibold text-[#6B6B6B] mb-1">Pilih Kota / Kabupaten *</label>
                  <select
                    v-model="selectedRegencyId"
                    @change="onRegencyChange"
                    :disabled="!selectedProvinceId || loadingRegencies"
                    required
                    class="w-full px-3 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277] disabled:opacity-50 cursor-pointer"
                  >
                    <option value="" disabled>
                      {{ loadingRegencies ? 'Memuat Kota/Kabupaten...' : '-- Pilih Kota / Kabupaten --' }}
                    </option>
                    <option v-for="reg in regencies" :key="reg.id" :value="reg.id">
                      {{ reg.name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Grid Kecamatan & Detail Jalan -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <!-- Select Kecamatan / Desa -->
                <div>
                  <label class="block text-[11px] font-semibold text-[#6B6B6B] mb-1">Pilih Kecamatan / Desa *</label>
                  <select
                    v-model="selectedDistrictId"
                    :disabled="!selectedRegencyId || loadingDistricts"
                    required
                    class="w-full px-3 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277] disabled:opacity-50 cursor-pointer"
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
                  <label class="block text-[11px] font-semibold text-[#6B6B6B] mb-1">Detail Jalan & No. Rumah</label>
                  <input
                    v-model="streetDetail"
                    type="text"
                    placeholder="Jl. Merdeka No. 45, RT 02/05"
                    class="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#E3D9CE] rounded-xl text-xs focus:outline-none focus:border-[#AD9277]"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3.5 bg-[#2A1D15] hover:bg-[#AD9277] text-[#F6F4EE] text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-6"
          >
            <UserPlus class="w-4 h-4" />
            <span>{{ isSubmitting ? 'Mendaftarkan Akun...' : 'Daftar Akun Sekarang' }}</span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="pt-4 border-t border-[#E3D9CE] text-center text-xs text-[#6B6B6B]">
          Sudah memiliki akun?
          <router-link
            to="/login"
            class="text-[#AD9277] font-bold underline hover:text-[#1A1A1A] ml-1 inline-flex items-center gap-1"
          >
            <span>Masuk di sini</span>
            <ArrowRight class="w-3 h-3" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';
import {
  fetchProvinces,
  fetchRegencies,
  fetchDistricts,
  type Province,
  type Regency,
  type District
} from '../services/indonesiaRegionService';
import { Mail, Lock, User, Phone, MapPin, UserPlus, Eye, EyeOff, ArrowRight } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();

const isSubmitting = ref(false);
const showPassword = ref(false);

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
    console.warn('Error loading provinces:', e);
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

async function handleRegister() {
  if (!regForm.fullName || !regForm.email || !regForm.phone || !selectedProvinceId.value || !selectedRegencyId.value || !selectedDistrictId.value) {
    toastStore.showToast('Data Belum Lengkap', 'Mohon lengkapi seluruh formulir pendaftaran.', 'error');
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
      // Redirect to Login Page after successful registration
      router.push('/login');
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>
