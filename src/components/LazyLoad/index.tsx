import React, { useEffect, useRef } from "react";
import Loading from "@/assets/images/loading.svg?react";
interface LazyLoadProps {
  isStop: boolean;
  getList: () => void;
}
const options = {
  threshold: 0, //表示当子元素和父元素覆盖多少时触发回调函数。
};

export const LazyLoad: React.FC<LazyLoadProps> = ({ isStop, getList }) => {
  const moreRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  observer.current = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio > 0 && !isStop) {
      getList();
    }
  }, options);

  useEffect(() => {
    if (moreRef.current) {
      observer.current?.observe(moreRef.current);
    }
  }, []);
  return (
    <div className="mt-5 flex justify-center items-center py-3" ref={moreRef}>
      {isStop ? <div>没有更多了....</div> : <Loading className="w-full" />}
    </div>
  );
};
