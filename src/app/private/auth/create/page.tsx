"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const UploadPage = () => {
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
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Something went wrong.");
      } else {
        setError("Unexpected error occurred.");
      }
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-foreground">
          Upload your project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              required
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>

          {/* Image File */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="techStack"
            >
              Tech Stack
            </label>
            <input
              type="text"
              id="techStack"
              name="techStack"
              placeholder="e.g., React, Node.js, MongoDB"
              required
              value={form.techStack}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>

          <Button type="submit" className="w-full my-5">
            Submit
          </Button>
        </form>

        {success && <p className="text-green-600 mt-2">{success}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default UploadPage;
