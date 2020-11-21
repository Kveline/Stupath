import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Dashboard from "../views/Dashboard";
import Learning from "../views/Learning";
import TambahForum from "../views/TambahForum";
import ListForum from "../views/ListForum";
import DetailForum from "../views/DetailForum";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },

  {
    path: "/dashboard",
    component: Dashboard
  },

  {
    path: "/learning/:id",
    component: Learning
  },

  {
    path: "/login",
    component: Login
  },

  {
    path: "/register",
    component: Register
  },
  {
    path: "/tambah-forum",
    component: TambahForum
  },

  {
    path: "/forum",
    component: ListForum
  },
  {
    path: "/forum/:id",
    component: DetailForum
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
