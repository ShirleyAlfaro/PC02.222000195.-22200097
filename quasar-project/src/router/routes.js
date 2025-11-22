const routes = [
  {
    path: '/',
    redirect: '/login'
  }, 
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/LoginPage.vue')
  }
  ,
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default routes
