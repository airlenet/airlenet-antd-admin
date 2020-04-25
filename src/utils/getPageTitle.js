import pathToRegexp from 'path-to-regexp';
import Settings  from '../config/defaultSettings';

export const matchParamsPath = (
    pathname ,
    breadcrumb  ,
breadcrumbMap
) => {
    // Internal logic use breadcrumbMap to ensure the order
    // 内部逻辑使用 breadcrumbMap 来确保查询顺序
    if (breadcrumbMap) {
        const pathKey = [...breadcrumbMap.keys()].find((key) =>
            pathToRegexp(key).test(pathname),
        );
        if (pathKey) {
            return breadcrumbMap.get(pathKey);
        }
    }

    // External uses use breadcrumb
    // 外部用户使用 breadcrumb 参数
    if (breadcrumb) {
        const pathKey = Object.keys(breadcrumb).find((key) =>
            pathToRegexp(key).test(pathname),
        );

        if (pathKey) {
            return breadcrumb[pathKey];
        }
    }

    return {
        path: '',
    };
};


const getPageTitle = (props, ignoreTile) => {
    const {
        pathname = '/',
        breadcrumb,
        breadcrumbMap,
        formatMessage,
        title = Settings['title'],
        menu = Settings['menu'],
    } = props;
    const pageTitle = ignoreTile ? '' : title;
    if (!pathname) {
        return pageTitle;
    }
    const currRouterData = matchParamsPath(pathname, breadcrumb, breadcrumbMap);
    if (!currRouterData) {
        return pageTitle;
    }
    let pageName = currRouterData.name;
    if (menu.locale !== false && currRouterData.locale && formatMessage) {
        pageName = formatMessage({
            id: currRouterData.locale || '',
            defaultMessage: currRouterData.name,
        });
    }

    if (!pageName) {
        return pageTitle;
    }
    if (ignoreTile) {
        return pageName;
    }
    return `${pageName} - ${title}`;
};

/**
 * 获取关于 pageTile 的所有信息方便包装
 * @param props
 * @param ignoreTile
 */
const getPageTitleInfo = (
    props,
    ignoreTile,
) => {
    const {
        pathname = '/',
        breadcrumb,
        breadcrumbMap,
        formatMessage,
        title = Settings['title'],
        menu = Settings['menu'],
    } = props;
    const pageTitle = ignoreTile ? '' : title;
    if (!pathname) {
        return {
            title: pageTitle,
            id: '',
            pageName: pageTitle,
        };
    }
    const currRouterData = matchParamsPath(pathname, breadcrumb, breadcrumbMap);
    if (!currRouterData) {
        return {
            title: pageTitle,
            id: '',
            pageName: pageTitle,
        };
    }
    let pageName = currRouterData.name;
    if (menu.locale !== false && currRouterData.locale && formatMessage) {
        pageName = formatMessage({
            id: currRouterData.locale || '',
            defaultMessage: currRouterData.name,
        });
    }

    if (!pageName) {
        return {
            title: pageTitle,
            id: currRouterData.locale || '',
            pageName: pageTitle,
        };
    }
    if (ignoreTile) {
        return {
            title: pageName,
            id: currRouterData.locale || '',
            pageName,
        };
    }
    return {
        title: `${pageName} - ${title}`,
        id: currRouterData.locale || '',
        pageName,
    };
};

export { getPageTitleInfo };

export default getPageTitle;