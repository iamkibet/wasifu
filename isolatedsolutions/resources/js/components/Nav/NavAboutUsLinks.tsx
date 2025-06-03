import { Link } from '@inertiajs/react';

export default function NavAboutUsLinks() {
    return (
        <>
            <Link href={route('about-us')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">About Us</h3>
                <p className="text-sm text-gray-600">Our story and mission</p>
            </Link>
            <Link href={route('team')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Our Team</h3>
                <p className="text-sm text-gray-600">Meet our experts</p>
            </Link>
            <Link href={route('careers')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Careers</h3>
                <p className="text-sm text-gray-600">Join our team</p>
            </Link>
        </>
    );
}
