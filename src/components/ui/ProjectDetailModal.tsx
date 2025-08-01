// components/ProjectDetailModal.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface ProjectItem {
  image: string;
  title: string;
  description: string;
  techStack: string[];
  fullDescription?: string;
  githubLink?: string;
  liveDemoLink?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

const ProjectDetailModal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-background text-foreground p-0 overflow-hidden rounded-lg">
        <div className="relative">
          {/* Image */}
          <Image
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
          />

          {/* Close Button */}
          <Button
            variant="ghost"
            className="absolute top-4 right-4 rounded-full"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        {/* Details */}
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription>
              Tech Stack: {project.techStack?.join(", ")}
            </DialogDescription>
          </DialogHeader>

          <p className="mt-4 text-sm text-muted-foreground">
            {project.fullDescription || project.description}
          </p>

          <div className="mt-6 flex gap-4">
            {project.githubLink && (
              <Button asChild>
                <a href={project.githubLink} target="_blank">GitHub</a>
              </Button>
            )}
            {project.liveDemoLink && (
              <Button asChild>
                <a href={project.liveDemoLink} target="_blank">Live Demo</a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
