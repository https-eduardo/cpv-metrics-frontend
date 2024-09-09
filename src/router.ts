import { createRouter, createWebHistory } from "vue-router";
import Auth from "./views/Auth.vue";
import Metrics from "./views/dashboard/Metrics.vue";
import DashboardLayout from "./views/dashboard/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Auth,
    },
    {
      path: "/dashboard",
      component: DashboardLayout,
      children: [
        { name: "Metrics", path: "", alias: "metrics", component: Metrics },
      ],
    },
  ],
});

export default router;
