import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardModernLayout from '@/layouts/dashboard-modern-layout';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { Award, Briefcase, ChevronDown, ChevronUp, GraduationCap, Loader, Plus, Rocket, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    auth: {
        user: User;
    };
    profile: {
        full_name: string;
        professional_summary: string;
        work_experience: Array<{
            company: string;
            position: string;
            start_date: string;
            end_date: string;
            description: string;
        }>;
        education: Array<{
            institution: string;
            degree: string;
            field: string;
            graduation_date: string;
        }>;
        skills: string[];
        certifications: string[];
    };
    profileCompletion: number;
}

export default function Add({ auth, profile, profileCompletion }: Props) {
    const [expandedSections, setExpandedSections] = useState({
        personal: true,
        work: true,
        education: true,
        skills: true,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const { data, setData, post, processing, errors } = useForm({
        full_name: profile.full_name || '',
        professional_summary: profile.professional_summary || '',
        work_experience: profile.work_experience || [],
        education: profile.education || [],
        skills: profile.skills || [],
        certifications: profile.certifications || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('profile.store'));
    };

    const addWorkExperience = () => {
        setData('work_experience', [...data.work_experience, { company: '', position: '', start_date: '', end_date: '', description: '' }]);
    };

    const addEducation = () => {
        setData('education', [...data.education, { institution: '', degree: '', field: '', graduation_date: '' }]);
    };

    const handleWorkExperienceChange = (index: number, field: string, value: string) => {
        const newExp = [...data.work_experience];
        newExp[index] = { ...newExp[index], [field]: value };
        setData('work_experience', newExp);
    };

    const handleEducationChange = (index: number, field: string, value: string) => {
        const newEdu = [...data.education];
        newEdu[index] = { ...newEdu[index], [field]: value };
        setData('education', newEdu);
    };

    return (
        <DashboardModernLayout title="Edit Profile" profileCompletion={profileCompletion}>
            <div className="w-full">
                <div className="w-full p-8 shadow-xl">
                    <div className="mb-8 border-b pb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Profile Editor
                            <span className="mt-2 block h-1 w-20 rounded-full bg-amber-600" />
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Info Section */}
                        <section className="space-y-6">
                            <div className="mb-6 flex cursor-pointer items-center justify-between gap-3" onClick={() => toggleSection('personal')}>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
                                        <UserIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                                </div>
                                {expandedSections.personal ? (
                                    <ChevronUp className="h-6 w-6 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-6 w-6 text-gray-500" />
                                )}
                            </div>

                            {expandedSections.personal && (
                                <>
                                    <div className="grid gap-6 lg:grid-cols-2">
                                        <div>
                                            <Label htmlFor="full_name">Full Name</Label>
                                            <Input
                                                id="full_name"
                                                value={data.full_name}
                                                onChange={(e) => setData('full_name', e.target.value)}
                                                className="mt-2 bg-gray-50 dark:bg-gray-800"
                                            />
                                            {errors.full_name && (
                                                <p className="mt-2 flex items-center gap-2 text-sm text-red-500">
                                                    <span>•</span>
                                                    {errors.full_name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="professional_summary">Professional Summary</Label>
                                        <Textarea
                                            id="professional_summary"
                                            value={data.professional_summary}
                                            onChange={(e) => setData('professional_summary', e.target.value)}
                                            className="mt-2 h-32 bg-gray-50 dark:bg-gray-800"
                                        />
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Recommended 3-5 concise paragraphs</p>
                                    </div>
                                </>
                            )}
                        </section>

                        {/* Work Experience Section */}
                        <section className="space-y-6">
                            <div className="mb-6 flex cursor-pointer items-center justify-between gap-3" onClick={() => toggleSection('work')}>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
                                        <Briefcase className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Work Experience
                                        <span className="ml-2 text-sm font-normal text-amber-600 dark:text-amber-400">
                                            ({data.work_experience.length} positions)
                                        </span>
                                    </h2>
                                </div>
                                {expandedSections.work ? (
                                    <ChevronUp className="h-6 w-6 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-6 w-6 text-gray-500" />
                                )}
                            </div>

                            {expandedSections.work && (
                                <>
                                    {data.work_experience.map((exp, index) => (
                                        <div
                                            key={index}
                                            className="group relative rounded-xl border p-6 transition-colors hover:border-amber-100 dark:hover:border-amber-900/50"
                                        >
                                            <div className="grid gap-6 lg:grid-cols-2">
                                                <div>
                                                    <Label>Company</Label>
                                                    <Input
                                                        value={exp.company}
                                                        onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                                                        placeholder="Acme Corp"
                                                        className="mt-2 bg-gray-50 dark:bg-gray-800"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Position</Label>
                                                    <Input
                                                        value={exp.position}
                                                        onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                                                        placeholder="Senior Developer"
                                                        className="mt-2 bg-gray-50 dark:bg-gray-800"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <Label>Description</Label>
                                                <Textarea
                                                    value={exp.description}
                                                    onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                                                    className="mt-2 bg-gray-50 dark:bg-gray-800"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="mt-4 grid gap-6 lg:grid-cols-2">
                                                <div>
                                                    <Label>Start Date</Label>
                                                    <Input
                                                        type="date"
                                                        value={exp.start_date}
                                                        onChange={(e) => handleWorkExperienceChange(index, 'start_date', e.target.value)}
                                                        className="mt-2 bg-gray-50 dark:bg-gray-800"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>End Date</Label>
                                                    <Input
                                                        type="date"
                                                        value={exp.end_date}
                                                        onChange={(e) => handleWorkExperienceChange(index, 'end_date', e.target.value)}
                                                        className="mt-2 bg-gray-50 dark:bg-gray-800"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        onClick={addWorkExperience}
                                        variant="outline"
                                        className="w-full border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/20"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Position
                                    </Button>
                                </>
                            )}
                        </section>

                        {/* Education Section */}
                        <section className="space-y-6">
                            <div className="mb-6 flex cursor-pointer items-center justify-between gap-3" onClick={() => toggleSection('education')}>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
                                        <GraduationCap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Education History</h2>
                                </div>
                                {expandedSections.education ? (
                                    <ChevronUp className="h-6 w-6 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-6 w-6 text-gray-500" />
                                )}
                            </div>

                            {expandedSections.education && (
                                <>
                                    {data.education.map((edu, index) => (
                                        <div
                                            key={index}
                                            className="group relative rounded-xl border p-6 transition-colors hover:border-amber-100 dark:hover:border-amber-900/50"
                                        >
                                            <div className="grid gap-6 lg:grid-cols-2">
                                                <div>
                                                    <Label>Institution</Label>
                                                    <Input
                                                        value={edu.institution}
                                                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                        placeholder="University of Example"
                                                        className="mt-2 bg-gray-50 dark:bg-gray-800"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Degree</Label>
                                                    <Input
                                                        value={edu.degree}
                                                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                                        placeholder="Bachelor of Science"
                                                        className="mt-2 bg-gray-50 dark:bg-gray-800"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4 grid gap-6 lg:grid-cols-2">
                                                <div>
                                                    <Label>Field of Study</Label>
                                                    <Input
                                                        value={edu.field}
                                                        onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                                                        placeholder="Computer Science"
                                                        className="mt-2 bg-gray-50 dark:bg-gray-800"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Graduation Date</Label>
                                                    <Input
                                                        type="date"
                                                        value={edu.graduation_date}
                                                        onChange={(e) => handleEducationChange(index, 'graduation_date', e.target.value)}
                                                        className="mt-2 bg-gray-50 dark:bg-gray-800"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        onClick={addEducation}
                                        variant="outline"
                                        className="w-full border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/20"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Education
                                    </Button>
                                </>
                            )}
                        </section>

                        {/* Skills & Certifications */}
                        <section className="grid gap-8 lg:grid-cols-2">
                            <div>
                                <div className="mb-6 flex cursor-pointer items-center justify-between gap-3" onClick={() => toggleSection('skills')}>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
                                            <Rocket className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills & Expertise</h2>
                                    </div>
                                    {expandedSections.skills ? (
                                        <ChevronUp className="h-6 w-6 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-6 w-6 text-gray-500" />
                                    )}
                                </div>

                                {expandedSections.skills && (
                                    <>
                                        <Input
                                            value={data.skills.join(', ')}
                                            onChange={(e) =>
                                                setData(
                                                    'skills',
                                                    e.target.value.split(',').map((s) => s.trim()),
                                                )
                                            }
                                            className="bg-gray-50 dark:bg-gray-800"
                                            placeholder="JavaScript, React, Node.js"
                                        />
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Separate skills with commas</p>
                                    </>
                                )}
                            </div>

                            <div>
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
                                        <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Certifications</h2>
                                </div>
                                <Input
                                    value={data.certifications.join(', ')}
                                    onChange={(e) =>
                                        setData(
                                            'certifications',
                                            e.target.value.split(',').map((s) => s.trim()),
                                        )
                                    }
                                    className="bg-gray-50 dark:bg-gray-800"
                                    placeholder="AWS Certified Developer, Google Cloud Professional"
                                />
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Separate certifications with commas</p>
                            </div>
                        </section>

                        <div className="border-t pt-8">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-4 text-white shadow-lg hover:from-amber-700 hover:to-amber-800 md:w-auto"
                            >
                                {processing ? <Loader className="h-5 w-5 animate-spin" /> : 'Save Profile'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardModernLayout>
    );
}
