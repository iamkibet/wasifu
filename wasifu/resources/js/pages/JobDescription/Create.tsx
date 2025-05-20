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
}

export default function Create({ auth }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        job_title: '',
        company: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('job-descriptions.store'));
    };

    return (
        <>
            <Head title="Add Job Description" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card className="p-6">
                        <h1 className="mb-6 text-2xl font-semibold">Add Job Description</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="job_title">Job Title</Label>
                                <Input
                                    id="job_title"
                                    value={data.job_title}
                                    onChange={(e) => setData('job_title', e.target.value)}
                                    className="mt-1"
                                    placeholder="e.g. Senior Software Engineer"
                                />
                                {errors.job_title && <div className="mt-1 text-sm text-red-500">{errors.job_title}</div>}
                            </div>

                            <div>
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                    className="mt-1"
                                    placeholder="e.g. Acme Inc."
                                />
                                {errors.company && <div className="mt-1 text-sm text-red-500">{errors.company}</div>}
                            </div>

                            <div>
                                <Label htmlFor="description">Job Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1"
                                    rows={10}
                                    placeholder="Paste the full job description here..."
                                />
                                {errors.description && <div className="mt-1 text-sm text-red-500">{errors.description}</div>}
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Save Job Description
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}
