import { Head, Link } from '@inertiajs/react';
import { CreditCard, FileCheck, FileText, Home, LogIn, PenTool, Sparkles, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HomeLayout({ children, title }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
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

            {/* Floating Navigation Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:from-orange-500 dark:to-orange-400 ${
                    isMenuOpen ? 'rotate-45' : ''
                }`}
            >
                <div className="relative">
                    <Sparkles className="h-8 w-8 text-white" />
                    <div
                        className={`absolute inset-0 h-full w-full rounded-full bg-white/20 transition-all duration-300 ${isMenuOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
                    />
                </div>
            </button>

            {/* Floating Navigation Menu */}
            <div
                className={`fixed right-6 bottom-24 z-40 flex flex-col items-end space-y-4 transition-all duration-300 ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
                }`}
            >
                {navItems.map((item, index) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 ${
                            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                    >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white transition-transform group-hover:scale-110">
                            <item.icon className="h-4 w-4" />
                        </div>
                    </Link>
                ))}

                {/* Auth Buttons */}
                <div
                    className={`flex gap-3 transition-all duration-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: `${navItems.length * 50}ms` }}
                >
                    <Link
                        href="/login"
                        className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        <LogIn className="h-4 w-4" />
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
                    >
                        <UserPlus className="h-4 w-4" />
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="animate-fade-in-up">{children}</main>

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
