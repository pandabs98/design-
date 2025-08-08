"use client";

import React from "react";

const AboutPage = () => {
    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-inter text-foreground bg-background">
            <div className="max-w-7xl mx-auto">
                {/* ABOUT AHSAAS Section */}
                <section className="mb-20">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 flex items-center">
                        About Ahsaas
                        <span className="ml-4 h-1 w-24 bg-primary rounded-full"></span>
                    </h1>
                    <p className="text-lg sm:text-xl leading-relaxed max-w-4xl text-muted-foreground">
                        Ahsaas is a lively and mischievous individual known for his energetic personality and curious mind. He has a deep passion for sports, especially football and cricket, which fuel his competitive spirit and team-oriented mindset.
                        <br /><br />
                        Beyond the field, Ahsaas has a strong interest in technology, particularly in coding and ethical hacking. He enjoys solving complex problems, exploring new tools, and constantly pushes himself to stay ahead in the digital world.
                        <br /><br />
                        A lifelong learner at heart, Ahsaas is always eager to acquire new skills, whether it's in tech, sports, or everyday life. His enthusiasm for learning, combined with his playful nature, makes him both a fun companion and a driven individual.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;