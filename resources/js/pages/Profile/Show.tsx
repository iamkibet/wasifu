import AppLayout from '@/layouts/app-layout';
import { Profile } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    Phone, 
    Mail, 
    MapPin, 
    Edit3, 
    Building,
    GraduationCap,
    Award,
    Code,
    FileText
} from 'lucide-react';

interface Props {
    profile: Profile;
}

export default function Show({ profile }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Profile', href: '/profile' },
        { title: 'View Profile', href: `/profile/${profile.id}` }
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    const calculateDuration = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        
        if (diffMonths < 12) {
            return `${diffMonths} months`;
        } else {
            const years = Math.floor(diffMonths / 12);
            const months = diffMonths % 12;
            return months > 0 ? `${years}y ${months}m` : `${years} years`;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${profile.full_name} - Profile`} />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-orange-900/10">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* CV Header */}
                    <div className="mb-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                        <div className="p-8">
                            {/* Action Buttons */}
                            <div className="mb-6 flex justify-end">
                                <Link
                                    href={route('profile.edit', profile.id)}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
                                >
                                    <Edit3 className="h-4 w-4" />
                                    Edit Profile
                                </Link>
                            </div>

                            {/* Personal Information */}
                            <div className="text-center mb-8">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30">
                                    <FileText className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {profile.full_name}
                                </h1>
                                
                                {/* Contact Information */}
                                <div className="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-400">
                                    {profile.phone_number && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            <span className="text-sm">{profile.phone_number}</span>
                                        </div>
                                    )}
                                    {profile.email && (
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            <span className="text-sm">{profile.email}</span>
                                        </div>
                                    )}
                                    {profile.address && (
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-sm">{profile.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Professional Summary */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                        <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    Professional Summary
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {profile.professional_summary}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CV Content */}
                    <div className="space-y-6">
                        {/* Work Experience */}
                        <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                            <div className="p-6">
                                <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                        <Building className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    Work Experience
                                </h2>
                                <div className="space-y-6">
                                    {profile.work_experience.map((exp, index) => (
                                        <div key={index} className="relative pl-6 border-l-2 border-orange-200 dark:border-orange-800">
                                            <div className="absolute -left-2 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500">
                                                <div className="h-2 w-2 rounded-full bg-white"></div>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {exp.position}
                                                    </h3>
                                                    <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                                                        {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Building className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{exp.company}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        • {calculateDuration(exp.start_date, exp.end_date)}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                    {exp.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                            <div className="p-6">
                                <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                        <GraduationCap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    Education
                                </h2>
                                <div className="space-y-4">
                                    {profile.education.map((edu, index) => (
                                        <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {edu.degree}
                                                </h3>
                                                <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                                                    {formatDate(edu.graduation_date)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                <span className="text-gray-700 dark:text-gray-300 font-medium">{edu.institution}</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                                {edu.field}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                            <div className="p-6">
                                <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                        <Code className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    Skills
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {profile.skills.map((skill, index) => (
                                        <span 
                                            key={index} 
                                            className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 px-4 py-2 text-sm font-medium text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Certifications */}
                        {profile.certifications && profile.certifications.length > 0 && (
                            <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                                <div className="p-6">
                                    <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                            <Award className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        Certifications
                                    </h2>
                                    <div className="space-y-3">
                                        {profile.certifications.map((cert, index) => (
                                            <div key={index} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                                    <Award className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300 font-medium">{cert}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
