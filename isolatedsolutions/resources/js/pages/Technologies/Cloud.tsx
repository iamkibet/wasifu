import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

import {
   
    Server,
    Database,
    Shield,
    Zap,
    BarChart,
    Globe,
    Settings,
    CloudAlert,
} from "lucide-react";
import MaxWidthWrapper from "../../../ui/MaxWidthWrapper";

export default function Cloud() {
    return (
        <>
            <Head title="Cloud Technologies" />
            <Navbar>
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-2.5 rounded-full text-sm text-red-400 font-medium hover:bg-gray-700 transition-colors">
                                <CloudAlert className="w-5 h-5 animate-pulse" />
                                Cloud Computing Solutions
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                Cloud Technologies
                            </h1>
                            <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                Enterprise-grade cloud solutions for scalable
                                and secure applications
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Technologies Grid */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <MaxWidthWrapper>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* AWS */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Server className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Amazon Web Services (AWS)
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Comprehensive cloud services for scalable
                                    and reliable applications.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        EC2 & Lambda
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        RDS & DynamoDB
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Security & IAM
                                    </li>
                                </ul>
                            </div>

                            {/* Azure */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Server className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Microsoft Azure
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Enterprise cloud platform for modern
                                    applications and services.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Virtual Machines
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        Azure SQL & Cosmos DB
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Azure Security
                                    </li>
                                </ul>
                            </div>

                            {/* Google Cloud */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Server className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Google Cloud Platform (GCP)
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Innovative cloud services powered by
                                    Google's infrastructure.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Compute Engine
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        Cloud SQL & Firestore
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Security & IAM
                                    </li>
                                </ul>
                            </div>

                            {/* Cloud Services */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Settings className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Cloud Services
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Comprehensive cloud solutions for your
                                    business needs.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-red-600" />
                                        CDN & Edge Computing
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-red-600" />
                                        Analytics & Big Data
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Disaster Recovery
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
                                Ready to Move to the Cloud?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Let's help you leverage the power of cloud
                                computing
                            </p>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                    <CloudAlert className="w-5 h-5" />
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
