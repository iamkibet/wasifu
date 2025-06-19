import TypingEffect from '@/components/TypingEffect';
import HomeLayout from '@/Layouts/HomeLayout';
import { Link } from '@inertiajs/react';
import { ArrowDown, CheckCircle2, List, MagnetIcon, PaintbrushIcon, Rocket, Sparkles, SparklesIcon, Upload } from 'lucide-react';

export default function Welcome() {
    const features = [
        {
            title: 'AI-Powered Customization',
            description: 'Our resume builder lets you create a fully personalized resume in minutes using cutting-edge AI technology.',
            icon: SparklesIcon,
        },
        {
            title: 'Smart Bullet Generation',
            description: 'Automatically generate impactful experience bullet points that showcase your professional skills.',
            icon: List,
        },
        {
            title: 'One-Click Formatting',
            description: 'Perfect spacing and margins handled automatically – focus on content while we handle the design.',
            icon: PaintbrushIcon,
        },
        {
            title: 'Instant Export',
            description: 'Download in multiple formats (PDF, Word, Text) and test different templates with a single click.',
            icon: ArrowDown,
        },
        {
            title: 'Industry-Specific Skills',
            description: 'Get tailored skill recommendations based on your job title and target industry.',
            icon: MagnetIcon,
        },
        {
            title: 'Job Search Launchpad',
            description: 'Track applications and optimize your resume performance with built-in analytics.',
            icon: Rocket,
        },
    ];

    const steps = [
        {
            title: 'Your information',
            description:
                'Enter your personal, professional, and educational details once. This data will be securely stored and used to generate tailored resumes and cover letters every time you apply for a job.',
            cta: 'Get Started',
            href: '/templates',
            colorClasses: {
                number: 'group-hover:from-blue-600 group-hover:to-blue-400 dark:group-hover:from-blue-400 dark:group-hover:to-blue-300',
                underline: 'bg-blue-600',
                button: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
                buttonBg: 'from-blue-600 to-blue-400',
                buttonIcon: 'group-hover/button:text-blue-600 dark:group-hover/button:text-blue-400',
                border: 'group-hover:border-blue-600/10 dark:group-hover:border-blue-400/10',
            },
        },
        {
            title: 'Job Description',
            description:
                'Copy and paste the job listing you are applying for. This helps the AI analyze key skills, responsibilities, and keywords to align your resume and cover letter with the role.',
            cta: 'Start Building',
            href: '/builder',
            colorClasses: {
                number: 'group-hover:from-purple-600 group-hover:to-purple-400 dark:group-hover:from-purple-400 dark:group-hover:to-purple-300',
                underline: 'bg-purple-600',
                button: 'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300',
                buttonBg: 'from-purple-600 to-purple-400',
                buttonIcon: 'group-hover/button:text-purple-600 dark:group-hover/button:text-purple-400',
                border: 'group-hover:border-purple-600/10 dark:group-hover:border-purple-400/10',
            },
        },
        {
            title: 'Generate',
            description:
                'Let the AI do the heavy lifting. It will intelligently match your experience to the job requirements and generate a personalized resume and cover letter that stand out. All in minutes!',
            href: '/skills',
            cta: 'Generate',
            colorClasses: {
                number: 'group-hover:from-emerald-600 group-hover:to-emerald-400 dark:group-hover:from-emerald-400 dark:group-hover:to-emerald-300',
                underline: 'bg-emerald-600',
                button: 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300',
                buttonBg: 'from-emerald-600 to-emerald-400',
                buttonIcon: 'group-hover/button:text-emerald-600 dark:group-hover/button:text-emerald-400',
                border: 'group-hover:border-emerald-600/10 dark:group-hover:border-emerald-400/10',
            },
        },
        {
            title: 'Download',
            description:
                'Preview your tailored documents, make any edits if needed, and download them instantly in PDF format. Ready to apply with confidence and professionalism.',
            cta: 'Download',
            href: '/cover-letter',
            colorClasses: {
                number: 'group-hover:from-amber-600 group-hover:to-amber-400 dark:group-hover:from-amber-400 dark:group-hover:to-amber-300',
                underline: 'bg-amber-600',
                button: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
                buttonBg: 'from-amber-600 to-amber-400',
                buttonIcon: 'group-hover/button:text-amber-600 dark:group-hover/button:text-amber-400',
                border: 'group-hover:border-amber-600/10 dark:group-hover:border-amber-400/10',
            },
        },
    ];
    return (
        <HomeLayout title="Welcome">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-white dark:bg-gray-900">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-[radial-gradient(#d97706_0.5px,transparent_0.5px)] [background-size:32px_32px] dark:bg-[radial-gradient(#d97706_1px,transparent_1px)]" />

                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8">
                    <div className="flex flex-col items-center gap-16 space-y-4 lg:flex-row">
                        {/* Left Content */}
                        <div className="max-w-2xl lg:max-w-none">
                            <div className="relative inline-flex items-center justify-center">
                                {/* Gradient background effect */}
                                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-orange-100 to-amber-50 blur-sm transition-all group-hover:blur-md dark:from-orange-900/30 dark:to-amber-900/20" />

                                <p className="group inline-flex items-center gap-2 rounded-full border border-orange-100/50 bg-white/80 px-4 py-1.5 text-sm font-semibold tracking-tight text-amber-600 backdrop-blur-sm transition-all hover:bg-white hover:shadow-sm dark:border-orange-400/20 dark:bg-gray-900/80 dark:text-orange-300 dark:hover:bg-gray-900">
                                    <Sparkles className="h-4 w-4 fill-orange-400/20 stroke-orange-500 transition-all group-hover:fill-orange-400/40 dark:stroke-orange-300" />
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
                                    className="flex items-center justify-center gap-x-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-gray-300 transition-all ring-inset hover:bg-gray-50 sm:px-6 sm:py-4 sm:text-base dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
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
                                <div className="flex flex-col gap-1 pl-3">
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

            <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                {/* Decorative background elements */}
                <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-10">
                    <div className="absolute top-0 left-1/3 h-[600px] w-[600px] -translate-y-1/4 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl dark:from-blue-400/5 dark:to-purple-400/5" />
                    <div className="absolute top-1/2 right-1/4 h-[500px] w-[500px] -translate-y-1/3 rounded-full bg-gradient-to-r from-green-600/10 to-cyan-600/10 blur-3xl dark:from-green-400/5 dark:to-cyan-400/5" />
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Transform Your Job Search with AI
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">Smart features designed to get your resume noticed</p>
                    </div>

                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {/* Feature Cards */}
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group relative rounded-2xl bg-white/50 p-8 backdrop-blur-lg transition-all hover:shadow-sm dark:bg-gray-800/50 dark:ring-white/10 dark:hover:ring-white/20"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-orange-600/80 transition-all duration-300 group-hover:scale-110 group-hover:from-orange-500 group-hover:to-orange-500/80">
                                    <feature.icon className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.description}</p>
                                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-900/50" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
                            className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            View all plans
                        </Link>
                    </div>
                </div>
            </div>
            <section className="relative bg-gray-50 py-24 dark:bg-gray-900">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]" />

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                            Revamp Your Resume in Four Simple Steps
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            Follow our proven 4-step process to create job-winning applications
                        </p>
                    </div>

                    <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-8 lg:grid lg:grid-cols-4 lg:overflow-visible">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="group relative min-w-[300px] flex-1 snap-center rounded-2xl bg-white/50 p-8 shadow-xl ring-1 ring-gray-900/10 backdrop-blur-lg transition-all hover:shadow-2xl lg:min-w-0 dark:bg-gray-800/50 dark:ring-white/10"
                            >
                                {/* Animated Number */}
                                <div className="absolute -top-24 right-0 left-0 h-32 overflow-hidden">
                                    <div className="flex h-full items-end justify-center opacity-60 transition-[transform,opacity] duration-500 group-hover:-translate-y-8 group-hover:opacity-100">
                                        <span
                                            className={`bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-6xl font-black text-transparent transition-colors duration-300 ${step.colorClasses.number} dark:from-gray-400/20 dark:to-gray-400/10`}
                                        >
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="relative z-50">
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                        {step.title}
                                        <span
                                            className={`mt-2 block h-1 w-8 ${step.colorClasses.underline} transition-all duration-300 group-hover:w-16`}
                                        />
                                    </h3>
                                    <p className="mb-6 text-gray-600 dark:text-gray-300">{step.description}</p>
                                    <Link
                                        href={step.href}
                                        className={`group/button inline-flex items-center gap-3 font-semibold transition-all ${step.colorClasses.button}`}
                                    >
                                        <span className="relative overflow-hidden rounded-full p-1">
                                            {/* Animated background */}
                                            <span
                                                className={`absolute inset-0 -z-10 bg-gradient-to-r ${step.colorClasses.buttonBg} opacity-0 transition-opacity group-hover/button:opacity-10`}
                                            />

                                            {/* Animated icon */}
                                            <SparklesIcon
                                                className={`h-5 w-5 transition-transform group-hover/button:translate-x-1 group-hover/button:scale-110 ${step.colorClasses.buttonIcon}`}
                                            />
                                        </span>
                                        <span className="transition-transform group-hover/button:translate-x-1">{step.cta}</span>
                                    </Link>
                                </div>

                                {/* Hover border effect */}
                                <div
                                    className={`pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all ${step.colorClasses.border}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
