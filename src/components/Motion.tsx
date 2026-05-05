"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

type MotionBlockProps = HTMLMotionProps<"div"> & {
  staggerChildren?: boolean;
};

export function MotionBlock({
  children,
  staggerChildren,
  ...props
}: MotionBlockProps) {
  return (
    <motion.div
      variants={staggerChildren ? stagger : fadeUp}
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const MotionItem = motion.div;

export function RevealText({
  children,
  className,
}: React.PropsWithChildren<{ className?: string; initialVisible?: boolean }>) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
