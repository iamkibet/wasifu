import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import {
    Lightbulb,
    Cloud,
    Globe,
    Zap,
    Shield,
    BarChart,
    Settings,
    Server,
} from "lucide-react";
import MaxWidthWrapper from "../../../ui/MaxWidthWrapper";

export default function Consulting() {
    return (
        <>
            <Head title="Digital Consulting Services" />
            <Navbar>
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-2.5 rounded-full text-sm text-red-400 font-medium hover:bg-gray-700 transition-colors">
                                <Lightbulb className="w-5 h-5 animate-pulse" />
                                Strategic Digital Solutions
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                Digital Consulting
                            </h1>
                            <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                Expert guidance to transform your business
                                through technology and innovation
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
                                    <Lightbulb className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Digital Transformation
                                </h3>
                                <p className="text-gray-600">
                                    Strategic guidance to modernize your
                                    business operations and technology stack.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Cloud className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Cloud Migration
                                </h3>
                                <p className="text-gray-600">
                                    Seamless transition to cloud infrastructure
                                    with minimal disruption.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Settings className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    App Consulting
                                </h3>
                                <p className="text-gray-600">
                                    Expert advice on application architecture,
                                    development, and optimization.
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
                                Comprehensive Consulting Services
                            </h2>
                            <p className="text-base lg:text-lg text-slate-600 py-4 max-w-2xl mx-auto">
                                Strategic technology consulting to drive your
                                business forward
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 p-8 rounded-xl">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Digital Strategy
                                </h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-red-600" />
                                        Technology assessment
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Digital roadmap planning
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Security consulting
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-xl">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Infrastructure Services
                                </h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Server className="w-5 h-5 text-red-600" />
                                        Cloud architecture
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-red-600" />
                                        Web hosting solutions
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Cloud className="w-5 h-5 text-red-600" />
                                        Migration services
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
                                Ready to Transform Your Business?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Let's discuss your digital transformation
                                journey
                            </p>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                    <Lightbulb className="w-5 h-5" />
                                    Schedule Consultation
                                </button>
                                <button className="group relative flex items-center gap-3 border-2 border-red-500 text-red-500 hover:bg-red-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl">
                                    <Globe className="w-5 h-5" />
                                    View Case Studies
                                </button>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>
            </Navbar>
        </>
    );
}
