import VueRouter from 'vue-router'
import Vue from 'vue'
import HomePage from '../pages/Home.vue'
import WorksPage from '../pages/Works.vue'
import NotFoundPage from '../pages/NotFound.vue'
import UploadPage from '../pages/Upload.vue'
import LoginPage from '../pages/Login.vue'
import RegisterPage from '../pages/Register.vue'
import WorkPage from '../pages/Work.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', name: 'home', component: HomePage},
        { path: '/works', name: 'works', component: WorksPage},
        { path: '/work/:workId', name: 'work', component: WorkPage, props: true },
        { path: '/upload', name: 'upload', component: UploadPage},
        { path: '/login', name: 'login', component: LoginPage},
        { path: '/register', name: 'register', component: RegisterPage, beforeEnter(to,from,next) { 
            if(!localStorage.getItem('token'))
                next(false)
            else
                next();
            }},
        //{ path: '/logout', name: 'logout' },
        { path: '*', component: NotFoundPage}
    ]
})
router.beforeEach((to, from, next) => {
    document.title = "Seneca Creative"
    next()
})

export default router;
