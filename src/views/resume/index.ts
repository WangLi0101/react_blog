// 简历页基础信息（姓名、头衔、联系方式等）
export const basicInfo = {
  title: "王俐",
  subtitle: "前端工程师",
  contact: {
    phone: "电话：(+86) 15731973619",
    email: "邮箱：1366197226@qq.com",
    location: "地点：北京",
    website: "网站：https://sys.betterme.cyou",
  },
} as const;
export const timeline = [
  {
    // company: "国投人力资源服务有限公司",
    company: "互联网公司",
    role: "前端工程师",
    period: "2023.03 - 至今",
    details: ["负责考试平台的开发和维护", "负责考试监控平台的开发和维护"],
  },
];

export const educations = [
  {
    school: "河北科技师范学院",
    degree: "计算机科学与技术 / 本科",
    period: "2018 - 2022",
  },
];

export const skills = [
  { name: "Vue" },
  { name: "React" },
  { name: "Electron" },
  { name: "小程序" },
  { name: "TypeScript" },
  { name: "Next.js" },
  { name: "Node.js" },
  { name: "Nest.js" },
];
export const projectList = [
  {
    name: "国考云考试平台管理系统",
    desc: "国考云机考后台管理系统，面向全国性大规模考试场景的运营管理平台,服务于每年上百万人考试",
    role: "前端开发",
    responsibility: [
      "从0到1搭建系统框架",
      "负责题库，考试，阅卷，报告，报名等模块的开发",
      "负责优化前端性能，提高用户体验",
    ],
    techStack: ["Vue3", "VueRouter", "Pinia", "TypeScript", "ElementPlus"],
    highlight: [
      {
        desc: "利用 ESLint 和 Husky 工具确保代码规范，提高团队协作效率。",
      },
      {
        desc: "RBAC 角色，权限，菜单的控制",
      },
      {
        desc: "封装配置驱动的动态表单组件，通过 JSON Schema 定义表单结构（字段类型、校验规则、布局样式）",
      },
      {
        desc: "vue3-virtual-scroller + 懒加载 + 防抖节流 实现虚拟滚动列表，优化长列表性能",
      },
      {
        desc: "微信支付宝支付集成用于报名缴费",
      },
      {
        desc: "公共组件库和工具函数的封装和维护，例如oss文件上传，打印pdf，动态表单等",
      },
    ],
  },
  {
    name: "国考云视频监控平台",
    desc: "在线考试监控管理平台，提供实时视频监控、数据大屏可视化、考场管理与统计分析，三机位视频监控，服务于每年上百万人考试",
    role: "前端开发",
    responsibility: [
      "搭建整体架构与模块拆分（BI看板、监控、统计）",
      "集成腾讯云 TRTC 实现多路实时音视频播放与控制",
      "封装 ECharts 图表组件与自适应布局，构建数据大屏",
    ],
    techStack: [
      "Vue3",
      "TypeScript",
      "Vite",
      "VueRouter",
      "Pinia",
      "ElementPlus",
      "ECharts",
      "TRTC",
      "Lottie",
      "小程序",
    ],
    highlight: [
      { desc: "封装 TRTC 客户端生命周期与重连机制，支持三机位视角监控。" },
      { desc: "Web Worker 驱动服务器时间同步与考试状态实时计算。" },
      { desc: "ECharts 自定义 SVG 地图与多维图表，按需更新减少重绘。" },
      { desc: "状态模块化设计，Pinia + 持久化插件管理复杂依赖。" },
      { desc: "代码分割与懒加载优化，大屏性能与加载体验显著提升。" },
      { desc: "轮询策略（每4分钟）平衡实时性与性能，避免过度请求。" },
      { desc: "集成 Lottie 动画与响应式适配，提升交互与视觉体验。" },
      { desc: "实现网页端，小程序端视频流推送" },
    ],
  },
];

export const myProjectList = [
  {
    name: "Media Converter 桌面媒体转换工具",
    desc: "基于 Electron 与 FFmpeg 的跨平台媒体处理应用，支持图片/视频/音频格式转换、压缩与批量处理，集成 M3U8 下载与视频合并。",
    role: "独立开发者",
    responsibility: [
      "搭建 Electron 主/渲染/Preload 架构并封装安全 IPC",
      "集成 FFmpeg 实现跨平台调用与路径适配",
      "实现图片、视频、音频的格式转换、压缩与参数控制",
      "实现 M3U8 批量下载与并发队列控制",
      "实现视频合并（concat 协议）与临时文件清理",
      "打包与自动更新配置（Windows/macOS/Linux）",
      "完善错误处理与日志记录，提升稳定性",
    ],
    techStack: ["Electron", "Vue3", "TypeScript", "FFmpeg"],
    github: ["https://github.com/WangLi0101/electron_ffmpeg"],
    url: "https://github.com/WangLi0101/electron_ffmpeg",
    highlight: [
      {
        desc: "FFmpeg 跨平台集成：macOS 使用系统 ffmpeg；Windows 区分开发与生产路径，并在打包时放入 app.asar.unpacked。",
      },
      {
        desc: "实时进度监控：解析标准输出中的 Duration 与 time= 字段，计算百分比并通过 IPC 推送到渲染进程。",
      },
      {
        desc: "类型安全 IPC：在 Preload 暴露受控 API，主进程通过 ipcMain.handle 统一处理，Map 管理监听器。",
      },
      {
        desc: "M3U8 批量下载并发控制：实现队列与最大并发（默认 20），实时统计下载状态。",
      },
      {
        desc: "跨平台打包配置：Windows NSIS、macOS DMG、Linux AppImage/DEB，统一用户体验与自动更新。",
      },
    ],
  },
  {
    name: "我的博客",
    desc: "个人博客，记录学习过程中的技术点，分享个人经验与思考",
    role: "独立开发者",
    github: ["https://github.com/WangLi0101/nest_template"],
    url: "https://sys.betterme.cyou",
    techStack: ["React", "Nest.js", "TypeORM", "Docker", "Nginx"],
  },
  {
    name: "小拉油耗",
    desc: "小拉油耗是一个基于 Next.js 开发的H5应用，用于记录和管理个人油耗数据，提供实时统计与分析功能。",
    role: "独立开发者",
    github: ["https://github.com/WangLi0101/oil_record"],
    url: "https://gas.betterme.cyou",
    techStack: ["React", "Next.js", "Prisma", "Auth.js", "Docker", "Nginx"],
  },
  {
    name: "P2P视频通话",
    desc: "P2P视频通话是一个基于 SocketIo+RTC 开发的应用，用于实现点对点视频通话功能。",
    role: "独立开发者",
    github: ["https://github.com/WangLi0101/socket"],
    url: "https://chat.guxiaotong.cn",
    techStack: ["Node.js", "Socket.io", "RTC", "TURN/STURN", "Docker", "Nginx"],
  },
];
