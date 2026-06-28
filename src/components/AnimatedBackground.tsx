import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <>
      {/* Animated grid background */}
      <div className="fixed inset-0 animated-grid pointer-events-none z-0 opacity-40" />

      {/* Premium Ambient Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Left Orb - Indigo */}
        <motion.div
          animate={{
            x: [0, 50, -20, 0],
            y: [0, 30, -50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.15] bg-primary-300"
        />

        {/* Bottom Right Orb - Blue */}
        <motion.div
          animate={{
            x: [0, -60, 30, 0],
            y: [0, -40, 60, 0],
            scale: [1, 0.85, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.12] bg-blue-300"
        />

        {/* Center Accent Orb - Subtle Violet */}
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full mix-blend-multiply filter blur-[90px] opacity-[0.08] bg-indigo-400"
        />
        
        {/* Soft white fade at the top so navbar is readable */}
        <div
          className="absolute top-0 inset-x-0 h-48"
          style={{
            background: "linear-gradient(to bottom, rgba(250, 250, 250, 1) 0%, rgba(250, 250, 250, 0) 100%)",
          }}
        />
        
        {/* Soft white fade at the bottom */}
        <div
          className="absolute bottom-0 inset-x-0 h-48"
          style={{
            background: "linear-gradient(to top, rgba(250, 250, 250, 1) 0%, rgba(250, 250, 250, 0) 100%)",
          }}
        />
      </div>

      {/* Global Noise Overlay for Texture */}
      <div className="fixed inset-0 bg-noise z-0 pointer-events-none" />
    </>
  );
}
