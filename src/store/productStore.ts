import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '../types/Product';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([
    {
      id: 'avara-001',
      name: 'Avara Signature Tote Bag',
      tagline: 'Tas Kulit Cognac Premium Handcrafted',
      description: 'Tas tote kulit asli berkualitas tinggi buatan pengrajin berpengalaman. Didesain dengan kompartemen luas, hardware kuningan berlapis emas bronze, dan strap yang nyaman untuk pemakaian sehari-hari.',
      price: 2450000,
      originalPrice: 2850000,
      imageUrl: '/images/product_tote.jpg',
      inStock: true,
      stockCount: 8,
      category: 'leather',
      categoryLabel: 'Leather Goods',
      rating: 4.9,
      reviewsCount: 34,
      isNewArrival: true,
      isBestSeller: true,
      colors: [
        { name: 'Cognac Brown', hex: '#AD9277' },
        { name: 'Espresso Black', hex: '#1A1A1A' },
        { name: 'Warm Taupe', hex: '#C2B6A7' }
      ],
      material: '100% Genuine Full-Grain Italian Leather',
      dimensions: '38 x 28 x 14 cm'
    },
    {
      id: 'avara-002',
      name: 'Chronograph Bronze Watch',
      tagline: 'Jam Tangan Minimalis Dial Cokelat Klasik',
      description: 'Jam tangan edisi terbatas dengan casing bronze stainless steel dan strap kulit alligator cokelat tua. Mesin jam presisi Jepang dengan ketahanan air hingga 50 meter.',
      price: 3890000,
      originalPrice: 4200000,
      imageUrl: '/images/product_watch.jpg',
      inStock: true,
      stockCount: 4,
      category: 'accessories',
      categoryLabel: 'Aksesoris & Jam',
      rating: 5.0,
      reviewsCount: 19,
      isNewArrival: true,
      isBestSeller: true,
      colors: [
        { name: 'Bronze & Brown', hex: '#AD9277' },
        { name: 'Silver & Black', hex: '#4A4A4A' }
      ],
      material: 'Bronze Alloy & Genuine Leather Strap',
      dimensions: 'Diameter Casing 40mm'
    },
    {
      id: 'avara-003',
      name: 'Aethelred Amber Woods Parfum',
      tagline: 'Niche Eau de Parfum 50ml',
      description: 'Aroma hangat kombinasi amber wood, cedarwood, lavender, dan rempah manis. Formulasi konsentrat tinggi yang tahan lama hingga 14 jam dengan impresi kemewahan yang tenang.',
      price: 1250000,
      imageUrl: '/images/product_perfume.jpg',
      inStock: true,
      stockCount: 15,
      category: 'fragrance',
      categoryLabel: 'Parfum & Wewangian',
      rating: 4.8,
      reviewsCount: 42,
      isNewArrival: false,
      isBestSeller: true,
      colors: [
        { name: 'Amber Gold', hex: '#AD9277' }
      ],
      material: 'Organic Essences & Natural Botanical Oil',
      dimensions: '50ml / 1.7 fl oz'
    },
    {
      id: 'avara-004',
      name: 'Artisanal Suede Loafers',
      tagline: 'Sepatu Suede Espresso Stitch Handstitched',
      description: 'Sepatu loafer suede cokelat espresso dengan buckle emas antik. Dibuat dengan sol kulit yang empuk dan konstruksi Blake-stitched untuk kenyamanan melangkah seharian.',
      price: 1980000,
      originalPrice: 2200000,
      imageUrl: '/images/product_loafers.jpg',
      inStock: true,
      stockCount: 6,
      category: 'wear',
      categoryLabel: 'Busana & Sepatu',
      rating: 4.9,
      reviewsCount: 27,
      isNewArrival: true,
      isBestSeller: false,
      colors: [
        { name: 'Espresso Brown', hex: '#3D2B1F' },
        { name: 'Rich Tan', hex: '#AD9277' }
      ],
      sizes: ['39', '40', '41', '42', '43', '44'],
      material: 'Calfskin Suede & Gold Hardware',
      dimensions: 'Standar Ukuran Eropa'
    },
    {
      id: 'avara-005',
      name: 'Camel Cashmere Belted Trench',
      tagline: 'Mantel Wool Cashmere Warna Cokelat Camel',
      description: 'Mantel ikonis potongan tailored dengan bahan 90% virgin wool & 10% cashmere. Memberikan kehangatan elegan dengan sabuk pinggang berlapis hardware emas bronze.',
      price: 4650000,
      imageUrl: '/images/hero_fashion.jpg',
      inStock: true,
      stockCount: 3,
      category: 'wear',
      categoryLabel: 'Busana & Sepatu',
      rating: 5.0,
      reviewsCount: 15,
      isNewArrival: true,
      isBestSeller: true,
      colors: [
        { name: 'Camel Brown', hex: '#B8860B' },
        { name: 'Cream Warm', hex: '#F6F4EE' }
      ],
      sizes: ['S', 'M', 'L'],
      material: '90% Virgin Wool, 10% Cashmere',
      dimensions: 'Regular Luxury Fit'
    },
    {
      id: 'avara-006',
      name: 'Bronze Heritage Bi-Fold Wallet',
      tagline: 'Dompet Kulit Cokelat Slim Edition',
      description: 'Dompet pria & wanita ramping dengan 6 slot kartu dan kompartemen uang tunai berlapis kain jacquard logo Avara Studio.',
      price: 890000,
      originalPrice: 990000,
      imageUrl: '/images/product_tote.jpg',
      inStock: true,
      stockCount: 20,
      category: 'leather',
      categoryLabel: 'Leather Goods',
      rating: 4.7,
      reviewsCount: 51,
      isNewArrival: false,
      isBestSeller: false,
      colors: [
        { name: 'Chestnut Brown', hex: '#5C3A21' },
        { name: 'Bronze Sand', hex: '#AD9277' }
      ],
      material: 'Full-Grain Calfskin Leather',
      dimensions: '11 x 9 cm'
    }
  ]);

  const searchQuery = ref('');
  const selectedCategory = ref<string>('all');
  const selectedSort = ref<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const quickViewProduct = ref<Product | null>(null);

  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            product.categoryLabel.toLowerCase().includes(searchQuery.value.toLowerCase());
      
      const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (selectedSort.value === 'price-low') return a.price - b.price;
      if (selectedSort.value === 'price-high') return b.price - a.price;
      if (selectedSort.value === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  });

  const categories = [
    { id: 'all', name: 'Semua Koleksi', count: 6 },
    { id: 'leather', name: 'Leather Goods', count: 2 },
    { id: 'wear', name: 'Busana & Sepatu', count: 2 },
    { id: 'accessories', name: 'Aksesoris & Jam', count: 1 },
    { id: 'fragrance', name: 'Parfum & Wewangian', count: 1 }
  ];

  function openQuickView(product: Product) {
    quickViewProduct.value = product;
  }

  function closeQuickView() {
    quickViewProduct.value = null;
  }

  return {
    products,
    searchQuery,
    selectedCategory,
    selectedSort,
    quickViewProduct,
    filteredProducts,
    categories,
    openQuickView,
    closeQuickView
  };
});
