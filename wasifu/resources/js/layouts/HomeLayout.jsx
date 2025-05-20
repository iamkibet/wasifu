import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Head, Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function HomeLayout({ children, title }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <Head title={title} />

            {/* Floating Navigation */}
            <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Animated Logo */}
                        <div className="flex-shrink-0">
                            <Link
                                href="/"
                                className="group flex items-center text-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-2xl text-transparent"
                            >
                                Wa
                                <span className="font-bold ">
                                    Sifu
                                </span>
                                <span className="h-2 w-2 rounded-full bg-orange-600 group-hover:animate-pulse dark:bg-purple-400"></span>
                            </Link>
                        </div>

                        {/* Desktop Navigation with Hover Effects */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-6">
                                <NavLink href="/">Builders</NavLink>
                                <NavLink href="/features">Resumes</NavLink>
                                <NavLink href="/plan">Cover Letters</NavLink>

                                <NavLink href="/login">CVs</NavLink>
                                <NavLink href="/login">Pricing</NavLink>
                                <Link className="rounded-lg bg-orange-600 px-4 py-2 text-white">
                                    <span className="relative z-10">Get Started</span>
                                    <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 transition-opacity hover:opacity-20"></div>
                                </Link>
                            </div>
                        </div>

                        {/* Modern Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                                ) : (
                                    <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Animated Mobile Menu */}
                <div className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="space-y-4 bg-white px-4 pt-2 pb-8 dark:bg-gray-900">
                        <MobileNavLink href="/">Builders</MobileNavLink>
                        <MobileNavLink href="/features">Resumes</MobileNavLink>
                        <MobileNavLink href="/pricing">CVs</MobileNavLink>
                        <MobileNavLink href="/login">Login</MobileNavLink>
                        <Link
                            href="/register"
                            className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-center font-medium text-white transition-all hover:from-blue-700 hover:to-purple-700"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content with Subtle Animation */}
            <main className="animate-fade-in-up pt-16">{children}</main>

            {/* Modern Gradient Footer */}
            <footer className="mt-24 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50 dark:border-gray-800 dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Product</h3>
                            <FooterLink href="/features">Features</FooterLink>
                            <FooterLink href="/pricing">Pricing</FooterLink>
                            <FooterLink href="/changelog">Changelog</FooterLink>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
                            <FooterLink href="/about">About</FooterLink>
                            <FooterLink href="/blog">Blog</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
                            <FooterLink href="/privacy">Privacy</FooterLink>
                            <FooterLink href="/terms">Terms</FooterLink>
                            <FooterLink href="/security">Security</FooterLink>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h3>
                            <FooterLink href="https://twitter.com">Twitter</FooterLink>
                            <FooterLink href="https://linkedin.com">LinkedIn</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-100 pt-8 dark:border-gray-800">
                        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                            <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Wasifu. All rights reserved.</p>
                            <div className="flex space-x-6">
                                <button className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        {/* Twitter icon */}
                                    </svg>
                                </button>
                                {/* Add other social icons */}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Reusable styled components
const NavLink = ({ href, children }) => (
    <Link
        href={href}
        className="relative text-gray-600 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:text-gray-900 hover:after:w-full dark:text-gray-300 dark:hover:text-white"
    >
        {children}
    </Link>
);

const MobileNavLink = ({ href, children }) => (
    <Link
        href={href}
        className="block rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    >
        {children}
    </Link>
);

const FooterLink = ({ href, children }) => (
    <Link
        href={href}
        className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    >
        <span>{children}</span>
        <svg className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </Link>
);
