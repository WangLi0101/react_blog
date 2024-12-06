import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageTransition = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 25,
        mass: 0.8,
        duration: 0.3,
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};
