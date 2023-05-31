import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: ()=> import("@/views/HomePage")
    },
    {
        path: '/login',
        name: 'Login',
        component: ()=> import("@/views/Login")
    },
    {
        path: '/register',
        name: 'Register',
        component: ()=> import("@/views/Register")
    },
    {
        path: '/reset-password/:token',
        name: 'ResetPassword',
        component: ()=> import("@/views/ResetPassword")
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router