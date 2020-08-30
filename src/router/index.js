import Vue from "vue";
import VueRouter from "vue-router";
import Place from "@/views/Place.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/places/:id",
    name: "Place",
    component: Place,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
