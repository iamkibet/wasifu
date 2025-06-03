import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import MaxWidthWrapper from "@/ui/MaxWidthWrapper";
import {
    Smartphone,
    Code,
    Layers,
    Zap,
    Shield,
    BarChart,
    Globe,
    Settings,
} from "lucide-react";

export default function Mobile() {
    return (
        <>
            <Head title="Mobile Development Technologies" />
            <Navbar>
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-2.5 rounded-full text-sm text-red-400 font-medium hover:bg-gray-700 transition-colors">
                                <Smartphone className="w-5 h-5 animate-pulse" />
                                Mobile Development Solutions
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                Mobile Technologies
                            </h1>
                            <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                Native and cross-platform mobile development
                                solutions for iOS and Android
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Technologies Grid */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <MaxWidthWrapper>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* iOS Development */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    iOS Development
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Native iOS app development using Swift and
                                    modern iOS frameworks.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Swift & SwiftUI
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        iOS Security
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-red-600" />
                                        App Store Optimization
                                    </li>
                                </ul>
                            </div>

                            {/* Android Development */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Android Development
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Native Android app development using Kotlin
                                    and modern Android frameworks.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Kotlin & Jetpack
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Android Security
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-red-600" />
                                        Play Store Optimization
                                    </li>
                                </ul>
                            </div>

                            {/* React Native */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Layers className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    React Native
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Cross-platform mobile development using
                                    React Native framework.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        JavaScript/TypeScript
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-red-600" />
                                        Cross-platform UI
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-red-600" />
                                        Native Modules
                                    </li>
                                </ul>
                            </div>

                            {/* Flutter */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Layers className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Flutter
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Cross-platform mobile development using
                                    Flutter framework.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Dart Programming
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-red-600" />
                                        Material Design
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-red-600" />
                                        Platform Channels
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
                                Ready to Build Your Mobile App?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Let's create a powerful mobile experience for
                                your users
                            </p>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                    <Smartphone className="w-5 h-5" />
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
