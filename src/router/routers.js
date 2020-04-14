import UserLayout from "../layouts/UserLayout.vue";
import BasicLayout from "../layouts/BasicLayout.vue";
import BlankLayout from "../layouts/BlankLayout.vue";
export default [
  {
    path: "/user",
    component: UserLayout,
    children: [
      {
        name: "login",
        path: "/user/login",
        component: () => import("@/pages/user/login")
      }
    ]
  },
  {
    path: "/",
    component: BasicLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        icon: "dashboard",
        component: BlankLayout,
        children: [
          {
            path: "/",
            redirect: "/dashboard/welcome"
          },
          {
            name: "analysis",
            icon: "smile",
            path: "/dashboard/analysis",
            component: () => import("@/pages/dashboard/analysis")
          }
        ]
      },
      {
        path: "/form",
        icon: "form",
        name: "form",
        component: BlankLayout,
        children: [
          {
            name: "basic-form",
            icon: "smile",
            path: "/form/basic-form",
            component: () => import("@/pages/dashboard/analysis")
          },
          {
            name: "step-form",
            icon: "smile",
            path: "/form/step-form",
            component: () => import("@/pages/dashboard/analysis")
          },
          {
            name: "advanced-form",
            icon: "smile",
            path: "/form/advanced-form",
            component: () => import("@/pages/dashboard/analysis")
          }
        ]
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];
