import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import MaxWidthWrapper from "@/ui/MaxWidthWrapper";
import { Link } from "@inertiajs/react";

export default function WorkIndex() {
    return (
        <>
            <Head title="Our Work" />
            <Navbar>
                <MaxWidthWrapper>
                    <div className="py-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-8">
                            Our Work
                        </h1>

                        {/* Portfolio Section */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                                Featured Projects
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Project 1 */}
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="h-48 bg-gray-200"></div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            E-commerce Platform
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            A modern e-commerce solution with
                                            advanced features.
                                        </p>
                                        <Link
                                            href={route("work.portfolio")}
                                            className="text-red-600 hover:text-red-700 font-medium"
                                        >
                                            View Project →
                                        </Link>
                                    </div>
                                </div>

                                {/* Project 2 */}
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="h-48 bg-gray-200"></div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Mobile Banking App
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Secure and user-friendly banking
                                            application.
                                        </p>
                                        <Link
                                            href={route("work.portfolio")}
                                            className="text-red-600 hover:text-red-700 font-medium"
                                        >
                                            View Project →
                                        </Link>
                                    </div>
                                </div>

                                {/* Project 3 */}
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="h-48 bg-gray-200"></div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Learning Management System
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Comprehensive educational platform.
                                        </p>
                                        <Link
                                            href={route("work.portfolio")}
                                            className="text-red-600 hover:text-red-700 font-medium"
                                        >
                                            View Project →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Case Studies Section */}
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                                Case Studies
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Case Study 1 */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Digital Transformation Success
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        How we helped a traditional business go
                                        digital.
                                    </p>
                                    <Link
                                        href={route("work.case-studies")}
                                        className="text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Read Case Study →
                                    </Link>
                                </div>

                                {/* Case Study 2 */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Cloud Migration Journey
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Seamless transition to cloud
                                        infrastructure.
                                    </p>
                                    <Link
                                        href={route("work.case-studies")}
                                        className="text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Read Case Study →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </Navbar>
        </>
    );
}
