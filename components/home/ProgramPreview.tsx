/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ProgramPreview.tsx
"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  ArrowRight,
  Award,
  Handshake,
  Building2,
} from "lucide-react";

const programHighlights = [
  {
    day: "Exhibition",
    theme: "Showcase Products, Innovations & Services",
    icon: Building2,
    color: "from-indigo-400 to-indigo-500",
    description:
      "A space where companies can showcase products, innovations, and services.",
  },
  {
    day: "Summit",
    theme: "Keynotes, Panels & Workshops",
    icon: Award,
    color: "from-indigo-300 to-indigo-400",
    description:
      "A series of keynote speeches, panel discussions, and workshops addressing critical topics like urbanization, sustainability, and investment.",
  },
  {
    day: "Networking",
    theme: "Structured Networking Opportunities",
    icon: Handshake,
    color: "from-indigo-200 to-indigo-300",
    description: "Structured networking opportunities for attendees.",
  },
];

// Holographic Program Card Component
const HolographicProgramCard = ({
  day,
  dayIndex,
}: {
  day: any;
  dayIndex: number;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, x: dayIndex === 0 ? -50 : 50 },
      visible: { opacity: 1, x: 0 },
    }}
    initial={{ opacity: 0, rotateY: -30, scale: 0.8 }}
    whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: dayIndex * 0.2, duration: 0.8, ease: "easeOut" }}
    whileHover={{
      rotateY: dayIndex === 0 ? 15 : dayIndex === 1 ? 0 : -15,
      rotateX: 10,
      scale: 1.02,
      y: -8,
      transition: { duration: 0.3 },
    }}
    className="group"
  >
    {/* Holographic glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-indigo-500/15 to-indigo-400/10 rounded-3xl blur-xl animate-pulse group-hover:blur-2xl transition-all duration-500" />

    {/* Main card */}
    <div className="relative bg-black/60 backdrop-blur-lg border border-indigo-300/40 rounded-3xl p-1 shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500">
      <div className="bg-black/40 rounded-3xl h-full p-6 sm:p-8 backdrop-blur-sm border border-white/10 hover:border-indigo-300/50 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${day.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-indigo-500/30 border border-indigo-400/50 flex-shrink-0`}
          >
            <day.icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors drop-shadow-lg">
              {day.day}
            </h3>
          </div>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <h4 className="text-xl sm:text-2xl text-indigo-300 mb-4 drop-shadow-lg font-semibold">
            {day.theme}
          </h4>
          <p className="text-indigo-100 leading-relaxed drop-shadow-md text-base sm:text-lg">
            {day.description}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

export function ProgramPreview() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden py-12 sm:py-20">
      {/* Background Effects - Matching AboutPreview */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/15 to-indigo-300/25" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-black/60 backdrop-blur-lg border border-indigo-300/40 text-indigo-100 text-sm font-medium mb-6 shadow-2xl">
            Event Program
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Three Days of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-indigo-100">
              Excellence
            </span>
          </h2>

          <p
            className="text-lg sm:text-xl text-indigo-50 max-w-4xl mx-auto leading-relaxed px-4 mb-8"
            style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }}
          >
            The ACRES program will be structured over three days and will feature
            keynote speeches, panel discussions, technical workshops,
            exhibitions, and networking events.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-indigo-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">12–14 November 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-medium">
                Obi Wali ICC, Port Harcourt
              </span>
            </div>
          </div>
        </motion.div>

        {/* Program Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 mb-12 sm:mb-16"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3, delayChildren: 0.2 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {programHighlights.map((day, dayIndex) => (
            <HolographicProgramCard
              key={dayIndex}
              day={day}
              dayIndex={dayIndex}
            />
          ))}
        </motion.div>

        {/* Program CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 border border-indigo-400/50"
          >
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Register for ACRES</span>
            <span className="sm:hidden">Register Now</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
