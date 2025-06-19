import AppLayout from '@/layouts/app-layout';
import { Profile } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
    profile: Profile;
}

export default function Show({ profile }: Props) {
    return (
        <AppLayout>
           
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="text-3xl font-bold">{profile.full_name}</h1>
                                <Link
                                    href={route('profile.edit', profile.id)}
                                    className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                                >
                                    Edit Profile
                                </Link>
                            </div>

                            <div className="space-y-8">
                                <section>
                                    <h2 className="mb-4 text-2xl font-semibold">Professional Summary</h2>
                                    <p className="text-gray-700">{profile.professional_summary}</p>
                                </section>

                                <section>
                                    <h2 className="mb-4 text-2xl font-semibold">Work Experience</h2>
                                    <div className="space-y-4">
                                        {profile.work_experience.map((exp, index) => (
                                            <div key={index} className="border-l-4 border-blue-500 pl-4">
                                                <h3 className="text-xl font-semibold">{exp.position}</h3>
                                                <p className="text-gray-600">{exp.company}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(exp.start_date).toLocaleDateString()} - {new Date(exp.end_date).toLocaleDateString()}
                                                </p>
                                                <p className="mt-2">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h2 className="mb-4 text-2xl font-semibold">Education</h2>
                                    <div className="space-y-4">
                                        {profile.education.map((edu, index) => (
                                            <div key={index} className="border-l-4 border-green-500 pl-4">
                                                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                                                <p className="text-gray-600">{edu.institution}</p>
                                                <p className="text-sm text-gray-500">
                                                    {edu.field} • Graduated: {new Date(edu.graduation_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.skills.map((skill, index) => (
                                            <span key={index} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </section>

                                {profile.certifications && profile.certifications.length > 0 && (
                                    <section>
                                        <h2 className="mb-4 text-2xl font-semibold">Certifications</h2>
                                        <ul className="list-inside list-disc space-y-2">
                                            {profile.certifications.map((cert, index) => (
                                                <li key={index} className="text-gray-700">
                                                    {cert}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
          
        </AppLayout>
    );
}
