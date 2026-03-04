# 📋 Project Requirements Document: Fabric-Inspired Headless Mall

## 1. 项目概述 (Project Overview)
* **目标**：构建一个极致轻量、具备高奢纺织质感的 AI 原生电商前端。
* **设计基调**：复刻 Shopify **Fabric** 官方模板。核心：大留白、非对称网格、极简线条、极速响应。
* **技术栈**：
    * **Framework**: Next.js 15 (App Router, React 19)
    * **Deployment**: Cloudflare Pages (Edge Runtime)
    * **Styling**: Tailwind CSS
    * **State Management**: Zustand + Persist Middleware
    * **Backend**: Shopify Storefront API (GraphQL)

---

## 2. 设计规范 (Visual DNA)
* **核心色板**：
    * `Background`: `#F9F8F6` (米色调)
    * `Primary Text`: `#1A1A1A` (炭黑)
    * `Border/Divider`: `#E5E2DD` (极细 1px 线条)
* **字体排版**：
    * 字体：`Inter` (Sans-serif)
    * 风格：标题全大写 (Uppercase)，字间距 `tracking-[0.1em]`
* **布局逻辑**：
    * 产品主图比例固定为 `4:5`
    * 大量使用 `Section` 留白 (Padding 20+ units)
    * 卡片使用无阴影、细边框设计

---

## 3. 核心功能需求 (Core Features)

### 3.1 响应式导航 (Navigation)
* **桌面端 (Desktop)**：
    * 动态抓取 Shopify 后台 `main-menu` 菜单。
    * 实现悬停显示的 **Mega Menu**，支持左侧链接列表，右侧特色图片。
* **移动端 (Mobile)**：
    * 全屏覆盖式抽屉菜单。
    * 底部固定快捷操作栏。

### 3.2 产品系统 (Catalog & PDP)
* **列表页 (Collection)**：
    * **Streaming**: 使用 Next.js 15 `Suspense` 实现异步流式加载。
    * **Hover Switch**: 鼠标悬停产品卡片时，自动平滑淡入展示第二张图。
* **详情页 (PDP)**：
    * **垂直图片流**: 图片在大屏下采用垂直平铺布局。
    * **Sticky Info**: 产品详情与购买按钮在滚动时保持右侧固定。
    * **动态色板 (Swatches)**：大尺寸圆形色板，支持加载变体图片缩略图。

### 3.3 购物车系统 (Zustand + Shopify Cart API)
* **状态同步**：本地 Zustand 存储 `cartId`，通过 `persist` 存入 `localStorage`。
* **侧滑抽屉 (Cart Drawer)**：
    * **乐观更新**: 数量增减时本地状态先行变化，同步调用 API。
    * **自动触发**: 加入商品后自动滑出，显示实时总价。

### 3.4 结账 (Checkout)
* **安全重定向**: 获取 Shopify `webUrl`。
* **闭环路径**: 支付成功后自动返回前端 `/thank-you` 页面。

---

## 4. 技术实施计划 (Implementation Plan)

### Phase 1: 基础设施搭建
* [ ] 初始化 Next.js 15 项目，安装 `@cloudflare/next-on-pages`。
* [ ] 配置 `tailwind.config.ts` 导入 Fabric 主题色。
* [ ] 设置 `.env` 环境变量并启用 Shopify Dev MCP。

### Phase 2: 数据层开发 (Server Actions)
* [ ] 封装 `lib/shopify/client.ts` 用于执行 GraphQL 请求。
* [ ] 实现 `getProducts`, `getMenu`, `createCart` 等核心 API 函数。

### Phase 3: 状态管理与 UI
* [ ] 实现 `useCartStore.ts` (Zustand)。
* [ ] 开发 `Header`, `ProductCard`, `CartDrawer` 核心组件。

### Phase 4: 边缘部署优化
* [ ] 适配 `runtime = 'edge'`。
* [ ] 在 Cloudflare Pages 上完成自动化部署。

---

## 5. Antigravity IDE 引导指令
> "Please read `PRD.md` and initialize the project:
> 1. Setup Next.js 15 with Cloudflare adapter.
> 2. Create `tailwind.config.ts` with the defined color palette.
> 3. Implement the `useCartStore` using Zustand with persistence."