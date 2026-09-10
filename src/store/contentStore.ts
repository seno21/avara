import { defineStore } from 'pinia';
import { ref } from 'vue';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export interface SiteContent {
  announcementText: string;
  showAnnouncement: boolean;
  shopeeStoreUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadgeText: string;
}

export const useContentStore = defineStore('content', () => {
  const content = ref<SiteContent>({
    announcementText: 'Gunakan voucher SHOPEE untuk potongan harga spesial | Gratis Ongkir Indonesia',
    showAnnouncement: false,
    shopeeStoreUrl: 'https://shopee.co.id/avarastudio',
    heroHeadline: 'Sentuhan Kemewahan Minimalis Dalam Setiap Detail',
    heroSubheadline: 'Koleksi eksklusif produk kulit handcrafted, busana terkurasi, dan wewangian premium yang dirancang untuk daya tahan serta keanggunan sepanjang masa.',
    heroBadgeText: 'Koleksi Eksklusif 2026'
  });

  const isLoading = ref(false);

  function initContentListener() {
    try {
      const docRef = doc(db, 'settings', 'siteContent');
      onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          content.value = { ...content.value, ...(snapshot.data() as SiteContent) };
        }
      }, (err) => {
        console.warn('Firestore content listener note:', err.message);
      });
    } catch (e) {
      console.warn('Firebase error initializing content listener:', e);
    }
  }

  async function updateContent(newContent: Partial<SiteContent>) {
    isLoading.value = true;
    try {
      content.value = { ...content.value, ...newContent };
      const docRef = doc(db, 'settings', 'siteContent');
      await setDoc(docRef, content.value, { merge: true });
    } catch (e) {
      console.error('Failed to update content in Firebase:', e);
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  // Initialize listener automatically
  initContentListener();

  return {
    content,
    isLoading,
    updateContent
  };
});
