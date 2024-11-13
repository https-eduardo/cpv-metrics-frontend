import { createRouter, createWebHistory } from "vue-router";
import Auth from "./views/Auth.vue";
import Metrics from "./views/dashboard/Metrics.vue";
import DashboardLayout from "./views/dashboard/index.vue";
import Customers from "./views/dashboard/Customers.vue";
import ZoneMetrics from "./views/dashboard/ZoneMetrics.vue";
import Campaign from "./views/dashboard/Campaign.vue";

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
    {
      path: "/customers",
      component: DashboardLayout,
      children:[
        {name:"Customers", path:"", alias:"customers", component: Customers},
      ],
    },
    {
      path: "/zone",
      component: DashboardLayout,
      children:[
        {name:"ZoneMetrics", path:"", alias:"zone", component: ZoneMetrics},
      ],
    },
    {
      path: "/campaign",
      component: DashboardLayout,
      children:[
        {name:"Campaign", path:"", alias:"campaign", component: Campaign},
      ],
    },
  ],
});

export default router;