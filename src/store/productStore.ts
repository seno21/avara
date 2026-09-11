import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '../types/Product';
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { useWishlistStore } from './wishlistStore';

export const initialMockProducts: Product[] = [
  {
    id: 'avara-001',
    name: 'Avara Signature Tote Bag',
    tagline: 'Tas Kulit Cognac Premium Handcrafted',
    description: 'Tas tote kulit asli berkualitas tinggi buatan pengrajin berpengalaman. Didesain dengan kompartemen luas, hardware kuningan berlapis emas bronze, dan strap yang nyaman untuk pemakaian sehari-hari.',
    price: 2450000,
    originalPrice: 2850000,
    imageUrl: '/images/product_tote.jpg',
    images: [
      '/images/product_tote.jpg',
      '/images/tote_angle2.jpg',
      '/images/tote_angle3.jpg',
      '/images/tote_angle4.jpg'
    ],
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
    dimensions: '38 x 28 x 14 cm',
    shopeeUrl: 'https://shopee.co.id/avarastudio'
  },
  {
    id: 'avara-002',
    name: 'Chronograph Bronze Watch',
    tagline: 'Jam Tangan Minimalis Dial Cokelat Klasik',
    description: 'Jam tangan edisi terbatas dengan casing bronze stainless steel dan strap kulit alligator cokelat tua. Mesin jam presisi Jepang dengan ketahanan air hingga 50 meter.',
    price: 3890000,
    originalPrice: 4200000,
    imageUrl: '/images/product_watch.jpg',
    images: [
      '/images/product_watch.jpg',
      '/images/tote_angle3.jpg',
      '/images/product_tote.jpg',
      '/images/tote_angle2.jpg'
    ],
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
    dimensions: 'Diameter Casing 40mm',
    shopeeUrl: 'https://shopee.co.id/avarastudio'
  },
  {
    id: 'avara-003',
    name: 'Aethelred Amber Woods Parfum',
    tagline: 'Niche Eau de Parfum 50ml',
    description: 'Aroma hangat kombinasi amber wood, cedarwood, lavender, dan rempah manis. Formulasi konsentrat tinggi yang tahan lama hingga 14 jam dengan impresi kemewahan yang tenang.',
    price: 1250000,
    imageUrl: '/images/product_perfume.jpg',
    images: [
      '/images/product_perfume.jpg',
      '/images/tote_angle4.jpg',
      '/images/product_watch.jpg',
      '/images/tote_angle3.jpg'
    ],
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
    dimensions: '50ml / 1.7 fl oz',
    shopeeUrl: 'https://shopee.co.id/avarastudio'
  },
  {
    id: 'avara-004',
    name: 'Artisanal Suede Loafers',
    tagline: 'Sepatu Suede Espresso Stitch Handstitched',
    description: 'Sepatu loafer suede cokelat espresso dengan buckle emas antik. Dibuat dengan sol kulit yang empuk dan konstruksi Blake-stitched untuk kenyamanan melangkah seharian.',
    price: 1980000,
    originalPrice: 2200000,
    imageUrl: '/images/product_loafers.jpg',
    images: [
      '/images/product_loafers.jpg',
      '/images/hero_fashion.jpg',
      '/images/tote_angle2.jpg',
      '/images/product_tote.jpg'
    ],
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
    dimensions: 'Standar Ukuran Eropa',
    shopeeUrl: 'https://shopee.co.id/avarastudio'
  },
  {
    id: 'avara-005',
    name: 'Camel Cashmere Belted Trench',
    tagline: 'Mantel Wool Cashmere Warna Cokelat Camel',
    description: 'Mantel ikonis potongan tailored dengan bahan 90% virgin wool & 10% cashmere. Memberikan kehangatan elegan dengan sabuk pinggang berlapis hardware emas bronze.',
    price: 4650000,
    imageUrl: '/images/hero_fashion.jpg',
    images: [
      '/images/hero_fashion.jpg',
      '/images/tote_angle4.jpg',
      '/images/product_loafers.jpg',
      '/images/product_tote.jpg'
    ],
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
    dimensions: 'Regular Luxury Fit',
    shopeeUrl: 'https://shopee.co.id/avarastudio'
  },
  {
    id: 'avara-006',
    name: 'Bronze Heritage Bi-Fold Wallet',
    tagline: 'Dompet Kulit Cokelat Slim Edition',
    description: 'Dompet pria & wanita ramping dengan 6 slot kartu dan kompartemen uang tunai berlapis kain jacquard logo Avara Studio.',
    price: 890000,
    originalPrice: 990000,
    imageUrl: '/images/product_wallet.jpg',
    images: [
      '/images/product_wallet.jpg',
      '/images/wallet_angle2.jpg',
      '/images/tote_angle3.jpg',
      '/images/product_tote.jpg'
    ],
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
    dimensions: '11 x 9 cm',
    shopeeUrl: 'https://shopee.co.id/avarastudio'
  }
];

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>(initialMockProducts);
  const searchQuery = ref('');
  const selectedCategory = ref<string>('all');
  const selectedSort = ref<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const quickViewProduct = ref<Product | null>(null);
  const isSyncing = ref(false);

  // Synchronize with Firebase Firestore
  function initFirestoreListener() {
    try {
      const colRef = collection(db, 'products');
      onSnapshot(colRef, (snapshot) => {
        if (!snapshot.empty) {
          const list: Product[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as Product);
          });
          products.value = list;
        }
      }, (err) => {
        console.warn('Firestore snapshot listener info:', err.message);
      });
    } catch (e) {
      console.warn('Firebase error initializing product listener:', e);
    }
  }

  // Seed sample products into Firebase Firestore
  async function seedInitialData() {
    isSyncing.value = true;
    try {
      const batch = writeBatch(db);
      for (const prod of initialMockProducts) {
        const docRef = doc(db, 'products', prod.id);
        batch.set(docRef, prod);
      }
      await batch.commit();
    } catch (e) {
      console.error('Failed to seed products into Firestore:', e);
      throw e;
    } finally {
      isSyncing.value = false;
    }
  }

  // Add a new product to Firestore
  async function saveProduct(productData: Partial<Product>) {
    isSyncing.value = true;
    try {
      const id = productData.id || `avara-${Date.now()}`;
      const categoryLabelMap: Record<string, string> = {
        leather: 'Leather Goods',
        wear: 'Busana & Sepatu',
        accessories: 'Aksesoris & Jam',
        fragrance: 'Parfum & Wewangian',
        home: 'Home & Living'
      };

      const fullProduct: Product = {
        id,
        name: productData.name || 'Produk Baru',
        tagline: productData.tagline || '',
        description: productData.description || '',
        price: Number(productData.price) || 0,
        originalPrice: productData.originalPrice ? Number(productData.originalPrice) : undefined,
        imageUrl: productData.imageUrl || '/images/product_tote.jpg',
        images: productData.images || [productData.imageUrl || '/images/product_tote.jpg'],
        inStock: productData.inStock !== false,
        stockCount: Number(productData.stockCount) || 10,
        category: (productData.category as any) || 'leather',
        categoryLabel: categoryLabelMap[productData.category || 'leather'] || 'Koleksi Studio',
        rating: productData.rating || 5.0,
        reviewsCount: productData.reviewsCount || 1,
        isNewArrival: !!productData.isNewArrival,
        isBestSeller: !!productData.isBestSeller,
        colors: productData.colors || [],
        sizes: productData.sizes || [],
        material: productData.material || '',
        dimensions: productData.dimensions || '',
        shopeeUrl: productData.shopeeUrl || 'https://shopee.co.id/avarastudio'
      };

      // Update local state first for instant UI response
      const existingIdx = products.value.findIndex(p => p.id === id);
      if (existingIdx >= 0) {
        products.value[existingIdx] = fullProduct;
      } else {
        products.value.unshift(fullProduct);
      }

      // Save to Firestore
      const docRef = doc(db, 'products', id);
      await setDoc(docRef, fullProduct, { merge: true });
    } catch (e) {
      console.error('Error saving product:', e);
      throw e;
    } finally {
      isSyncing.value = false;
    }
  }

  // Delete product from Firestore
  async function deleteProduct(id: string) {
    isSyncing.value = true;
    try {
      products.value = products.value.filter(p => p.id !== id);
      const docRef = doc(db, 'products', id);
      await deleteDoc(docRef);
    } catch (e) {
      console.error('Error deleting product:', e);
      throw e;
    } finally {
      isSyncing.value = false;
    }
  }

  const filteredProducts = computed(() => {
    // Lazy import or call useWishlistStore inside computed to avoid circular dependency
    const wishlistStore = useWishlistStore();
    return products.value.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            product.categoryLabel.toLowerCase().includes(searchQuery.value.toLowerCase());
      
      let matchesCategory = false;
      if (selectedCategory.value === 'all') {
        matchesCategory = true;
      } else if (selectedCategory.value === 'wishlist') {
        matchesCategory = wishlistStore.isInWishlist(product.id);
      } else {
        matchesCategory = product.category === selectedCategory.value;
      }

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (selectedSort.value === 'price-low') return a.price - b.price;
      if (selectedSort.value === 'price-high') return b.price - a.price;
      if (selectedSort.value === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  });

  const categories = computed(() => {
    const wishlistStore = useWishlistStore();
    return [
      { id: 'all', name: 'Semua Koleksi', count: products.value.length },
      { id: 'wishlist', name: '❤️ Favorit Saya', count: wishlistStore.wishlistCount },
      { id: 'leather', name: 'Leather Goods', count: products.value.filter(p => p.category === 'leather').length },
      { id: 'wear', name: 'Busana & Sepatu', count: products.value.filter(p => p.category === 'wear').length },
      { id: 'accessories', name: 'Aksesoris & Jam', count: products.value.filter(p => p.category === 'accessories').length },
      { id: 'fragrance', name: 'Parfum & Wewangian', count: products.value.filter(p => p.category === 'fragrance').length }
    ];
  });

  function openQuickView(product: Product) {
    quickViewProduct.value = product;
  }

  function closeQuickView() {
    quickViewProduct.value = null;
  }

  // Initialize Firebase Firestore listener
  initFirestoreListener();

  return {
    products,
    searchQuery,
    selectedCategory,
    selectedSort,
    quickViewProduct,
    isSyncing,
    filteredProducts,
    categories,
    openQuickView,
    closeQuickView,
    saveProduct,
    deleteProduct,
    seedInitialData
  };
});
