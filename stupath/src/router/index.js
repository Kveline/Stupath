import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "../firebase";
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
    component: Home,
    meta: {
      requiresLogin: true
    },

    children: [
      {
        path: "",
        component: Dashboard
      },

      {
        path: "/learning/:id",
        component: Learning
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
    ]
  },

  {
    path: "/login",
    component: Login
  },

  {
    path: "/register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth.currentUser;
  let requiresLogin = to.matched.some(x => x.meta.requiresLogin);
  console.log(currentUser, requiresLogin);
  if (requiresLogin) {
    if (!currentUser) next("/login");
    else next();
  } else {
    next();
  }
});

export default router;
