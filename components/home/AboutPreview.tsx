"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Eye,
  Building2,
  TrendingUp,
  Users,
  Globe,
  Calendar,
  MapPin,
  Lightbulb,
  HandshakeIcon,
  GraduationCap,
  Leaf,
} from "lucide-react";
import { ReactNode } from "react";

const features = [
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the premier platform for shaping the future of Africa's construction and real estate sectors, promoting world-class standards, sustainability, and economic growth.",
  },
  {
    icon: Target,
    title: "Our Mission",
    description:
      "ACRES seeks to connect key stakeholders across the construction and real estate value chains to discuss challenges, explore innovative solutions, and showcase opportunities in Africa's construction and real estate markets.",
  },
  {
    icon: Building2,
    title: "Our Focus",
    description:
      "Addressing challenges such as regulatory frameworks, lack of affordable housing, access to finance, and sustainability while capitalizing on opportunities in Africa's booming construction and real estate markets.",
  },
];

const objectives = [
  {
    icon: HandshakeIcon,
    title: "Facilitate Industry Collaboration",
    description:
      "Bring together industry leaders, investors, government officials, and experts to share insights and experiences that will drive growth and innovation in construction and real estate.",
  },
  {
    icon: Lightbulb,
    title: "Promote Best Practices",
    description:
      "Highlight and promote global best practices in construction, sustainability, smart cities, and real estate development while tailoring these to the African context.",
  },
  {
    icon: TrendingUp,
    title: "Showcase Investment Opportunities",
    description:
      "Present lucrative opportunities for investment in infrastructure, housing, and commercial real estate in Africa, particularly Nigeria, while facilitating access to capital and finance for local businesses.",
  },
  {
    icon: GraduationCap,
    title: "Skills Development",
    description:
      "Address the skills gap in the construction industry by promoting workforce development, up-skilling initiatives, and training opportunities.",
  },
];

const stats = [
  { number: "25+", label: "African Countries", icon: Globe },
  { number: "500+", label: "Industry Leaders", icon: Users },
  { number: "$2.5B+", label: "Investment Target", icon: TrendingUp },
  { number: "3 Days", label: "Event Duration", icon: Calendar },
];

const expectedOutcomes = [
  {
    title: "Knowledge Sharing",
    description:
      "Deep insights into current trends, challenges, and opportunities in Africa's construction and real estate markets.",
  },
  {
    title: "Strategic Partnerships",
    description:
      "New partnerships between international and local stakeholders, fostering joint ventures and investment deals.",
  },
  {
    title: "Investment Commitments",
    description:
      "Identification of bankable projects with commitments from investors and financial institutions.",
  },
  {
    title: "Skills Development",
    description:
      "Training opportunities, up-skilling programs, and showcasing the latest construction techniques.",
  },
  {
    title: "Sustainability Innovation",
    description:
      "Promotion of green building practices, smart technologies, and sustainable urban planning.",
  },
];

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

export function AboutPreview() {
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
                About ACRES Summit
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Shaping Africa&apos;s
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-indigo-100">
                  Construction Future
                </span>
              </h1>

              <div className="space-y-6 text-lg text-indigo-50 leading-relaxed">
                <p style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }}>
                  The African Construction and Real Estate sectors are poised
                  for massive growth and transformation, driven by rapid
                  urbanization, rising demand for housing, and increased
                  infrastructure development across the continent.
                </p>
                <p style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }}>
                  ACRES is an annual event designed to address challenges such
                  as regulatory frameworks, lack of affordable housing, access
                  to finance, and sustainability while capitalizing on
                  opportunities in Africa&apos;s booming construction and real
                  estate markets.
                </p>
                <p style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }}>
                  We bring together local and international stakeholders to
                  foster dialogue, share knowledge, and build partnerships that
                  drive innovation, growth, and sustainability across the
                  continent.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - 3D Holographic Shapes */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
              <HolographicShape className="h-48" delay={0.2}>
                <Eye className="w-16 h-16 text-indigo-300" />
              </HolographicShape>

              <HolographicShape className="h-48 mt-12" delay={0.4}>
                <Target className="w-16 h-16 text-indigo-200" />
              </HolographicShape>

              <HolographicShape className="h-48 -mt-6" delay={0.6}>
                <Building2 className="w-16 h-16 text-indigo-400" />
              </HolographicShape>

              <HolographicShape className="h-48 mt-6" delay={0.8}>
                <Globe className="w-16 h-16 text-indigo-100" />
              </HolographicShape>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Focus Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 h-full border border-white/20 hover:border-indigo-300/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:bg-black/70">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-indigo-500/30 border border-indigo-400/50">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors drop-shadow-lg">
                  {feature.title}
                </h3>
                <p className="text-indigo-50 leading-relaxed drop-shadow-md">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Objectives Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Key{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-100">
                Objectives
              </span>
            </h2>
            <p className="text-indigo-100 text-lg max-w-3xl mx-auto">
              Our strategic objectives designed to transform Africa&apos;s
              construction and real estate landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-indigo-300/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:bg-black/70">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-indigo-500/30 border border-indigo-400/50 flex-shrink-0">
                      <objective.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors drop-shadow-lg">
                        {objective.title}
                      </h3>
                      <p className="text-indigo-50 leading-relaxed drop-shadow-md">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.5 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-black/60 backdrop-blur-lg rounded-xl border border-white/20 hover:shadow-2xl hover:shadow-indigo-500/30 hover:bg-black/70 hover:border-white/30 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-indigo-300 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {stat.number}
              </div>
              <div className="text-sm text-indigo-200 font-medium drop-shadow-md">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expected Outcomes Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Expected{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-100">
                Outcomes
              </span>
            </h2>
            <p className="text-indigo-100 text-lg max-w-3xl mx-auto">
              The transformative impact we aim to achieve through ACRES Summit
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {expectedOutcomes.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="bg-black/60 backdrop-blur-lg rounded-xl p-6 h-full border border-white/20 hover:border-indigo-300/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:bg-black/70">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/30 border border-indigo-400/50">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors drop-shadow-lg">
                    {outcome.title}
                  </h3>
                  <p className="text-indigo-50 text-sm leading-relaxed drop-shadow-md">
                    {outcome.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Event Details Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-indigo-300/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Join Us at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-100">
                ACRES 2026
              </span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-indigo-100">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-indigo-300" />
                <span className="text-lg">12–14 November 2026</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-indigo-300" />
                <span className="text-lg">Obi Wali ICC, Port Harcourt</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 border border-indigo-400/50"
          >
            Register for ACRES Summit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
