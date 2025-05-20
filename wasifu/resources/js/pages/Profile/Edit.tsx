import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { User } from '@/types';
import { Head, useForm } from '@inertiajs/react';

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
}

export default function Edit({ auth, profile }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        full_name: profile.full_name || '',
        professional_summary: profile.professional_summary || '',
        work_experience: profile.work_experience || [],
        education: profile.education || [],
        skills: profile.skills || [],
        certifications: profile.certifications || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('profile.update'));
    };

    const addWorkExperience = () => {
        setData('work_experience', [...data.work_experience, { company: '', position: '', start_date: '', end_date: '', description: '' }]);
    };

    const addEducation = () => {
        setData('education', [...data.education, { institution: '', degree: '', field: '', graduation_date: '' }]);
    };

    return (
        <>
            <Head title="Edit Profile" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card className="p-6">
                        <h1 className="mb-6 text-2xl font-semibold">Edit Profile</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="full_name">Full Name</Label>
                                <Input
                                    id="full_name"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.full_name && <div className="mt-1 text-sm text-red-500">{errors.full_name}</div>}
                            </div>

                            <div>
                                <Label htmlFor="professional_summary">Professional Summary</Label>
                                <Textarea
                                    id="professional_summary"
                                    value={data.professional_summary}
                                    onChange={(e) => setData('professional_summary', e.target.value)}
                                    className="mt-1"
                                    rows={4}
                                />
                                {errors.professional_summary && <div className="mt-1 text-sm text-red-500">{errors.professional_summary}</div>}
                            </div>

                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <Label>Work Experience</Label>
                                    <Button type="button" onClick={addWorkExperience} variant="outline">
                                        Add Experience
                                    </Button>
                                </div>
                                {data.work_experience.map((exp, index) => (
                                    <div key={index} className="mb-4 rounded-lg border p-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Company</Label>
                                                <Input
                                                    value={exp.company}
                                                    onChange={(e) => {
                                                        const newExp = [...data.work_experience];
                                                        newExp[index].company = e.target.value;
                                                        setData('work_experience', newExp);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label>Position</Label>
                                                <Input
                                                    value={exp.position}
                                                    onChange={(e) => {
                                                        const newExp = [...data.work_experience];
                                                        newExp[index].position = e.target.value;
                                                        setData('work_experience', newExp);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Start Date</Label>
                                                <Input
                                                    type="date"
                                                    value={exp.start_date}
                                                    onChange={(e) => {
                                                        const newExp = [...data.work_experience];
                                                        newExp[index].start_date = e.target.value;
                                                        setData('work_experience', newExp);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label>End Date</Label>
                                                <Input
                                                    type="date"
                                                    value={exp.end_date}
                                                    onChange={(e) => {
                                                        const newExp = [...data.work_experience];
                                                        newExp[index].end_date = e.target.value;
                                                        setData('work_experience', newExp);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Label>Description</Label>
                                            <Textarea
                                                value={exp.description}
                                                onChange={(e) => {
                                                    const newExp = [...data.work_experience];
                                                    newExp[index].description = e.target.value;
                                                    setData('work_experience', newExp);
                                                }}
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <Label>Education</Label>
                                    <Button type="button" onClick={addEducation} variant="outline">
                                        Add Education
                                    </Button>
                                </div>
                                {data.education.map((edu, index) => (
                                    <div key={index} className="mb-4 rounded-lg border p-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Institution</Label>
                                                <Input
                                                    value={edu.institution}
                                                    onChange={(e) => {
                                                        const newEdu = [...data.education];
                                                        newEdu[index].institution = e.target.value;
                                                        setData('education', newEdu);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label>Degree</Label>
                                                <Input
                                                    value={edu.degree}
                                                    onChange={(e) => {
                                                        const newEdu = [...data.education];
                                                        newEdu[index].degree = e.target.value;
                                                        setData('education', newEdu);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Field of Study</Label>
                                                <Input
                                                    value={edu.field}
                                                    onChange={(e) => {
                                                        const newEdu = [...data.education];
                                                        newEdu[index].field = e.target.value;
                                                        setData('education', newEdu);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label>Graduation Date</Label>
                                                <Input
                                                    type="date"
                                                    value={edu.graduation_date}
                                                    onChange={(e) => {
                                                        const newEdu = [...data.education];
                                                        newEdu[index].graduation_date = e.target.value;
                                                        setData('education', newEdu);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <Label>Skills (comma-separated)</Label>
                                <Input
                                    value={data.skills.join(', ')}
                                    onChange={(e) =>
                                        setData(
                                            'skills',
                                            e.target.value.split(',').map((s) => s.trim()),
                                        )
                                    }
                                    placeholder="e.g. JavaScript, React, Node.js"
                                />
                            </div>

                            <div>
                                <Label>Certifications (comma-separated)</Label>
                                <Input
                                    value={data.certifications.join(', ')}
                                    onChange={(e) =>
                                        setData(
                                            'certifications',
                                            e.target.value.split(',').map((s) => s.trim()),
                                        )
                                    }
                                    placeholder="e.g. AWS Certified Developer, Google Cloud Professional"
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Save Profile
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}
