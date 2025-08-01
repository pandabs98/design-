"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/Flipwords";

import AboutPage from "./about/page";
import SkillPage from "./skill/page";
import WorkPage from "./work/page";
import ContactPage from "./contact/page";

type ForumPost = {
  _id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
};

export default function Home() {
  const words = ["Secure", "Safe", "Trusted", "Modern"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const [data, setData] = useState<ForumPost[]>([]);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  setMounted(true);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/auth/forum");
      setData(response.data.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch data");
      }
    }
  };
  fetchData();
}, []);

  if (!mounted) return null;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!data || data.length === 0) return <div className="text-center">Loading...</div>;

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-col hidden md:flex space-y-6">
            <motion.h1
              className="text-4xl font-bold text-foreground"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
            >
              Hi I&apos;m Riya

            </motion.h1>
            <motion.p
              className="text-5xl font-semibold text-muted-foreground"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              A Developer <br /> Dedicated to Crafting
            </motion.p>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.5 }}
            >
              <FlipWords
                words={words}
                className="text-8xl font-black text-primary"
              />
            </motion.div>
            <motion.p
              className="text-4xl font-medium text-muted-foreground"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.8 }}
            >
              Web Solutions
            </motion.p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutPage />
        </div>
      </section>

      {/* Skill Section */}
      <section id="skill" className="pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkillPage />
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkPage />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactPage />
        </div>
      </section>
    </>
  );
}