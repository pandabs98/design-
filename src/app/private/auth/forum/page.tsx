"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type ForumPost = {
  _id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
};

const ForumPage = () => {
  const [data, setData] = useState<ForumPost[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/auth/forum");
        setData(res.data.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load posts");
        setData([]); // show blank if failed
      }
    };

    fetchPosts();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!data || data.length === 0) return <>{""}</>; // return blank string

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Forum Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.description}</p>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-500">Tech:</span>
                <ul className="flex flex-wrap gap-2 mt-1">
                  {post.techStack.map((tech, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
