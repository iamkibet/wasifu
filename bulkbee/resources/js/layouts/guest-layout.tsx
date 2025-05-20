import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const GuestLayout = ({ children }: Props) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default GuestLayout;
