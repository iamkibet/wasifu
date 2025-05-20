import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageSquare, Phone, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <MessageSquare className="text-primary h-6 w-6" />
                            <span className="text-xl font-bold">BulkBee</span>
                        </div>
                        <p className="text-gray-600">
                            Your all-in-one solution for bulk SMS and email marketing. Reach your audience effectively and efficiently.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Product</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                                    API
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                                    Integrations
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Contact Us</h3>
                        <ul className="mt-4 space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <span className="text-base text-gray-600">Nairobi, Kenya</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Phone className="h-5 w-5 text-gray-400" />
                                <span className="text-base text-gray-600">+254 700 000 000</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <span className="text-base text-gray-600">support@bulkbee.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        <Link href="#" className="text-gray-400 hover:text-gray-500">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-500">
                            Terms of Service
                        </Link>
                    </div>
                    <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">&copy; {new Date().getFullYear()} BulkBee. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
