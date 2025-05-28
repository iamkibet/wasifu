import AppLayout from '@/layouts/app-layout';
import { Profile } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface Props {
    profile: Profile;
    profileCompletion: number;
}

interface PageProps {
    flash?: {
        success?: string;
    };
    [key: string]: unknown;
}

export default function Edit({ profile, profileCompletion }: Props) {
    const { flash } = usePage<PageProps>().props;
    const { data, setData, patch, processing, errors } = useForm<Partial<Profile>>({
        full_name: profile.full_name,
        professional_summary: profile.professional_summary,
        work_experience: profile.work_experience,
        education: profile.education,
        skills: profile.skills,
        certifications: profile.certifications,
    });

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('profile.update', profile.id), {
            onSuccess: () => {
                toast.success('Profile updated successfully');
                router.visit(route('profile.index'));
            },
        });
    };

    const addWorkExperience = () => {
        setData('work_experience', [...data.work_experience!, { company: '', position: '', start_date: '', end_date: '', description: '' }]);
    };

    const addEducation = () => {
        setData('education', [...data.education!, { institution: '', degree: '', field: '', graduation_date: '' }]);
    };

    const addSkill = () => {
        setData('skills', [...data.skills!, '']);
    };

    const addCertification = () => {
        setData('certifications', [...data.certifications!, '']);
    };

    return (
        <AppLayout>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="text-3xl font-bold">Edit Profile</h1>
                                <div className="text-sm text-gray-600">Profile Completion: {profileCompletion}%</div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                                    <textarea
                                        value={data.professional_summary}
                                        onChange={(e) => setData('professional_summary', e.target.value)}
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.professional_summary && <p className="mt-1 text-sm text-red-600">{errors.professional_summary}</p>}
                                </div>

                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700">Work Experience</label>
                                        <button type="button" onClick={addWorkExperience} className="text-blue-600 hover:text-blue-800">
                                            + Add Experience
                                        </button>
                                    </div>
                                    {data.work_experience?.map((exp, index) => (
                                        <div key={index} className="mb-4 rounded-lg border p-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Company</label>
                                                    <input
                                                        type="text"
                                                        value={exp.company}
                                                        onChange={(e) => {
                                                            const newExp = [...data.work_experience!];
                                                            newExp[index].company = e.target.value;
                                                            setData('work_experience', newExp);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Position</label>
                                                    <input
                                                        type="text"
                                                        value={exp.position}
                                                        onChange={(e) => {
                                                            const newExp = [...data.work_experience!];
                                                            newExp[index].position = e.target.value;
                                                            setData('work_experience', newExp);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                                    <input
                                                        type="date"
                                                        value={exp.start_date}
                                                        onChange={(e) => {
                                                            const newExp = [...data.work_experience!];
                                                            newExp[index].start_date = e.target.value;
                                                            setData('work_experience', newExp);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                                                    <input
                                                        type="date"
                                                        value={exp.end_date}
                                                        onChange={(e) => {
                                                            const newExp = [...data.work_experience!];
                                                            newExp[index].end_date = e.target.value;
                                                            setData('work_experience', newExp);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    value={exp.description}
                                                    onChange={(e) => {
                                                        const newExp = [...data.work_experience!];
                                                        newExp[index].description = e.target.value;
                                                        setData('work_experience', newExp);
                                                    }}
                                                    rows={3}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700">Education</label>
                                        <button type="button" onClick={addEducation} className="text-blue-600 hover:text-blue-800">
                                            + Add Education
                                        </button>
                                    </div>
                                    {data.education?.map((edu, index) => (
                                        <div key={index} className="mb-4 rounded-lg border p-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                                                    <input
                                                        type="text"
                                                        value={edu.institution}
                                                        onChange={(e) => {
                                                            const newEdu = [...data.education!];
                                                            newEdu[index].institution = e.target.value;
                                                            setData('education', newEdu);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                                                    <input
                                                        type="text"
                                                        value={edu.degree}
                                                        onChange={(e) => {
                                                            const newEdu = [...data.education!];
                                                            newEdu[index].degree = e.target.value;
                                                            setData('education', newEdu);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                                                    <input
                                                        type="text"
                                                        value={edu.field}
                                                        onChange={(e) => {
                                                            const newEdu = [...data.education!];
                                                            newEdu[index].field = e.target.value;
                                                            setData('education', newEdu);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Graduation Date</label>
                                                    <input
                                                        type="date"
                                                        value={edu.graduation_date}
                                                        onChange={(e) => {
                                                            const newEdu = [...data.education!];
                                                            newEdu[index].graduation_date = e.target.value;
                                                            setData('education', newEdu);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                                        <button type="button" onClick={addSkill} className="text-blue-600 hover:text-blue-800">
                                            + Add Skill
                                        </button>
                                    </div>
                                    {data.skills?.map((skill, index) => (
                                        <div key={index} className="mb-2">
                                            <input
                                                type="text"
                                                value={skill}
                                                onChange={(e) => {
                                                    const newSkills = [...data.skills!];
                                                    newSkills[index] = e.target.value;
                                                    setData('skills', newSkills);
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700">Certifications</label>
                                        <button type="button" onClick={addCertification} className="text-blue-600 hover:text-blue-800">
                                            + Add Certification
                                        </button>
                                    </div>
                                    {data.certifications?.map((cert, index) => (
                                        <div key={index} className="mb-2">
                                            <input
                                                type="text"
                                                value={cert}
                                                onChange={(e) => {
                                                    const newCerts = [...data.certifications!];
                                                    newCerts[index] = e.target.value;
                                                    setData('certifications', newCerts);
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
