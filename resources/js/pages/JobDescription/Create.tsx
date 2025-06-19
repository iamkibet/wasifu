import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Briefcase, FileText, Plus } from 'lucide-react';

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
        <AppLayout>
            <Head title="Add Job Description" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Job Description</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Add a job description to generate tailored resumes and cover letters</p>
                    </div>

                    <Card className="overflow-hidden border-0 shadow-xl">
                        <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-400 p-6">
                            <div className="flex items-center space-x-3">
                                <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle className="text-xl font-semibold text-white">Job Details</CardTitle>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="job_title" className="flex items-center text-gray-700 dark:text-gray-300">
                                            <Briefcase className="mr-2 h-4 w-4" />
                                            Job Title
                                        </Label>
                                    </div>
                                    <Input
                                        id="job_title"
                                        value={data.job_title}
                                        onChange={(e) => setData('job_title', e.target.value)}
                                        className="mt-1 pl-2 rounded-xl border-gray-300 bg-white py-5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        placeholder="e.g. Senior Software Engineer"
                                    />
                                    {errors.job_title && <div className="mt-1 text-sm text-red-500">{errors.job_title}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-gray-700 dark:text-gray-300">
                                        Company
                                    </Label>
                                    <Input
                                        id="company"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        className="mt-1 pl-2 rounded-xl border-gray-300 bg-white py-5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        placeholder="e.g. Acme Inc."
                                    />
                                    {errors.company && <div className="mt-1 text-sm text-red-500">{errors.company}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                                        Job Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 pl-2 min-h-[200px] rounded-xl border-gray-300 bg-white py-4 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        placeholder="Paste the full job description here..."
                                    />
                                    {errors.description && <div className="mt-1 text-sm text-red-500">{errors.description}</div>}
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 py-6 text-base font-medium text-white shadow-lg transition-all hover:from-amber-500 hover:to-amber-600 hover:shadow-xl disabled:opacity-80"
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className="mr-2 h-5 w-5 animate-spin text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <Plus className="mr-2 h-5 w-5" />
                                                Create Job Description
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center dark:border-gray-700 dark:bg-gray-800">
                            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-amber-600 dark:bg-blue-900/30 dark:text-blue-300">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Paste Job Description</h3>
                            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Copy the job posting and paste it into the form</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center dark:border-gray-700 dark:bg-gray-800">
                            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">AI Analysis</h3>
                            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Our AI will extract key skills and requirements</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center dark:border-gray-700 dark:bg-gray-800">
                            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Generate Tailored Resumes</h3>
                            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Create perfectly matched application materials</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
