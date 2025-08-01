"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const [details, setDetails] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle Submit
  async function handleSubmit() {
  setError("");
  setSuccess("");

  if (!details.name || !details.email || !details.message) {
    setError("All fields are required.");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("/api/auth/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Something went wrong");
    }

    setSuccess("Message submitted successfully!");
    setDetails({ name: "", email: "", message: "" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Something went wrong.");
    }
  } finally {
    setLoading(false);
  }
}

  return (
    <section className=" body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
            Contact Us
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Tell us what help you need from us.
          </p>
        </div>

        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            {/* Name */}
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={details.name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3"
                />
              </div>
            </div>

            {/* Email */}
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3"
                />
              </div>
            </div>

            {/* Message */}
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={details.message}
                  onChange={handleChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-2 w-full">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>

            {/* Message */}
            <div className="w-full text-center mt-4">
              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm font-medium">{success}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
