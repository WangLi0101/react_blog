# 动态路由实现说明

## 概述

本项目实现了基于后端返回的菜单数据（`MenuItem[]`）的动态路由系统。动态路由会根据 `menuStore.myMenuFlattenList` 中的数据自动生成对应的路由配置。

## 实现原理

### 1. 数据结构

后端返回的菜单数据类型为 `MenuItem[]`，包含以下字段：
- `id`: 菜单项唯一标识
- `path`: 路由路径
- `title`: 菜单标题
- `icon`: 菜单图标
- `isHidden`: 是否隐藏
- `parentId`: 父级菜单ID
- `component`: 组件路径

### 2. 核心文件

#### `/src/router/utils/dynamicRoutes.ts`
动态路由生成工具函数，主要功能：
- `loadComponent()`: 动态加载组件，支持懒加载
- `generateDynamicRoutes()`: 将 MenuItem[] 转换为 RouteObject[]
- `buildNestedRoutes()`: 构建嵌套路由结构（可选）

#### `/src/router/index.tsx`
路由主文件，集成动态路由：
- 使用 `useMemo` 缓存动态路由生成结果
- 将动态路由合并到 `/back` 路由的 children 中
- 支持路由权限控制

### 3. 组件懒加载

动态路由支持组件的懒加载机制：
- 使用 `import.meta.glob()` 预加载所有视图组件
- 通过 `React.lazy()` 实现按需加载
- 提供组件未找到时的错误处理

## 使用方式

### 1. 确保菜单数据格式正确

后端返回的菜单数据应符合 `MenuItem` 接口定义，特别是 `component` 字段应指向正确的组件路径。

### 2. 组件路径规范

组件路径支持以下格式：
- 相对路径：`/system/user` → `@/views/system/user.tsx`
- 绝对路径：`@/views/system/user.tsx`
- 自动补全：`system/user` → `@/views/system/user.tsx`

### 3. 路由权限控制

动态路由会自动过滤：
- `isHidden: true` 的菜单项
- 没有 `component` 字段的菜单项
- 在权限检查中会验证用户是否有访问权限

## 示例

假设后端返回以下菜单数据：

```typescript
const menuData: MenuItem[] = [
  {
    id: 1,
    path: "/back/system",
    title: "系统管理",
    icon: "system",
    isHidden: false,
    parentId: null,
    component: "system/index"
  },
  {
    id: 2,
    path: "/back/system/user",
    title: "用户管理",
    icon: "user",
    isHidden: false,
    parentId: 1,
    component: "system/user"
  }
];
```

系统会自动生成对应的路由配置，并将其添加到 `/back` 路由的子路由中。

## 注意事项

1. 确保组件文件存在于 `@/views` 目录下
2. 组件应该是默认导出
3. 路径格式要与实际文件结构匹配
4. 动态路由会在菜单数据变化时自动更新