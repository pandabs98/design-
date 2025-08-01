"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProjectDetailModal from "@/components/ui/ProjectDetailModal";
import Image from "next/image";

// Define the type for a project
type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
};

const WorkPage = () => {
  const [data, setData] = useState<Project[]>([]);
  const [error, setError] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/auth/forum");
        setData(response.data.data || []);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch data";
        setError(message);
      }
    };
    fetchData();
  }, []);

  if (!mounted) return null;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!data || data.length === 0)
    return <div className="text-center">No Projects Found</div>;

  return (
    <>
      {/* Modal Render */}
      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      {/* Project Cards */}
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">My Work</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.02 }}
              className="p-4 flex flex-col justify-between rounded-xl dark:bg-neutral-900 shadow-md hover:shadow-lg cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={240}
                className="h-60 w-full object-cover rounded-lg mb-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm mb-2">
                  {item.description.length > 100
                    ? item.description.slice(0, 100) + "..."
                    : item.description}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Tech Stack: {item.techStack.join(", ")}
                </p>
              </div>
              <Button
                className="w-full mt-auto"
                onClick={() => setSelectedProject(item)}
              >
                Know More
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkPage;
