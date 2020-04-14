/* eslint-disable */
import { queryNotices } from "@/services/user";

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children), // eslint-disable-line
        };
    }
    return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
    if (!menuData) {
        return [];
    }
    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => getSubMenu(item))
        .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
    if (!menuData) {
        return {};
    }
    const routerMap = {};

    const flattenMenuData = data => {
        data.forEach(menuItem => {
            if (menuItem.children) {
                flattenMenuData(menuItem.children);
            }
            // Reduce memory usage
            routerMap[menuItem.path] = menuItem;
        });
    };
    flattenMenuData(menuData);
    return routerMap;
};

export default {
    namespace: "menu",
    state: {
        menuData: [],
        routerData: [],
        breadcrumbNameMap: {},
    },
    mutations: {
        save(state, { menuData, breadcrumbNameMap, routerData }) {
            state.menuData = menuData;
            state.breadcrumbNameMap = breadcrumbNameMap;
            state.routerData = routerData;
        }
    },
    actions: {
        getMenuData({ commit },{  routes, authority, path }) {
            const originalMenuData =  routes[1].children;
            const menuData = filterMenuData(originalMenuData);
            const breadcrumbNameMap = getBreadcrumbNameMap(originalMenuData);

            commit("save", { menuData, breadcrumbNameMap, routerData: routes });
        },
    }
};
/* eslint-enable */
