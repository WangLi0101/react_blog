// 背景装饰组件：提供 3 种风格可选
// 设计意图：
// - 保持内容区对比度与可读性：采用低饱和度、低不透明度的渐变与线稿
// - 响应式布局：图形在不同断点下尺寸位置有所调整
// - 轻动画：使用内置过渡与 pulse，避免分散注意力
export const BackgroundDecor: React.FC<{
  variant: "texture" | "geometric" | "grid";
}> = ({ variant }) => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 print:hidden">
      {variant === "texture" && (
        // 方案一：纹理渐变（专业柔和）
        // 通过两层径向渐变与顶部浅色高光，营造淡雅层次
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(56,189,248,0.14),_transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.12),_transparent_60%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/40 to-transparent" />
          {/* 中心微妙聚光，增强内容聚焦 */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.25),_transparent_60%)]" />
        </div>
      )}

      {variant === "geometric" && (
        // 方案二：几何图形（现代科技）
        // 大圆+斜切矩形+小圆点，使用低透明渐变与模糊，营造科技感
        <div className="absolute inset-0">
          {/* 大圆形光斑（左上） */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/20 to-indigo-500/10 blur-2xl transition-opacity duration-700 motion-safe:animate-pulse" />
          {/* 斜切矩形（右下） */}
          <div className="absolute -bottom-24 -right-16 h-64 w-[28rem] rotate-12 rounded-3xl bg-gradient-to-r from-fuchsia-400/10 to-emerald-400/10 blur-xl shadow-[0_0_60px_rgba(16,185,129,0.12)] transition-transform duration-700 motion-safe:animate-pulse" />
          {/* 点阵元素（右上） */}
          <div className="absolute right-8 top-16 grid grid-cols-6 gap-2 opacity-40">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-slate-400/30"
                style={{
                  animation: `${
                    (i % 6) * 120
                  }ms ease-in-out 0s 1 normal none running`,
                }}
              />
            ))}
          </div>
          {/* 顶部柔光 */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      )}

      {variant === "grid" && (
        // 方案三：网格线稿（极简清爽）
        // 以细线网格为底，并叠加中心渐隐聚光，突出主体内容
        <div className="absolute inset-0">
          {/* 细网格背景 */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
          {/* 中心聚光渐变，避免网格干扰阅读 */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.7),_transparent_60%)]" />
          {/* 顶部与底部过渡 */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 to-transparent" />
        </div>
      )}
    </div>
  );
};
