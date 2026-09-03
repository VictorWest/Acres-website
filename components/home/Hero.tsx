"use client";

import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.section
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-14"
    >
      {/* Enhanced Video Background - Fixed zoom and positioning */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            style={{
              filter: "brightness(0.4) contrast(1.1)",
            }}
          >
            <source src="virtual.mp4" type="video/mp4" />
          </video>

          {/* Fallback background when video not loaded */}
          {!videoLoaded && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900/50 to-purple-900/30" />
          )}
        </div>
      </div>

      {/* Video Controls - Adjusted for mobile */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlayPause}
          className="p-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-black/70 transition-all duration-200"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
          className="p-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-black/70 transition-all duration-200"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* indigo Gradient Overlay with Parallax */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-indigo-400/15 to-indigo-300/25"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

      {/* Enhanced content with better mobile centering */}
      <div
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center min-h-screen py-8 sm:py-12"
        style={{
          transform: `translateY(${scrollY * -0.2}px)`,
        }}
      >
        {/* Top Badge with better mobile spacing */}
        <motion.div
          variants={slideUpVariants}
          className="inline-flex items-center mt-5 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-black/60 backdrop-blur-lg border border-indigo-300/40 text-indigo-100 text-xs sm:text-sm font-medium shadow-2xl mb-6 sm:mb-8"
        >
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          <span className="text-center">
            12–14 November 2026 • Port Harcourt
          </span>
        </motion.div>

        {/* ACRES Title with responsive sizing */}
        <motion.h1
          variants={slideUpVariants}
          className=" font-black leading-none tracking-tight mb-4 sm:mb-6"
        >
          <span className="text-white drop-shadow-2xl">
            <img src="/logo.png" alt="logo" />
          </span>
        </motion.h1>

        {/* Subtitle with responsive sizing */}
        <motion.p
          variants={slideUpVariants}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-medium mb-4 sm:mb-6 max-w-6xl leading-relaxed drop-shadow-2xl px-2"
          style={{
            transform: `translateY(${scrollY * -0.3}px)`,
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)",
          }}
        >
          Africa Construction & Real Estate Summit
        </motion.p>

        {/* Description with better mobile text sizing */}
        <motion.p
          variants={slideUpVariants}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-indigo-50 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12 drop-shadow-xl px-4"
          style={{
            transform: `translateY(${scrollY * -0.25}px)`,
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          Building Africa’s Future — Where real estate leaders, investors, and
          innovators unite for sustainable growth.
        </motion.p>

        {/* Buttons with better mobile spacing */}
        <motion.div
          variants={slideUpVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 w-full max-w-md sm:max-w-none"
          style={{
            transform: `translateY(${scrollY * -0.2}px)`,
          }}
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/register/attendee"
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full font-semibold text-base sm:text-lg shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center border border-indigo-400/50"
            >
              Register Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
            <a
              href="#program"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/40 text-white rounded-full font-semibold text-base sm:text-lg backdrop-blur-lg bg-black/30 hover:bg-white/20 hover:border-white/60 transition-all duration-300 shadow-xl flex items-center justify-center"
            >
              View Program
            </a>
          </motion.div>
        </motion.div>

        {/* Stats with better mobile layout */}
        <motion.div
          variants={slideUpVariants}
          className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-sm sm:max-w-2xl md:max-w-4xl mx-auto mb-8 sm:mb-12"
          style={{
            transform: `translateY(${scrollY * -0.15}px)`,
          }}
        >
          {[
            { icon: Users, label: "5000+", desc: "Attendees" },
            { icon: MapPin, label: "40+", desc: "Countries" },
            { icon: Calendar, label: "3", desc: "Days" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-black/60 backdrop-blur-lg border border-white/20 hover:bg-black/70 hover:border-white/30 transition-all duration-300 shadow-xl"
            >
              <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-300 mb-1 sm:mb-2" />
              <div className="text-lg sm:text-xl font-bold text-white mb-1 drop-shadow-lg">
                {stat.label}
              </div>
              <div className="text-indigo-200 text-xs sm:text-sm drop-shadow-md text-center">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom section with better mobile layout */}
        <motion.div
          variants={slideUpVariants}
          className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl text-white text-lg sm:text-xl md:text-2xl font-medium drop-shadow-2xl gap-4 sm:gap-0"
          style={{
            transform: `translateY(${scrollY * -0.1}px)`,
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)",
          }}
        >
          <div className="text-center sm:text-left">12–14 November 2026</div>
          <div className="hidden sm:block w-32 md:w-48 h-px bg-white/50 shadow-lg" />
          <div className="text-center sm:text-right">Obi Wali ICC, Port Harcourt</div>
        </motion.div>
      </div>
    </motion.section>
  );
}
