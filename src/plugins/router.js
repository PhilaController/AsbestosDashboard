import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/views/Dashboard";
import AboutPage from "@/views/About";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/about",
            component: AboutPage,
        },
        {
            path: "/",
            component: Dashboard,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});