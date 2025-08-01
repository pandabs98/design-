"use client";

import React, { useEffect, useState } from "react";


// Skill type
interface Skill {
  category: string;
  icon: string;
  items: string[];
  proficiency: number;
}

// Skill data
const skills: Skill[] = [
  {
    category: "Languages",
    icon: "🧩",
    items: ["JavaScript (ES6+)", "HTML5", "CSS3"],
    proficiency: 95,
  },
  {
    category: "Backend",
    icon: "⚙",
    items: ["Node.js", "Express.js", "Django", "Flask"],
    proficiency: 85,
  },
  {
    category: "Frontend",
    icon: "💻",
    items: ["React.js", "Next.js", "Tailwind CSS", "Shadcn"],
    proficiency: 80,
  },
  {
    category: "Database",
    icon: "📦",
    items: ["MongoDB", "PostgreSQL", "Prisma"],
    proficiency: 90,
  },
  {
    category: "DevOps",
    icon: "🛠️",
    items: ["Docker", "Git", "GitLab", "Nginx", "Apache Server"],
    proficiency: 75,
  },
  {
    category: "Cloud",
    icon: "☁",
    items: ["AWS", "GCP", "Azure", "DigitalOcean", "Vultr", "Contabo"],
    proficiency: 95,
  },
  {
    category: "Tools",
    icon: "🔧",
    items: ["Figma", "Canva", "VS Code"],
    proficiency: 70,
  },
  {
    category: "Mobile",
    icon: "📱",
    items: ["React Native (Expo)"],
    proficiency: 60,
  },
];

const CIRCLE_RADIUS = 40;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

// SkillCard component
const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const [offset, setOffset] = useState(CIRCLE_CIRCUMFERENCE);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    const progressOffset =
      CIRCLE_CIRCUMFERENCE - (skill.proficiency / 100) * CIRCLE_CIRCUMFERENCE;
    setOffset(progressOffset);

    let startTimestamp: DOMHighResTimeStamp | null = null;
    const duration = 1000;

    const animateNumber = (timestamp: DOMHighResTimeStamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = (timestamp - startTimestamp) / duration;
      const currentPercentage = Math.min(
        skill.proficiency,
        Math.floor(progress * skill.proficiency)
      );
      setDisplayPercentage(currentPercentage);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);

    const interval = setInterval(() => {
      setDisplayPercentage(() => {
        const newPercentage = Math.min(
          skill.proficiency + Math.random() * 0.5,
          100
        );
        return parseFloat(newPercentage.toFixed(1));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [skill.proficiency]);

  return (
    <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300">
      <div className="relative w-32 h-32 mb-4">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-muted"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={CIRCLE_RADIUS}
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={CIRCLE_CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={CIRCLE_RADIUS}
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold text-primary">
            {displayPercentage}%
          </span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">
        {skill.icon} {skill.category}
      </h3>
      <ul className="text-muted-foreground text-sm space-y-1">
        {skill.items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
};

// Main Skill Page
const SkillPage = () => {
  return (
    <section className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-right">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Skills
          </h1>
          <p className="text-muted-foreground max-w-3xl ml-auto text-base md:text-lg">
            {/* My expertise spans a wide range of technologies and tools, allowing
            me to build robust, scalable, and user-friendly applications. */}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillPage;
