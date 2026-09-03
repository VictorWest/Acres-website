// components/VenuePreview.tsx
"use client";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Building2,
  Presentation,
  ArrowRight,
} from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

const venue = {
  name: "Obi Wali International Conference Centre",
  city: "Port Harcourt",
  country: "Nigeria",
  date: "12–14 November 2026",
};

interface HolographicShapeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Holographic 3D Shape Components
const HolographicShape = ({
  children,
  className = "",
  delay = 0,
}: HolographicShapeProps) => (
  <motion.div
    className={`relative ${className}`}
    initial={{ opacity: 0, rotateY: -30, scale: 0.8 }}
    whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 1, ease: "easeOut" }}
    whileHover={{
      rotateY: 15,
      rotateX: 10,
      scale: 1.05,
      transition: { duration: 0.3 },
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-indigo-500/15 to-indigo-400/10 rounded-xl blur-xl animate-pulse" />
    <div className="relative bg-black/60 backdrop-blur-lg border border-indigo-300/40 rounded-xl p-1 shadow-2xl">
      <div className="bg-black/40 rounded-lg h-full flex items-center justify-center backdrop-blur-sm">
        {children}
      </div>
    </div>
  </motion.div>
);

export function VenuePreview() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/15 to-indigo-300/25" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-20">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Side - Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 bg-black/60 backdrop-blur-lg border border-indigo-300/40 text-indigo-100 text-sm font-medium mb-6 shadow-2xl">
                Venue & Program
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                ACRES 2026
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-indigo-100">
                  Venue & Program
                </span>
              </h1>

              <div className="space-y-6 text-lg text-indigo-50 leading-relaxed">
                <p style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }}>
                  Join us for the inaugural African Construction and Real Estate
                  Exhibition/Summit in Port Harcourt, Nigeria.
                </p>
                <p style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }}>
                  A comprehensive 3-day program featuring exhibitions, summit
                  sessions, and networking opportunities designed to drive
                  growth in Africa&apos;s construction and real estate sectors.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - 3D Holographic Shapes */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
              <HolographicShape className="h-48" delay={0.2}>
                <Building2 className="w-16 h-16 text-indigo-300" />
              </HolographicShape>

              <HolographicShape className="h-48 mt-12" delay={0.4}>
                <MapPin className="w-16 h-16 text-indigo-200" />
              </HolographicShape>

              <HolographicShape className="h-48 -mt-6" delay={0.6}>
                <Calendar className="w-16 h-16 text-indigo-400" />
              </HolographicShape>

              <HolographicShape className="h-48 mt-6" delay={0.8}>
                <Presentation className="w-16 h-16 text-indigo-100" />
              </HolographicShape>
            </div>
          </div>
        </div>

        {/* Venue Information */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
              Event Venue
            </h3>
            <p className="text-indigo-50 max-w-2xl mx-auto drop-shadow-md">
              ACRES will be hosted annually, with the inaugural event taking
              place at the Obi Wali International Conference Centre, Port
              Harcourt.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group bg-black/60 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-indigo-300/50 transition-all duration-300 text-center hover:shadow-2xl hover:shadow-indigo-500/20 hover:bg-black/70"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-indigo-500/30 border border-indigo-400/50">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors drop-shadow-lg">
                {venue.name}
              </h4>
              <p className="text-indigo-200 text-lg mb-4 drop-shadow-md">
                {venue.city}, {venue.country}
              </p>
              <div className="flex items-center justify-center gap-2 text-indigo-100">
                <Calendar className="w-4 h-4" />
                <span className="drop-shadow-md">{venue.date}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link
              href="/register/attendee"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 border border-indigo-400/50"
            >
              <Calendar className="w-5 h-5" />
              Register for ACRES 2026
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
