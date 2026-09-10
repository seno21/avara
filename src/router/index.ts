import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ShopView from '../views/ShopView.vue';
import FaqView from '../views/FaqView.vue';
import AboutView from '../views/AboutView.vue';
import AdminView from '../views/AdminView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/checkout',
      redirect: '/shop'
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
