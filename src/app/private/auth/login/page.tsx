"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post('/api/auth/login', form);
      setSuccess(res.data.message);
      console.log("Login successful:", res.data);

      router.push('/private/auth/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Login failed");
        console.error("Login failed:", err.response?.data);
      } else {
        setError("An unexpected error occurred");
        console.error("Unexpected error:", err);
      }
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-foreground">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-600">{success}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
