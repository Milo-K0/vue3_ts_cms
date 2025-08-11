import { type RouteRecordRaw } from 'vue-router'

export let firstMenu: any = null

// 1.动态获取所有的路由对象，放到数组中
// * 路由对象都在独立的文件中
// * 从文件中将所有路由对象先读取到数组中
export function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }
  )
  // 将所有路由添加到localRoutes中
  for (const key in files) {
    localRoutes.push(files[key].default)
  }
  return localRoutes
}

export function mapManusToRoutes(userMenus) {
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  // 获取用户权限对应路由并筛选
  for (const item of userMenus) {
    for (const subItem of item.children) {
      const route = localRoutes.find((item) => item.path === subItem.url)
      if (!firstMenu && route) firstMenu = subItem
      if (route) routes.push(route)
    }
  }
  return routes
}

/**
 * 根据路由地址匹配对应的用户菜单
 * @param path 路由路径
 * @param userMenus 用户菜单
 */
export function mapPathToManus(path: string, userMenus: any) {
  for (const item of userMenus) {
    for (const subItem of item.children) {
      if (path === subItem.url) {
        return subItem
      }
    }
  }
}
