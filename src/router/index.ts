import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import CreateArticle from "../views/CreateArticle.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register},
  { path: "/profile",component:Profile},
  { path: "/create",component:CreateArticle},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
