import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Select } from '@/Components/ui/select';
import { User } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    auth: {
        user: User;
    };
    jobDescriptions: Array<{
        id: number;
        job_title: string;
        company: string;
    }>;
}

export default function Create({ auth, jobDescriptions }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        job_description_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('generate.store'));
    };

    return (
        <>
            <Head title="Generate Resume & Cover Letter" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card className="p-6">
                        <h1 className="mb-6 text-2xl font-semibold">Generate Resume & Cover Letter</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="job_description_id">Select Job Description</Label>
                                <Select
                                    id="job_description_id"
                                    value={data.job_description_id}
                                    onChange={(e) => setData('job_description_id', e.target.value)}
                                    className="mt-1"
                                >
                                    <option value="">Select a job description...</option>
                                    {jobDescriptions.map((job) => (
                                        <option key={job.id} value={job.id}>
                                            {job.job_title} at {job.company}
                                        </option>
                                    ))}
                                </Select>
                                {errors.job_description_id && <div className="mt-1 text-sm text-red-500">{errors.job_description_id}</div>}
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Generate Documents
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}
