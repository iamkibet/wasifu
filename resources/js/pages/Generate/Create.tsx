import { Progress } from '@/components/ui/progress';
import { Select } from '@/components/ui/select';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { 
    FileText, 
    Sparkles, 
    Download, 
    CheckCircle, 
    Clock,
    Target,
    Zap
} from 'lucide-react';

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

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Generate Documents', href: '/generate/create' }
    ];

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
            // Start progress animation
            progressInterval = setInterval(() => {
                setGenerationProgress((prev) => {
                    if (prev >= 90) return prev; // Don't go beyond 90% until success
                    return Math.min(prev + 8, 90);
                });
            }, 800);

            post(route('generate.store'), {
                preserveScroll: true,
                onStart: () => {
                    console.log('Generation started');
                },
                onSuccess: (page) => {
                    console.log('Generation succeeded', page);
                    clearInterval(progressInterval);
                    setGenerationProgress(100);
                    
                    // Show success message
                    toast.success('Documents generated successfully!');
                    
                    // Small delay to show 100% progress, then redirect
                    setTimeout(() => {
                        // The controller redirects to documents.show, so we don't need to handle it here
                    }, 1000);
                },
                onError: (errors) => {
                    console.error('Generation failed:', errors);
                    clearInterval(progressInterval);
                    setGenerationProgress(0);
                    
                    // Handle specific error cases
                    if (errors.message) {
                        toast.error(errors.message);
                    } else if (typeof errors === 'string') {
                        toast.error(errors);
                    } else {
                        toast.error('Failed to generate documents. Please try again.');
                    }
                },
                onFinish: () => {
                    console.log('Generation finished');
                    if (progressInterval) {
                        clearInterval(progressInterval);
                    }
                },
            });
        } catch (error) {
            console.error('Error in form submission:', error);
            clearInterval(progressInterval);
            setGenerationProgress(0);
            toast.error('An unexpected error occurred');
        }
    };

    const getProgressMessage = () => {
        if (generationProgress < 25) return 'Analyzing job requirements...';
        if (generationProgress < 50) return 'Crafting your resume...';
        if (generationProgress < 75) return 'Writing your cover letter...';
        if (generationProgress < 95) return 'Optimizing content...';
        return 'Finalizing documents...';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Generate Resume & Cover Letter" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-orange-900/10">
                <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-100/50 bg-white/80 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold tracking-tight text-orange-600 backdrop-blur-sm dark:border-orange-400/20 dark:bg-gray-900/80 dark:text-orange-300">
                            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 fill-orange-400/20 stroke-orange-500" />
                            <span>AI-Powered Generation</span>
                        </div>
                        <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Generate Professional Documents
                        </h1>
                        <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
                            Create tailored resumes and cover letters that match your target job perfectly
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Generation Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                                <div className="p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                            <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Target Job Selection</h2>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <Label htmlFor="job_description_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Select Job Description <span className="text-orange-500">*</span>
                                            </Label>
                                            <select
                                                id="job_description_id"
                                                value={data.job_description_id}
                                                onChange={(e) => setData('job_description_id', e.target.value)}
                                                disabled={processing}
                                                className="w-full rounded-xl border-0 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <option value="">Choose a job description to target...</option>
                                                {jobDescriptions.map((job) => (
                                                    <option key={job.id} value={job.id}>
                                                        {job.job_title} at {job.company}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.job_description_id && (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.job_description_id}</p>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        {processing && (
                                            <div className="space-y-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                                        <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400 animate-spin" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                                                            {getProgressMessage()}
                                                        </p>
                                                        <Progress value={generationProgress} className="mt-2 h-2 bg-orange-200 dark:bg-orange-800" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex justify-end">
                                            <Button 
                                                type="submit" 
                                                disabled={processing || !data.job_description_id} 
                                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[180px]"
                                            >
                                                {processing ? (
                                                    <>
                                                        <Clock className="h-4 w-4 animate-spin" />
                                                        Generating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap className="h-4 w-4" />
                                                        Generate Documents
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Features Sidebar */}
                        <div className="space-y-6">
                            {/* What You'll Get */}
                            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                            <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">What You'll Get</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Tailored Resume</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Optimized for the specific job requirements</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Professional Cover Letter</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Personalized and compelling</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Ready to Download</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">PDF format, print-ready</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                            <Sparkles className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pro Tips</h3>
                                    </div>
                                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                        <p>• Choose a job description that closely matches your target role</p>
                                        <p>• Make sure your profile is complete for better results</p>
                                        <p>• Review and customize the generated content before applying</p>
                                        <p>• Use specific keywords from the job posting</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
