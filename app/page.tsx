"use client";
import { motion, Variants } from "framer-motion";
import { HeroSection } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ProgramPreview } from "@/components/home/ProgramPreview";
import { SpeakersPreview } from "@/components/home/SpeakerPreview";
import { PartnersPreview } from "@/components/home/PartnersPreview";
import { VenuePreview } from "@/components/home/VenuePreview";
import { CTASection } from "@/components/home/CTASection";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/layout/Nav";
import { useState } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Navigation items
const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Program", link: "#program" },
  { name: "Speakers", link: "#speakers" },
  { name: "Partners", link: "#partners" },
  { name: "Venue", link: "#venue" },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Dynamic Navigation */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <NavbarButton href="/register/attendee" variant="primary">
            Register Now
          </NavbarButton>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={handleMobileMenuToggle}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={handleMobileMenuToggle}
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                onClick={handleMobileItemClick}
                className="block w-full px-4 py-3 text-indigo-100 hover:text-white hover:bg-black/60 rounded-lg transition-all duration-300 font-medium border border-transparent hover:border-indigo-300/40"
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="pt-4 border-t border-indigo-300/20">
              <NavbarButton
                href="/register/attendee"
                variant="primary"
                className="w-full justify-center"
                onClick={handleMobileItemClick}
              >
                Register Now
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Consistent Background Effects - Matching AboutPreview */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-slate-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(120,119,198,0.3),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(120,119,198,0.2),_transparent_50%)]" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Hero Section */}
        <motion.div variants={sectionVariants} id="home">
          <HeroSection />
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={sectionVariants}>
          <StatsSection />
        </motion.div>

        {/* About Preview */}
        <motion.div variants={sectionVariants} id="about">
          <AboutPreview />
        </motion.div>

        {/* Program Preview */}
        <motion.div variants={sectionVariants} id="program">
          <ProgramPreview />
        </motion.div>

        {/* Speakers Preview */}
        <motion.div variants={sectionVariants} id="speakers">
          <SpeakersPreview />
        </motion.div>

        {/* Partners Preview */}
        <motion.div variants={sectionVariants} id="partners">
          <PartnersPreview />
        </motion.div>

        {/* Venue Preview */}
        <motion.div variants={sectionVariants} id="venue">
          <VenuePreview />
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={sectionVariants} id="register">
          <CTASection />
        </motion.div>
      </motion.main>
    </>
  );
}
