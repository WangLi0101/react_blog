import React, { useEffect, useRef } from "react";
import Loading from "@/assets/images/loading.svg?react";

interface LazyLoadProps {
  isStop: boolean;
  getList: () => void;
  loading: boolean;
}

const options = {
  threshold: 0,
  rootMargin: "0px 0px 100px 0px", // 提前100px触发
};

export const LazyLoad: React.FC<LazyLoadProps> = ({
  isStop,
  getList,
  loading,
}) => {
  const moreRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 每当 isStop 或 loading 改变时，需要重新设置 observer
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      // 确保元素进入视口
      if (entries[0].isIntersecting) {
        // 只有当不是停止状态且不在加载中时才调用
        if (!isStop && !loading) {
          getList();
        }
      }
    }, options);

    // 如果元素存在则开始观察
    if (moreRef.current) {
      observer.current.observe(moreRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isStop, loading, getList]); // 添加所有相关的依赖项

  return (
    <div className="mt-5 flex justify-center items-center py-3" ref={moreRef}>
      {isStop ? (
        <div>There's nothing more....</div>
      ) : (
        <Loading className="w-full" />
      )}
    </div>
  );
};
