"use client";

import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-7xl mx-auto">
                {/* ABOUT ME Section */}
                <section className="mb-20">
                    <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold mb-8 flex items-center">
                        ABOUT ME
                        <span className="ml-4 h-1 w-24 rounded-full"></span>
                    </h1>
                    <p className="text-lg sm:text-l leading-relaxed max-w-3xl">
                        Hi, I&apos;m Riya Riya, a passionate and detail-oriented Full Stack Developer with a relentless drive for solving problems and building efficient, modern web applications.

                        Coding isn&apos;t just my job — it&apos;s my core passion. I dedicate my time to improving my skills, understanding systems deeply, and creating powerful applications that serve real-world needs. Whether it&apos;s writing scalable backend logic, crafting seamless user interfaces, or debugging complex issues, I thrive in the process of turning ideas into working software.

                        I specialize in technologies like Next.js, React, Node.js, and MongoDB, and I&apos;m always pushing myself to explore better architectures, cleaner code, and smarter solutions. No distractions, no split focus — just one goal: to build and solve through code.
                    </p>
                </section>

                {/* What I Do Section */}
                <section className="flex flex-col items-start lg:items-end text-left lg:text-right">
                    <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold mb-8 flex items-center lg:flex-row-reverse">
                        What I Do
                        <span className="mr-4 lg:ml-4 h-1 w-24 rounded-full"></span>
                    </h2>
                    <p className="text-lg sm:text-l leading-relaxed max-w-3xl mb-7">
                        I build clean, responsive full-stack web apps and craft modern, user-friendly designs that align with your brand&apos;s vision. From scalable backend systems to intuitive UIs and eye-catching graphics, I turn ideas into powerful digital experiences — fast, functional, and visually compelling.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
