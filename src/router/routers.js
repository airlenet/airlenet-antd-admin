import UserLayout from "../layouts/UserLayout.vue";
import BasicLayout from "../layouts/BasicLayout.vue";
import BlankLayout from "../layouts/BlankLayout.vue";
export default [
  {
    path: "/user",
    component: UserLayout,
    children: [
      { path: "/user", redirect: "/user/login" },
      {
        name: "login",
        path: "/user/login",
        component: () => import("@/pages/user/login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () => import("@/pages/user/Register")
      },
      {
        path: "/user/register-result",
        name: "register.result",
        component: () => import("@/pages/user/RegisterResult")
      },
      {
        path: "/user/*",
        component: () => import("@/pages/404")
      }
    ]
  },
  {
    path: "/",
    component: BasicLayout,
    children: [
      { path: "/", redirect: "/dashboard/analysis" },
      {
        path: "/dashboard",
        name: "dashboard",
        icon: "dashboard",
        component: BlankLayout,
        children: [
          {
            name: "analysis",
            icon: "smile",
            path: "/dashboard/analysis",
            component: () => import("@/pages/dashboard/analysis")
          },
          {
            path: "/dashboard/monitor",
            name: "monitor",
            icon: "smile",
            component: () => import("@/pages/dashboard/monitor")
          },
          {
            path: "/dashboard/workplace",
            name: "workplace",
            icon: "smile",
            component: () => import("@/pages/dashboard/workplace")
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
      },
      {
        path: "/list",
        icon: "table",
        name: "list",
        component: BlankLayout,
        children: [
          {
            path: "/list/search",
            name: "search-list",
            component: () => import("@/pages/list/search"),
            children: [
              {
                path: "/list/search",
                redirect: "/list/search/articles"
              },
              {
                name: "articles",
                icon: "smile",
                path: "/list/search/articles",
                component: () => import("@/pages/list/search/articles")
              },
              {
                name: "projects",
                icon: "smile",
                path: "/list/search/projects",
                component: () => import("@/pages/list/search/projects")
              },
              {
                name: "applications",
                icon: "smile",
                path: "/list/search/applications",
                component: () => import("@/pages/list/search/applications")
              }
            ]
          },
          {
            name: "table-list",
            icon: "smile",
            path: "/list/table-list",
            component: () => import("@/pages/list/table-list")
          },
          {
            name: "basic-list",
            icon: "smile",
            path: "/list/basic-list",
            component: () => import("@/pages/list/basic-list")
          },
          {
            name: "card-list",
            icon: "smile",
            path: "/list/card-list",
            component: () => import("@/pages/list/card-list")
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
