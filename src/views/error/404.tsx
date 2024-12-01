import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-9xl font-bold text-gray-800 md:text-[150px]">404</h1>

      <img
        src="https://illustrations.popsy.co/gray/falling.svg"
        alt="404 illustration"
        className="max-w-[400px] w-full h-auto my-8"
      />

      <p className="text-2xl text-gray-600 mb-8">抱歉，您访问的页面不存在</p>

      <button
        onClick={handleBackHome}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg 
                 hover:bg-blue-600 transition-colors duration-300
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        返回首页
      </button>
    </div>
  );
};

export default NotFound;
