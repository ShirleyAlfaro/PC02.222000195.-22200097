// src/router/routes.js

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/login' },
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'digimons', component: () => import('pages/DigimonListPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
