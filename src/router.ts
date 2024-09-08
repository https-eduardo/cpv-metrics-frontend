import { createRouter, createWebHistory } from "vue-router";
import Auth from "./views/Auth.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Auth,
    },
  ],
});

export default router;
