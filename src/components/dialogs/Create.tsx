"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";


export function Create() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("techStack", form.techStack);
      if (image) formData.append("image", image);

      const res = await axios.post("/api/auth/forum", formData);
      setSuccess("Project uploaded successfully!");
      console.log(res.data);

      // Optionally reset form
      setForm({ title: "", description: "", techStack: "" });
      setImage(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Something went wrong.");
      } else {
        setError("Unexpected error occurred.");
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Project</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Upload Your Project</DialogTitle>
            <DialogDescription>
              Fill in the details of your project and click submit.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="Enter project title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                required
                value={form.description}
                onChange={handleChange}
                placeholder="Short project description"
              />
            </div>

            <div>
              <Label htmlFor="techStack">Tech Stack</Label>
              <Input
                id="techStack"
                name="techStack"
                required
                value={form.techStack}
                onChange={handleChange}
                placeholder="e.g. React, Next.js, MongoDB"
              />
            </div>

            <div>
              <Label htmlFor="image">Project Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>

          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Create;
