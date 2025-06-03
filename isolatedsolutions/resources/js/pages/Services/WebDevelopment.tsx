import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { Code, Globe, Layout, Zap, Shield, Clock } from "lucide-react";
import MaxWidthWrapper from "../../../ui/MaxWidthWrapper";

export default function WebDevelopment() {
    return (
        <>
            <Head title="Web Development Services" />
            <Navbar>
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-2.5 rounded-full text-sm text-red-400 font-medium hover:bg-gray-700 transition-colors">
                                <Zap className="w-5 h-5 animate-pulse" />
                                Custom Web Solutions
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                Web Development
                            </h1>
                            <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                Transform your digital presence with our
                                cutting-edge web development solutions
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <MaxWidthWrapper>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Custom Development
                                </h3>
                                <p className="text-gray-600">
                                    Tailored web solutions built from scratch to
                                    meet your specific business requirements.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Globe className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Responsive Design
                                </h3>
                                <p className="text-gray-600">
                                    Mobile-first approach ensuring perfect
                                    display across all devices and screen sizes.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Layout className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Modern UI/UX
                                </h3>
                                <p className="text-gray-600">
                                    Intuitive interfaces and seamless user
                                    experiences that drive engagement.
                                </p>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Services Grid */}
                <section className="py-20 bg-white">
                    <MaxWidthWrapper>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:font-extrabold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                                Our Web Development Services
                            </h2>
                            <p className="text-base lg:text-lg text-slate-600 py-4 max-w-2xl mx-auto">
                                Comprehensive web solutions to elevate your
                                digital presence
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 p-8 rounded-xl">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Website Development
                                </h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Secure and scalable architecture
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-red-600" />
                                        Fast loading and performance
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        SEO-friendly structure
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-xl">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Web Application Development
                                </h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        Custom functionality
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-red-600" />
                                        Cross-platform compatibility
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Enterprise-grade security
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
                    <MaxWidthWrapper>
                        <div className="text-center space-y-8">
                            <h2 className="text-4xl font-bold text-white">
                                Ready to Transform Your Web Presence?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Let's create something extraordinary together
                            </p>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                    <Zap className="w-5 h-5" />
                                    Start Your Project
                                </button>
                                <button className="group relative flex items-center gap-3 border-2 border-red-500 text-red-500 hover:bg-red-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl">
                                    <Globe className="w-5 h-5" />
                                    View Our Portfolio
                                </button>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>
            </Navbar>
        </>
    );
}
