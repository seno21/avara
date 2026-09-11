export interface Province {
  id: string;
  name: string;
}

export interface Regency {
  id: string;
  province_id: string;
  name: string;
}

export interface District {
  id: string;
  regency_id: string;
  name: string;
}

export interface Village {
  id: string;
  district_id: string;
  name: string;
}

// Open API for Indonesian Administrative Divisions
const BASE_URL = 'https://www.emsifa.com/api-wilayah-indonesia/api';

// Fallback Data in case network API is unreachable
const FALLBACK_PROVINCES: Province[] = [
  { id: '31', name: 'DKI JAKARTA' },
  { id: '32', name: 'JAWA BARAT' },
  { id: '33', name: 'JAWA TENGAH' },
  { id: '34', name: 'DI YOGYAKARTA' },
  { id: '35', name: 'JAWA TIMUR' },
  { id: '36', name: 'BANTEN' },
  { id: '51', name: 'BALI' },
  { id: '12', name: 'SUMATERA UTARA' },
  { id: '13', name: 'SUMATERA BARAT' },
  { id: '73', name: 'SULAWESI SELATAN' }
];

const FALLBACK_REGENCIES: Record<string, Regency[]> = {
  '31': [
    { id: '3171', province_id: '31', name: 'KOTA JAKARTA SELATAN' },
    { id: '3172', province_id: '31', name: 'KOTA JAKARTA TIMUR' },
    { id: '3173', province_id: '31', name: 'KOTA JAKARTA PUSAT' },
    { id: '3174', province_id: '31', name: 'KOTA JAKARTA BARAT' },
    { id: '3175', province_id: '31', name: 'KOTA JAKARTA UTARA' }
  ],
  '32': [
    { id: '3273', province_id: '32', name: 'KOTA BANDUNG' },
    { id: '3275', province_id: '32', name: 'KOTA BEKASI' },
    { id: '3276', province_id: '32', name: 'KOTA DEPOK' },
    { id: '3204', province_id: '32', name: 'KABUPATEN BANDUNG' },
    { id: '3201', province_id: '32', name: 'KABUPATEN BOGOR' }
  ],
  '35': [
    { id: '3578', province_id: '35', name: 'KOTA SURABAYA' },
    { id: '3579', province_id: '35', name: 'KOTA BATU' },
    { id: '3573', province_id: '35', name: 'KOTA MALANG' },
    { id: '3515', province_id: '35', name: 'KABUPATEN SIDOARJO' }
  ]
};

const FALLBACK_DISTRICTS: Record<string, District[]> = {
  '3171': [
    { id: '3171010', regency_id: '3171', name: 'KEBAYORAN BARU' },
    { id: '3171020', regency_id: '3171', name: 'KEBAYORAN LAMA' },
    { id: '3171030', regency_id: '3171', name: 'CILANDAK' },
    { id: '3171040', regency_id: '3171', name: 'PASAR MINGGU' }
  ],
  '3273': [
    { id: '3273010', regency_id: '3273', name: 'COBLONG' },
    { id: '3273020', regency_id: '3273', name: 'SUMUR BANDUNG' },
    { id: '3273030', regency_id: '3273', name: 'BANDUNG WETAN' }
  ]
};

export async function fetchProvinces(): Promise<Province[]> {
  try {
    const response = await fetch(`${BASE_URL}/provinces.json`);
    if (!response.ok) throw new Error('Network error fetching provinces');
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Using fallback provinces data:', error);
    return FALLBACK_PROVINCES;
  }
}

export async function fetchRegencies(provinceId: string): Promise<Regency[]> {
  if (!provinceId) return [];
  try {
    const response = await fetch(`${BASE_URL}/regencies/${provinceId}.json`);
    if (!response.ok) throw new Error('Network error fetching regencies');
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`Using fallback regencies data for province ${provinceId}:`, error);
    return FALLBACK_REGENCIES[provinceId] || [
      { id: `${provinceId}01`, province_id: provinceId, name: 'KOTA / KABUPATEN UTAMA' },
      { id: `${provinceId}02`, province_id: provinceId, name: 'KABUPATEN WILAYAH II' }
    ];
  }
}

export async function fetchDistricts(regencyId: string): Promise<District[]> {
  if (!regencyId) return [];
  try {
    const response = await fetch(`${BASE_URL}/districts/${regencyId}.json`);
    if (!response.ok) throw new Error('Network error fetching districts');
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`Using fallback districts data for regency ${regencyId}:`, error);
    return FALLBACK_DISTRICTS[regencyId] || [
      { id: `${regencyId}010`, regency_id: regencyId, name: 'KECAMATAN PUSAT' },
      { id: `${regencyId}020`, regency_id: regencyId, name: 'KECAMATAN UTARA' }
    ];
  }
}
