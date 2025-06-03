import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const missionRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Mission section animation
        gsap.from(missionRef.current, {
            scrollTrigger: {
                trigger: missionRef.current,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        // Team section animations
        const teamMembers = teamRef.current?.querySelectorAll('.team-member');
        teamMembers?.forEach((member, index) => {
            gsap.from(member, {
                scrollTrigger: {
                    trigger: member,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power3.out',
            });
        });

        // Values section animations
        const values = valuesRef.current?.querySelectorAll('.value');
        values?.forEach((value, index) => {
            gsap.from(value, {
                scrollTrigger: {
                    trigger: value,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power3.out',
            });
        });
    }, []);

    return (
        <MainLayout>
            <Head title="About - Isolated Solutions" />

            {/* Mission Section */}
            <section
                ref={missionRef}
                className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6 py-20 dark:from-black dark:to-gray-900"
            >
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="mb-8 text-4xl font-bold md:text-5xl">Our Mission</h1>
                    <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                        At Isolated Solutions, we're dedicated to transforming businesses through innovative digital solutions. We believe in creating
                        technology that not only solves problems but also inspires and empowers.
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section ref={teamRef} className="bg-white px-6 py-20 dark:bg-black">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-16 text-center text-4xl font-bold">Meet Our Team</h2>
                    <div className="grid gap-12 md:grid-cols-3">
                        <div className="team-member text-center">
                            <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white">
                                JD
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">John Doe</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">CEO & Founder</p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Visionary leader with 15+ years of experience in digital transformation.
                            </p>
                        </div>
                        <div className="team-member text-center">
                            <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-4xl font-bold text-white">
                                JS
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Jane Smith</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">CTO</p>
                            <p className="text-gray-600 dark:text-gray-300">Tech innovator specializing in scalable architecture and AI solutions.</p>
                        </div>
                        <div className="team-member text-center">
                            <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-blue-600 text-4xl font-bold text-white">
                                MJ
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Mike Johnson</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">Lead Designer</p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Award-winning designer focused on creating exceptional user experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section ref={valuesRef} className="bg-gray-50 px-6 py-20 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-16 text-center text-4xl font-bold">Our Values</h2>
                    <div className="grid gap-12 md:grid-cols-2">
                        <div className="value rounded-xl bg-white p-8 dark:bg-black">
                            <h3 className="mb-4 text-2xl font-semibold">Innovation</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.
                            </p>
                        </div>
                        <div className="value rounded-xl bg-white p-8 dark:bg-black">
                            <h3 className="mb-4 text-2xl font-semibold">Excellence</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                We strive for excellence in everything we do, from code quality to user experience.
                            </p>
                        </div>
                        <div className="value rounded-xl bg-white p-8 dark:bg-black">
                            <h3 className="mb-4 text-2xl font-semibold">Collaboration</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                We believe in the power of teamwork and close collaboration with our clients.
                            </p>
                        </div>
                        <div className="value rounded-xl bg-white p-8 dark:bg-black">
                            <h3 className="mb-4 text-2xl font-semibold">Integrity</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                We maintain the highest standards of integrity in all our business practices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
