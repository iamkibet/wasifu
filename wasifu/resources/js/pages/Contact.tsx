import HomeLayout from '@/Layouts/HomeLayout';
import { useForm } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <HomeLayout title="Contact Us">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base leading-7 font-semibold text-blue-600">Contact Us</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Get in touch with our team</p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Have questions about our service? We're here to help. Send us a message and we'll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Send us a message</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="flex flex-col gap-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm leading-6 font-medium text-gray-900 dark:text-white">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                                        />
                                        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm leading-6 font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                                        />
                                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm leading-6 font-medium text-gray-900 dark:text-white">
                                        Subject
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="subject"
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                                        />
                                        {errors.subject && <p className="mt-2 text-sm text-red-600">{errors.subject}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm leading-6 font-medium text-gray-900 dark:text-white">
                                        Message
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            name="message"
                                            id="message"
                                            rows={4}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                                        />
                                        {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                                    >
                                        Send message
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="rounded-2xl bg-gray-50 p-8 dark:bg-gray-800">
                                <h3 className="text-base leading-7 font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                                <dl className="mt-6 space-y-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                                    <div className="flex gap-x-4">
                                        <dt className="flex-none">
                                            <span className="sr-only">Address</span>
                                            <MapPin className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>
                                            123 Resume Street
                                            <br />
                                            San Francisco, CA 94107
                                        </dd>
                                    </div>
                                    <div className="flex gap-x-4">
                                        <dt className="flex-none">
                                            <span className="sr-only">Telephone</span>
                                            <Phone className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>
                                            <a href="tel:+1 (555) 234-5678" className="hover:text-gray-900 dark:hover:text-white">
                                                +1 (555) 234-5678
                                            </a>
                                        </dd>
                                    </div>
                                    <div className="flex gap-x-4">
                                        <dt className="flex-none">
                                            <span className="sr-only">Email</span>
                                            <Mail className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>
                                            <a href="mailto:support@wasifu.com" className="hover:text-gray-900 dark:hover:text-white">
                                                support@wasifu.com
                                            </a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-8 dark:bg-gray-800">
                                <h3 className="text-base leading-7 font-semibold text-gray-900 dark:text-white">Business Hours</h3>
                                <dl className="mt-6 space-y-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                                    <div>
                                        <dt className="font-semibold">Monday - Friday</dt>
                                        <dd>9:00 AM - 6:00 PM PST</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold">Saturday</dt>
                                        <dd>10:00 AM - 4:00 PM PST</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold">Sunday</dt>
                                        <dd>Closed</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
