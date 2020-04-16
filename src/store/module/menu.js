/* eslint-disable */
import { queryNotices } from "@/services/user";
// import DefaultSettings from '../../config/defaultSettings';
// import Vue from 'vue'
/**
 * get SubMenu or Item
 */
const getSubMenu = (item,parentItem) => {
    // doc: add hideChildrenInMenu
    let locale = 'menu';
    if (parentItem && parentItem.locale !== '/') {
        locale =`${parentItem.locale}.${item.name}`;
    } else {
        locale = `menu.${item.name}`;
    }
    // const name = DefaultSettings.menu.locale
    //     ? locale
    //     : item.name;

    const result= {
        ...item,
        // name,
        locale}
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        return {
            ...result,
            children: filterMenuData(item.children,result), // eslint-disable-line
        };
    }
    return result;
};

/**
 * filter menuData
 */
const filterMenuData = (menuData,parentItem=undefined) => {
    if (!menuData) {
        return [];
    }
    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => getSubMenu(item,parentItem))
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
    namespaced: true,
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
            setTimeout(()=>{commit("save", { menuData, breadcrumbNameMap, routerData: routes })},2000)
            ;
        },
    }
};
/* eslint-enable */
