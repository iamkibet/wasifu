import { Head, Link } from '@inertiajs/react';
import { CreditCard, FileCheck, FileText, Home, LogIn, PenTool, Sparkles, UserPlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HomeLayout({ children, title }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Builders', href: '/', icon: Home },
        { name: 'Resumes', href: '/features', icon: FileText },
        { name: 'Cover Letters', href: '/plan', icon: PenTool },
        { name: 'CVs', href: '/login', icon: FileCheck },
        { name: 'Pricing', href: '/login', icon: CreditCard },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <Head title={title} />

            {/* Modern Navbar */}
            <nav
                className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                    isScrolled ? 'bg-white shadow-sm dark:bg-gray-900' : 'bg-transparent'
                }`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-orange-500">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">Wasifu</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-gray-700 transition-colors hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-4">
                            <Link
                                href="/login"
                                className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-full bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 lg:hidden dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <div className="h-6 w-6">
                                    <div className="h-0.5 w-6 bg-current"></div>
                                    <div className="mt-1.5 h-0.5 w-6 bg-current"></div>
                                    <div className="mt-1.5 h-0.5 w-6 bg-current"></div>
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`transition-all duration-300 ease-in-out lg:hidden ${
                        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                    }`}
                >
                    <div
                        className={`space-y-1 px-2 pt-2 pb-3 ${
                            isScrolled ? 'bg-white dark:bg-gray-900' : 'bg-white/95 backdrop-blur-sm dark:bg-gray-900/95'
                        } shadow-lg`}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                        <div className="mt-4 space-y-2 px-3">
                            <Link
                                href="/login"
                                className="flex w-full items-center justify-center space-x-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LogIn className="h-4 w-4" />
                                <span>Login</span>
                            </Link>
                            <Link
                                href="/register"
                                className="flex w-full items-center justify-center space-x-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <UserPlus className="h-4 w-4" />
                                <span>Get Started</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content with padding for navbar */}
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
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

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
