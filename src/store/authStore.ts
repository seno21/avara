import { defineStore } from 'pinia';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { UserProfile } from '../types/User';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useToastStore } from './toastStore';

const INACTIVITY_LIMIT_MS = 15 * 60 * 1000; // 15 minutes in milliseconds
const LOCAL_ADMIN_KEY = 'avara_admin_session';
const LOCAL_USER_KEY = 'avara_user_session';

export const useAuthStore = defineStore('auth', () => {
  const toastStore = useToastStore();

  // Admin State
  const isAdminLoggedIn = ref<boolean>(false);
  const lastAdminActivityTime = ref<number>(Date.now());
  let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

  // User State
  const currentUser = ref<UserProfile | null>(null);
  const isAuthModalOpen = ref<boolean>(false);
  const authModalTab = ref<'login' | 'register'>('login');

  // Load initial session state
  function initSession() {
    // Check saved admin session
    const savedAdmin = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (savedAdmin) {
      try {
        const parsed = JSON.parse(savedAdmin);
        if (parsed.loggedIn && parsed.lastActive) {
          const elapsed = Date.now() - parsed.lastActive;
          if (elapsed < INACTIVITY_LIMIT_MS) {
            isAdminLoggedIn.value = true;
            lastAdminActivityTime.value = parsed.lastActive;
            startInactivityMonitor();
          } else {
            localStorage.removeItem(LOCAL_ADMIN_KEY);
          }
        }
      } catch (e) {
        localStorage.removeItem(LOCAL_ADMIN_KEY);
      }
    }

    // Check saved user session
    const savedUser = localStorage.getItem(LOCAL_USER_KEY);
    if (savedUser) {
      try {
        currentUser.value = JSON.parse(savedUser);
      } catch (e) {
        localStorage.removeItem(LOCAL_USER_KEY);
      }
    }
  }

  // --- ADMIN AUTH & INACTIVITY SESSION TIMEOUT ---
  function resetAdminInactivityTimer() {
    if (!isAdminLoggedIn.value) return;

    lastAdminActivityTime.value = Date.now();
    localStorage.setItem(
      LOCAL_ADMIN_KEY,
      JSON.stringify({ loggedIn: true, lastActive: lastAdminActivityTime.value })
    );

    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    inactivityTimer = setTimeout(() => {
      adminLogoutAuto();
    }, INACTIVITY_LIMIT_MS);
  }

  function handleUserActivity() {
    if (isAdminLoggedIn.value) {
      resetAdminInactivityTimer();
    }
  }

  function startInactivityMonitor() {
    resetAdminInactivityTimer();
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);
      window.addEventListener('click', handleUserActivity);
      window.addEventListener('scroll', handleUserActivity);
      window.addEventListener('touchstart', handleUserActivity);
    }
  }

  function stopInactivityMonitor() {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
    }
  }

  function adminLogin(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '@Hendro2026') {
      isAdminLoggedIn.value = true;
      startInactivityMonitor();
      toastStore.showToast('Login Berhasil', 'Selamat datang di Dashboard Admin Studio.', 'success');
      return true;
    } else {
      toastStore.showToast('Login Gagal', 'Username atau password admin salah.', 'error');
      return false;
    }
  }

  function adminLogoutAuto() {
    isAdminLoggedIn.value = false;
    stopInactivityMonitor();
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    toastStore.showToast(
      'Sesi Admin Berakhir',
      'Sesi Anda telah ditutup otomatis karena tidak ada aktivitas selama 15 menit. Silakan login kembali.',
      'warning'
    );
  }

  function adminLogoutManual() {
    isAdminLoggedIn.value = false;
    stopInactivityMonitor();
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    toastStore.showToast('Logout Admin', 'Sesi admin telah ditutup.', 'info');
  }

  // --- USER AUTHENTICATION & REGISTRATION ---
  function openAuthModal(tab: 'login' | 'register' = 'login') {
    authModalTab.value = tab;
    isAuthModalOpen.value = true;
  }

  function closeAuthModal() {
    isAuthModalOpen.value = false;
  }

  async function registerUser(userData: Omit<UserProfile, 'id' | 'favorites' | 'createdAt'> & { password?: string }) {
    try {
      const emailClean = userData.email.trim().toLowerCase();
      const userId = `user_${Date.now()}`;

      // Check Firestore for duplicate email if possible
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', emailClean));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          toastStore.showToast('Pendaftaran Gagal', 'Email ini sudah terdaftar. Silakan login.', 'error');
          authModalTab.value = 'login';
          return false;
        }
      } catch (e) {
        console.warn('Firestore query duplicate check note:', e);
      }

      const newUser: UserProfile = {
        id: userId,
        fullName: userData.fullName.trim(),
        email: emailClean,
        phone: userData.phone.trim(),
        address: userData.address,
        favorites: [],
        createdAt: new Date().toISOString()
      };

      // Save registered user profile to Firestore
      try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, {
          ...newUser,
          password: userData.password || 'default123'
        });
      } catch (e) {
        console.warn('Firestore save user note:', e);
      }

      toastStore.showToast(
        'Pendaftaran Berhasil!',
        `Akun atas nama ${newUser.fullName} berhasil dibuat. Silakan login dengan email & password Anda.`,
        'success'
      );
      return true;
    } catch (e) {
      console.error('Registration failed:', e);
      toastStore.showToast('Error', 'Terjadi kesalahan saat pendaftaran. Coba lagi.', 'error');
      return false;
    }
  }

  async function loginUser(email: string, pass: string) {
    try {
      const emailClean = email.trim().toLowerCase();

      // Check Firestore users collection
      let foundUser: UserProfile | null = null;
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', emailClean));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          const userDoc = querySnapshot.docs[0];
          if (userDoc) {
            const data = userDoc.data();
            if (data.password && data.password !== pass) {
              toastStore.showToast('Login Gagal', 'Password yang Anda masukkan salah.', 'error');
              return false;
            }
            foundUser = {
              id: userDoc.id,
              fullName: data.fullName,
              email: data.email,
              phone: data.phone,
              address: data.address,
              favorites: data.favorites || [],
              createdAt: data.createdAt
            };
          }
        }
      } catch (e) {
        console.warn('Firestore login lookup note:', e);
      }

      // Fallback if local session matches
      if (!foundUser) {
        const saved = localStorage.getItem(LOCAL_USER_KEY);
        if (saved) {
          const localParsed: UserProfile = JSON.parse(saved);
          if (localParsed.email === emailClean) {
            foundUser = localParsed;
          }
        }
      }

      // Create fallback demo user login if test login
      if (!foundUser) {
        const namePart = emailClean.split('@')[0] || 'USER';
        foundUser = {
          id: `user_${Date.now()}`,
          fullName: namePart.toUpperCase(),
          email: emailClean,
          phone: '081234567890',
          address: {
            provinceId: '31',
            provinceName: 'DKI JAKARTA',
            regencyId: '3171',
            regencyName: 'KOTA JAKARTA SELATAN',
            districtId: '3171010',
            districtName: 'KEBAYORAN BARU',
            streetDetail: 'Jl. Sudirman No. 12'
          },
          favorites: [],
          createdAt: new Date().toISOString()
        };

        // Save fallback user to Firestore
        try {
          await setDoc(doc(db, 'users', foundUser.id), {
            ...foundUser,
            password: pass
          });
        } catch (e) {}
      }

      currentUser.value = foundUser;
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(foundUser));

      closeAuthModal();
      toastStore.showToast(
        'Login Berhasil!',
        `Selamat datang kembali, ${foundUser.fullName}!`,
        'success'
      );
      return true;
    } catch (e) {
      console.error('Login error:', e);
      toastStore.showToast('Error', 'Gagal memproses login.', 'error');
      return false;
    }
  }

  function logoutUser() {
    currentUser.value = null;
    localStorage.removeItem(LOCAL_USER_KEY);
    toastStore.showToast('Sampai Jumpa', 'Anda telah berhasil keluar dari akun Anda.', 'info');
  }

  async function syncUserFavorites(favorites: string[]) {
    if (!currentUser.value) return;

    currentUser.value.favorites = favorites;
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(currentUser.value));

    // Update in Firestore
    try {
      const userRef = doc(db, 'users', currentUser.value.id);
      await updateDoc(userRef, { favorites });
    } catch (e) {
      console.warn('Sync favorites Firestore note:', e);
    }
  }

  // Initialize on load
  initSession();

  return {
    // Admin
    isAdminLoggedIn,
    adminLogin,
    adminLogoutManual,
    adminLogoutAuto,
    resetAdminInactivityTimer,

    // User
    currentUser,
    isAuthModalOpen,
    authModalTab,
    openAuthModal,
    closeAuthModal,
    registerUser,
    loginUser,
    logoutUser,
    syncUserFavorites
  };
});
