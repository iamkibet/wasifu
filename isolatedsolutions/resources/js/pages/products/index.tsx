import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Products() {
    return (
        <MainLayout>
            <Head title="Our Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold">Our Products</h1>
                    <p className="mt-4 text-lg text-gray-600">Discover our innovative solutions designed to transform your business.</p>
                </div>
            </div>
        </MainLayout>
    );
}
