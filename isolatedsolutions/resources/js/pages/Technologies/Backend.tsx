import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import {
    Code,
    Server,
    Zap,
    Shield,
    BarChart,
    Globe,
    Settings,
    Database,
    Layers,
} from "lucide-react";
import MaxWidthWrapper from "../../../ui/MaxWidthWrapper";

export default function Backend() {
    return (
        <>
            <Head title="Backend Technologies" />
            <Navbar>
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-2.5 rounded-full text-sm text-red-400 font-medium hover:bg-gray-700 transition-colors">
                                <Server className="w-5 h-5 animate-pulse" />
                                Backend Development Solutions
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                Backend Technologies
                            </h1>
                            <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                Powerful backend frameworks and tools for
                                building scalable and secure applications
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Technologies Grid */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <MaxWidthWrapper>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* PHP/Laravel */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    PHP/Laravel
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Modern PHP framework for web artisans.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        MVC Architecture
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        Eloquent ORM
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Security Features
                                    </li>
                                </ul>
                            </div>

                            {/* Node.js */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Node.js
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    JavaScript runtime for server-side
                                    applications.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Express.js Framework
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-red-600" />
                                        NPM Ecosystem
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-red-600" />
                                        Performance & Scalability
                                    </li>
                                </ul>
                            </div>

                            {/* Python/Django */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Python/Django
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    High-level Python web framework for rapid
                                    development.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Django REST Framework
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        ORM & Migrations
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Admin Interface
                                    </li>
                                </ul>
                            </div>

                            {/* Backend Services */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Settings className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Backend Services
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Comprehensive backend development solutions.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Server className="w-5 h-5 text-red-600" />
                                        API Development
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        Database Design
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Security & Authentication
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
                                Ready to Build Your Backend?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Let's create a powerful and scalable backend for
                                your application
                            </p>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                    <Server className="w-5 h-5" />
                                    Start Your Project
                                </button>
                                <button className="group relative flex items-center gap-3 border-2 border-red-500 text-red-500 hover:bg-red-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl">
                                    <Globe className="w-5 h-5" />
                                    View Our Work
                                </button>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>
            </Navbar>
        </>
    );
}
