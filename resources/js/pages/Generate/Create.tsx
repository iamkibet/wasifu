import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select } from '@/components/ui/select';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    jobDescriptions: Array<{
        id: number;
        job_title: string;
        company: string;
    }>;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Create({ jobDescriptions, flash }: Props) {
    const [generationProgress, setGenerationProgress] = useState(0);
    const { data, setData, post, processing, errors } = useForm({
        job_description_id: '',
    });

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted with data:', data);

        if (!data.job_description_id) {
            toast.error('Please select a job description');
            return;
        }

        setGenerationProgress(0);
        let progressInterval: NodeJS.Timeout | undefined;

        try {
            progressInterval = setInterval(() => {
                setGenerationProgress((prev) => Math.min(prev + 10, 90));
            }, 1000);

            post(route('generate.store'), {
                preserveScroll: true,
                onStart: () => {
                    console.log('Request started');
                },
                onSuccess: () => {
                    console.log('Request succeeded');
                    clearInterval(progressInterval);
                    setGenerationProgress(100);
                },
                onError: (errors) => {
                    console.error('Request failed:', errors);
                    clearInterval(progressInterval);
                    setGenerationProgress(0);
                    toast.error(errors.message || 'Failed to generate documents');
                },
                onFinish: () => {
                    console.log('Request finished');
                },
            });
        } catch (error) {
            console.error('Error in form submission:', error);
            clearInterval(progressInterval);
            setGenerationProgress(0);
            toast.error('An unexpected error occurred');
        }
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
                                    onChange={(e) => {
                                        console.log('Selected job description:', e.target.value);
                                        setData('job_description_id', e.target.value);
                                    }}
                                    className="mt-1"
                                    disabled={processing}
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

                            {processing && (
                                <div className="space-y-2">
                                    <div className="text-sm text-gray-600">
                                        {generationProgress < 30 && 'Preparing your documents...'}
                                        {generationProgress >= 30 && generationProgress < 60 && 'Generating your resume...'}
                                        {generationProgress >= 60 && generationProgress < 90 && 'Creating your cover letter...'}
                                        {generationProgress >= 90 && 'Finalizing your documents...'}
                                    </div>
                                    <Progress value={generationProgress} className="h-2" />
                                </div>
                            )}

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing || !data.job_description_id} className="min-w-[150px]">
                                    {processing ? 'Generating...' : 'Generate Documents'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}
