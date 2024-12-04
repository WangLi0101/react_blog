import { useNavigate } from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5F6FF] to-[#F0FAFF] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center space-y-6 relative overflow-hidden animate-fade-in-up border border-[#00A9FF]/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00A9FF]/10 to-[#00A9FF]/20 rounded-full -mr-16 -mt-16 opacity-50" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00A9FF]/10 to-[#00A9FF]/20 rounded-full -ml-12 -mb-12 opacity-50" />
        <div className="absolute top-1/4 left-0 w-4 h-4 bg-[#00A9FF]/20 rounded-full -ml-2 animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-4 h-4 bg-[#00A9FF]/20 rounded-full -mr-2 animate-pulse" />

        <div className="relative">
          <div className="text-[#00A9FF] text-9xl font-bold opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in select-none">
            403
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-fade-in drop-shadow-sm">
              访问被拒绝
            </h1>
            <p className="text-gray-600 mb-8 animate-fade-in-delay">
              抱歉，您没有权限访问此页面
            </p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="group w-full px-6 py-3 text-sm font-medium text-gray-700 bg-white/90 rounded-lg
            transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]
            border border-[#00A9FF]/20 hover:border-[#00A9FF]/30 hover:bg-[#00A9FF]/5"
          >
            <span className="inline-flex items-center">
              <svg
                className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              返回上一页
            </span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="group w-full px-6 py-3 text-sm font-medium text-white bg-[#00A9FF] rounded-lg
            transition-all duration-300 hover:shadow-lg ring-offset-2 ring-[#00A9FF] focus:ring-2 outline-none
            transform hover:scale-[1.02] active:scale-[0.98] hover:bg-[#0098E5]"
          >
            <span className="inline-flex items-center">
              <svg
                className="w-4 h-4 mr-2 transform transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              返回首页
            </span>
          </button>
        </div>

        <div className="pt-4 relative z-10 animate-fade-in-delay-2">
          <p className="text-sm text-gray-500 hover:text-[#00A9FF] transition-colors duration-300 cursor-pointer">
            如果您认为这是一个错误，请联系管理员
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
