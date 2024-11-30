import { useRouteMeta } from "@/hooks/useMeta";
import React from "react";

const Roles: React.FC = () => {
  const meta = useRouteMeta();
  console.log(meta);
  return <div>index</div>;
};

export default Roles;
