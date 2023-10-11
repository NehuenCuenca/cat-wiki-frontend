import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    {   
        name: 'Home',
        path: '/', 
        component: () => import( /* webpackChunkName: "HomePage" */ '../pages/Home.vue') 
    },
    {   
        name: 'Breed',
        path: '/breed/:breed_id', 
        component: () => import( /* webpackChunkName: "BreedPage" */ '../pages/Breed.vue') 
    },
    {   
        name: 'TopMostSearchedBreeds',
        path: '/top-most-searched-breeds', 
        component: () => import( /* webpackChunkName: "TopMostSearchedBreeds" */ '../pages/TopMostSearchedBreeds.vue') 
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export default router;