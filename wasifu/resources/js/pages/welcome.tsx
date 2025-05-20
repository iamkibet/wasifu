import TypingEffect from '@/Components/TypingEffect';
import HomeLayout from '@/Layouts/HomeLayout';
import { Link } from '@inertiajs/react';
import { CheckCircle2, Download, FileText, Sparkles, StarIcon, Target, Upload } from 'lucide-react';

export default function Welcome() {
    return (
        <HomeLayout title="Welcome">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-white dark:bg-gray-900">
                {/* Decorative Background Elements */}
                <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
                    <svg className="relative left-[50%] h-[64rem] w-[128rem] -translate-x-1/2 text-blue-50 dark:text-gray-800" viewBox="0 0 1155 678">
                        <path
                            fill="currentColor"
                            fillOpacity="0.2"
                            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                        />
                    </svg>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="flex flex-col items-center gap-16 space-y-4 lg:flex-row">
                        {/* Left Content */}
                        <div className="max-w-2xl lg:max-w-none">
                            <div className="relative inline-flex items-center justify-center">
                                {/* Gradient background effect */}
                                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-orange-100 to-amber-50 blur-sm transition-all group-hover:blur-md dark:from-orange-900/30 dark:to-amber-900/20" />

                                <p className="group inline-flex items-center gap-2 rounded-full border border-orange-100/50 bg-white/80 px-4 py-1.5 text-sm font-semibold tracking-tight text-orange-600 backdrop-blur-sm transition-all hover:bg-white hover:shadow-sm dark:border-orange-400/20 dark:bg-gray-900/80 dark:text-orange-300 dark:hover:bg-gray-900">
                                    <StarIcon className="h-4 w-4 fill-orange-400/20 stroke-orange-500 transition-all group-hover:fill-orange-400/40 dark:stroke-orange-300" />
                                    <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent dark:from-orange-300 dark:to-amber-300">
                                        Professional Resume Builder
                                    </span>
                                </p>
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl dark:text-white">
                                Craft Your Career Story
                                <span className="mt-2 block">
                                    <span className="text-orange-600">
                                        <TypingEffect
                                            text="in Minutes"
                                            className="animate-typing-cursor border-r-2 border-r-current pr-1"
                                            typingSpeed={100}
                                            startDelay={500}
                                        />
                                    </span>
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 dark:text-gray-400">
                                Transform your professional experience into a compelling resume that stands out. Our AI-powered platform helps you
                                create polished, ATS-friendly documents that showcase your unique value proposition.
                            </p>

                            {/* CTA Buttons */}
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/builder"
                                    className="bg-primary flex items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700 hover:shadow-md sm:px-6 sm:py-4 sm:text-base"
                                >
                                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Build My Resume Now
                                </Link>
                                <Link
                                    href="/upload"
                                    className="text-slate-800 flex items-center justify-center gap-x-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold shadow-sm ring-1 ring-gray-300 transition-all ring-inset hover:bg-gray-50 sm:px-6 sm:py-4 sm:text-base dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
                                >
                                    <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Upload Existing Resume
                                </Link>
                            </div>
                            <div className="group flex items-center gap-y-4 border-l-4 border-orange-500/20 pl-4 transition-all hover:border-orange-500/40 dark:border-orange-400/20 dark:hover:border-orange-400/40">
                                {/* Experts Avatars */}
                                <div className="my-4 flex -space-x-2">
                                    <img
                                        className="h-6 w-6 rounded-full object-cover ring-2 ring-white transition-all hover:z-10 hover:scale-110 dark:ring-gray-800"
                                        src="/avatar.jpg"
                                        alt="Career expert"
                                    />
                                    <img
                                        className="h-6 w-6 rounded-full object-cover ring-2 ring-white transition-all hover:z-10 hover:scale-110 dark:ring-gray-800"
                                        src="/avatar.jpg"
                                        alt="Career expert"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex pl-3 flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Career Advice Experts</span>
                                        <svg
                                            className="h-4 w-4 text-orange-500 dark:text-orange-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2">
                            
                                
                                <img
                                    src="/hero.webp"
                                    alt="Resume example"
                                    className="w-full rounded-lg border border-gray-200 shadow-lg dark:border-gray-700"
                                />
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base leading-7 font-semibold text-blue-600">Faster Resume Creation</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Everything you need to land your dream job
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Our AI-powered platform helps you create professional resumes and cover letters tailored to your target positions.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-white">
                                    <Sparkles className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                                    AI Tailored Documents
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                    <p className="flex-auto">Our AI analyzes job descriptions and optimizes your resume to match the requirements.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-white">
                                    <FileText className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                                    Easy Profile Builder
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                    <p className="flex-auto">Create and manage your professional profile with our intuitive interface.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-white">
                                    <Download className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                                    Download as PDF
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                    <p className="flex-auto">Export your documents in professional PDF format, ready to submit.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-white">
                                    <Target className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                                    Job-Specific Targeting
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                    <p className="flex-auto">Customize your resume for each job application to maximize your chances.</p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-xl text-center">
                        <h2 className="text-lg leading-8 font-semibold tracking-tight text-blue-600">Testimonials</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Trusted by professionals worldwide
                        </p>
                    </div>
                    <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    content:
                                        'Wasifu helped me land my dream job at a top tech company. The AI-generated resume was perfectly tailored to the position.',
                                    author: 'Sarah Johnson',
                                    role: 'Software Engineer',
                                },
                                {
                                    content:
                                        'The cover letter generator is amazing. It saved me hours of work and helped me stand out in my applications.',
                                    author: 'Michael Chen',
                                    role: 'Product Manager',
                                },
                                {
                                    content:
                                        "I've tried many resume builders, but Wasifu's AI-powered approach is truly revolutionary. Highly recommended!",
                                    author: 'Emily Rodriguez',
                                    role: 'Marketing Director',
                                },
                            ].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800"
                                >
                                    <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                                    <div className="mt-6 flex items-center gap-x-4">
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Preview Section */}
            <div className="bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Affordable plans that grow with your career
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Choose the perfect plan for your needs. Start with our free tier and upgrade as you grow.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                        <div className="rounded-2xl bg-gray-50 p-8 dark:bg-gray-800">
                            <h3 className="text-lg leading-8 font-semibold text-gray-900 dark:text-white">Free Plan</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">Perfect for getting started</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">$0</span>
                                <span className="text-sm leading-6 font-semibold text-gray-600 dark:text-gray-300">/month</span>
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                {['Basic resume templates', 'AI-powered suggestions', 'Limited downloads'].map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckCircle2 className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl bg-blue-600 p-8">
                            <h3 className="text-lg leading-8 font-semibold text-white">Pro Plan</h3>
                            <p className="mt-4 text-sm leading-6 text-blue-200">For serious job seekers</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-white">$19</span>
                                <span className="text-sm leading-6 font-semibold text-blue-200">/month</span>
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-blue-200">
                                {['All Free features', 'Unlimited downloads', 'Premium templates', 'Priority support', 'Advanced AI features'].map(
                                    (feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckCircle2 className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                                            {feature}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/pricing"
                            className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            View all plans
                        </Link>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
