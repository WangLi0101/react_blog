// 背景装饰组件：提供 3 种风格可选
// 设计意图：
// - 保持内容区对比度与可读性：采用低饱和度、低不透明度的渐变与线稿
// - 响应式布局：图形在不同断点下尺寸位置有所调整
// - 轻动画：使用内置过渡与 pulse，避免分散注意力
export const BackgroundDecor: React.FC<{
  variant: "texture" | "geometric" | "grid";
}> = ({ variant }) => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 print:hidden overflow-hidden">
      {variant === "texture" && (
        // 方案一：纹理渐变（专业柔和）
        <div className="absolute inset-0">
          {/* 基础背景色 - 适配深色模式 */}
          <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />
          
          {/* 顶部左侧光晕：Light(天蓝), Dark(深靛蓝) */}
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-sky-200/30 dark:bg-indigo-900/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
          
          {/* 底部右侧光晕：Light(紫), Dark(深紫) */}
          <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-purple-200/30 dark:bg-purple-900/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
          
          {/* 中间补充光晕：Light(粉), Dark(深蓝) */}
          <div className="absolute top-[30%] left-[20%] w-[50%] h-[50%] rounded-full bg-pink-200/30 dark:bg-blue-900/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />

          {/* 噪点纹理叠加，增加质感 */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
          />
        </div>
      )}

      {variant === "geometric" && (
        // 方案二：几何图形（现代科技）
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
          {/* 大圆形光斑 */}
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-sky-400/20 to-indigo-500/20 dark:from-sky-600/10 dark:to-indigo-700/10 blur-3xl opacity-60" />
          
          {/* 斜切矩形 */}
          <div className="absolute top-1/3 -right-32 h-96 w-[40rem] -rotate-12 rounded-[3rem] bg-gradient-to-l from-fuchsia-400/10 to-emerald-400/10 dark:from-fuchsia-900/10 dark:to-emerald-900/10 blur-2xl" />
          
          {/* 装饰性线条 */}
          <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-700" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
      )}

      {variant === "grid" && (
        // 方案三：网格线稿（极简清爽）
        <div className="absolute inset-0 bg-white dark:bg-slate-950">
          {/* 细网格背景 */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* 中心聚光渐变，柔化网格 */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-90" />
        </div>
      )}
    </div>
  );
};
