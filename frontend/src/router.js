import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('./views/HomePage.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: () => import('./views/SignIn.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
     routes
})

router.beforeEach(async (to, from, next)=>{
    const token = localStorage.getItem('authToken');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
          if (to.path !== '/signin') {
            next('/signin'); 
          } else {
            next(); 
          }
        } else {
          next(); 
        }
      } else {
        if (to.path === '/signin' && token) {
          next('/'); 
        } else {
          next(); 
        }
    }
});

export default router