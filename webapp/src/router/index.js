// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import('@/views/setup/SetupView.vue'),
  },
  {
    path: '/setup/users-and-roles',
    name: 'user-and-roles',
    component: () => import('@/views/setup/UserAndRoles.vue'),
  },
  {
    path: '/setup/admin-catalogs',
    name: 'admin-catalgogs',
    component: () => import('@/views/setup/AdminCatalogs.vue'),
  },
  {
    path: '/setup/admin-catalogs/admin-business-unit',
    name: 'admin-business-unit',
    component: () => import('@/views/setup/admin-catalogs/AdminBusinessUnit.vue'),
  },
  {
    path: '/setup/admin-catalogs/admin-cfs',
    name: 'admin-cfs',
    component: () => import('@/views/setup/admin-catalogs/AdminCfs.vue'),
  },
  {
    path: '/setup/non-working-days',
    name: 'non-working-days',
    component: () => import('@/views/setup/NonWorkingDays.vue'),
  },
  {
    path: '/setup/admin-models',
    name: 'admin-models',
    component: () => import('@/views/setup/AdminModels.vue'),
  },
  {
    path: '/setup/admin-models/:id',
    name: 'model-view',
    component: () => import('@/views/setup/admin-models/Model.vue'),
  },

  {
    path: '/setup/values-d1',
    name: 'values-d1',
    component: () => import('@/views/setup/ValuesD1.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
