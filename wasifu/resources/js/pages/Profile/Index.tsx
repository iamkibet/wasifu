import AppLayout from '@/layouts/app-layout';
import { Profile } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Award, Building2, Calendar, Check, Code2, Edit, GraduationCap, Plus, Trash2, User, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type WorkExperience = {
    company: string;
    position: string;
    start_date: string;
    end_date: string;
    description: string;
};

type Education = {
    institution: string;
    degree: string;
    field: string;
    graduation_date: string;
};

type FormData = {
    professional_summary?: string;
    work_experience?: WorkExperience[];
    education?: Education[];
    skills?: string[];
    certifications?: string[];
    company?: string;
    position?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
    institution?: string;
    degree?: string;
    field?: string;
    graduation_date?: string;
};

export default function Index({ profile }: { profile: Profile | null }) {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [editingSection, setEditingSection] = useState<string | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState<string | null>(null);

    const handleEditSection = (section: string, index?: number) => {
        setEditingSection(section);
        setEditingIndex(index ?? null);
        setError(null);

        if (index !== undefined && profile) {
            switch (section) {
                case 'work':
                    setFormData(profile.work_experience[index]);
                    break;
                case 'education':
                    setFormData(profile.education[index]);
                    break;
                case 'skills':
                    setFormData({ skills: [profile.skills[index]] });
                    break;
                case 'certifications':
                    setFormData({ certifications: [profile.certifications[index]] });
                    break;
            }
        } else if (profile) {
            switch (section) {
                case 'summary':
                    setFormData({ professional_summary: profile.professional_summary });
                    break;
                case 'work':
                    setFormData({ work_experience: profile.work_experience });
                    break;
                case 'education':
                    setFormData({ education: profile.education });
                    break;
                case 'skills':
                    setFormData({ skills: profile.skills });
                    break;
                case 'certifications':
                    setFormData({ certifications: profile.certifications });
                    break;
            }
        }
    };

    const handleAddItem = (section: string) => {
        setShowAddForm(section);
        setEditingSection(section);
        setEditingIndex(null);
        setError(null);

        // Set form data for the new item
        switch (section) {
            case 'work':
                setFormData({
                    company: '',
                    position: '',
                    start_date: '',
                    end_date: '',
                    description: '',
                });
                break;
            case 'education':
                setFormData({
                    institution: '',
                    degree: '',
                    field: '',
                    graduation_date: '',
                });
                break;
            case 'skills':
                setFormData({ skills: [''] });
                break;
            case 'certifications':
                setFormData({ certifications: [''] });
                break;
        }
    };

    const handleDeleteItem = async (section: string, index: number) => {
        if (!profile || !confirm('Are you sure you want to delete this item?')) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await router.delete(
                route('profile.delete-item', {
                    profile: profile.id,
                    section,
                    index,
                }),
                {
                    onSuccess: () => {
                        toast.success('Item deleted successfully');
                    },
                    onError: (errors) => {
                        toast.error(errors.error || 'Failed to delete item. Please try again.');
                    },
                },
            );
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Failed to delete item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSection || !profile || !formData) return;

        setIsSubmitting(true);
        setError(null);

        try {
            let dataToSend = { ...formData };

            if (editingSection === 'skills' && formData.skills) {
                dataToSend = { skills: formData.skills };
            } else if (editingSection === 'certifications' && formData.certifications) {
                dataToSend = { certifications: formData.certifications };
            }

            const endpoint =
                editingIndex !== null
                    ? route('profile.update-item', {
                          profile: profile.id,
                          section: editingSection,
                          index: editingIndex,
                      })
                    : route('profile.update-section', {
                          profile: profile.id,
                          section: editingSection,
                      });

            await router.post(endpoint, dataToSend, {
                onSuccess: () => {
                    // Refresh the page to get the latest data
                    router.reload();
                    toast.success('Changes saved successfully');
                    setEditingSection(null);
                    setEditingIndex(null);
                    setFormData(null);
                },
                onError: (errors) => {
                    toast.error(errors.error || 'Failed to save changes. Please try again.');
                },
            });
        } catch (error) {
            console.error('Error updating section:', error);
            toast.error('Failed to save changes. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setEditingSection(null);
        setEditingIndex(null);
        setFormData(null);
        setError(null);
        setShowAddForm(null);
    };

    const renderEditForm = () => {
        if (!editingSection || !formData) return null;

        const field = editingSection === 'skills' ? 'skills' : 'certifications';

        switch (editingSection) {
            case 'summary':
                return (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={formData.professional_summary || ''}
                            onChange={(e) => setFormData({ ...formData, professional_summary: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                            rows={4}
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <X className="mr-1 h-4 w-4" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Check className="mr-1 h-4 w-4" />
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                );

            case 'work':
                return (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
                                <input
                                    type="text"
                                    value={formData.position || ''}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
                                <input
                                    type="text"
                                    value={formData.company || ''}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                                <input
                                    type="date"
                                    value={formData.start_date || ''}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                                <input
                                    type="date"
                                    value={formData.end_date || ''}
                                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                rows={4}
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <X className="mr-1 h-4 w-4" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Check className="mr-1 h-4 w-4" />
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                );

            case 'education':
                return (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Degree</label>
                                <input
                                    type="text"
                                    value={formData.degree || ''}
                                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Institution</label>
                                <input
                                    type="text"
                                    value={formData.institution || ''}
                                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Field of Study</label>
                                <input
                                    type="text"
                                    value={formData.field || ''}
                                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Graduation Date</label>
                                <input
                                    type="date"
                                    value={formData.graduation_date || ''}
                                    onChange={(e) => setFormData({ ...formData, graduation_date: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <X className="mr-1 h-4 w-4" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Check className="mr-1 h-4 w-4" />
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                );

            case 'skills':
            case 'certifications':
                return (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={formData[field]?.[0] || ''}
                            onChange={(e) => setFormData({ ...formData, [field]: [e.target.value] })}
                            className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                            placeholder={`Enter ${editingSection === 'skills' ? 'skill' : 'certification'}`}
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <X className="mr-1 h-4 w-4" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Check className="mr-1 h-4 w-4" />
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                );

            default:
                return null;
        }
    };

    if (!profile) {
        return (
            <AppLayout>
                <div className="flex min-h-[70vh] items-center justify-center py-12">
                    <div className="max-w-md text-center">
                        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100">
                            <User className="h-12 w-12 text-indigo-600" />
                        </div>
                        <h1 className="mb-4 text-3xl font-bold text-gray-900">Create Your Professional Profile</h1>
                        <p className="mb-8 text-lg text-gray-600">
                            Showcase your experience and skills to potential employers with a polished profile.
                        </p>
                        <Link
                            href={route('profile.create')}
                            className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-4 text-base font-medium text-white shadow-lg transition-all hover:from-blue-500 hover:to-indigo-600 hover:shadow-xl focus:outline-none"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* Profile Header */}
                    <div className="mb-10 rounded-2xl bg-gradient-to-r from-gray-50 to-white p-8 shadow-md dark:from-gray-800 dark:to-gray-900">
                        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                            <div className="flex items-center">
                                <div className="relative mr-6">
                                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200"></div>
                                    <button
                                        onClick={() => handleEditSection('profile')}
                                        className="absolute right-0 bottom-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                                    >
                                        <Edit className="h-5 w-5 text-white" />
                                    </button>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.full_name}</h1>
                                    <p className="mt-1 text-gray-600 dark:text-gray-300">Profile</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Professional Summary */}
                            <div
                                className="relative mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                onMouseEnter={() => setActiveSection('summary')}
                                onMouseLeave={() => setActiveSection(null)}
                            >
                                <div className="flex items-start justify-between">
                                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Professional Summary</h2>
                                    {activeSection === 'summary' && !editingSection && (
                                        <button
                                            onClick={() => handleEditSection('summary')}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                {editingSection === 'summary' ? (
                                    renderEditForm()
                                ) : (
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {profile.professional_summary ||
                                            'No summary provided. Add a professional summary to showcase your expertise.'}
                                    </p>
                                )}
                            </div>

                            {/* Work Experience */}
                            <div
                                className="relative mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                onMouseEnter={() => setActiveSection('work')}
                                onMouseLeave={() => setActiveSection(null)}
                            >
                                <div className="flex items-start justify-between">
                                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
                                    <div className="flex gap-2">
                                        {activeSection === 'work' && !editingSection && (
                                            <>
                                                <button
                                                    onClick={() => handleAddItem('work')}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEditSection('work')}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {profile.work_experience.length > 0 && (
                                    <div className="space-y-6">
                                        {profile.work_experience.map((exp, index) => (
                                            <div
                                                key={index}
                                                className="group relative flex gap-4 pb-6 pl-2 before:absolute before:top-2 before:left-0 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700"
                                            >
                                                {editingSection === 'work' && editingIndex === index ? (
                                                    renderEditForm()
                                                ) : (
                                                    <>
                                                        <div className="flex-shrink-0">
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                                                                <Building2 className="h-5 w-5" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <h3 className="font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                                                                    <p className="text-gray-700 dark:text-gray-300">{exp.company}</p>
                                                                </div>
                                                                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                                                    <button
                                                                        onClick={() => handleEditSection('work', index)}
                                                                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                                                    >
                                                                        <Edit className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteItem('work', index)}
                                                                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                                <Calendar className="mr-2 h-4 w-4" />
                                                                {exp.start_date} - {exp.end_date || 'Present'}
                                                            </div>
                                                            <p className="mt-3 text-gray-600 dark:text-gray-300">{exp.description}</p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {showAddForm === 'work' && (
                                    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                        {renderEditForm()}
                                    </div>
                                )}

                                {profile.work_experience.length === 0 && !showAddForm && (
                                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                                        <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No work experience added</h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Add your professional experience to showcase your career journey.
                                        </p>
                                        <button
                                            onClick={() => handleAddItem('work')}
                                            className="mt-4 inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Experience
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Education */}
                            <div
                                className="relative mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                onMouseEnter={() => setActiveSection('education')}
                                onMouseLeave={() => setActiveSection(null)}
                            >
                                <div className="flex items-start justify-between">
                                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Education</h2>
                                    <div className="flex gap-2">
                                        {activeSection === 'education' && !editingSection && (
                                            <>
                                                <button
                                                    onClick={() => handleAddItem('education')}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEditSection('education')}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {profile.education.length > 0 && (
                                    <div className="space-y-6">
                                        {profile.education.map((edu, index) => (
                                            <div key={index} className="group relative flex gap-4">
                                                {editingSection === 'education' && editingIndex === index ? (
                                                    renderEditForm()
                                                ) : (
                                                    <>
                                                        <div className="flex-shrink-0">
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
                                                                <GraduationCap className="h-5 w-5" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <h3 className="font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                                                                    <p className="text-gray-700 dark:text-gray-300">{edu.institution}</p>
                                                                    <p className="text-gray-600 dark:text-gray-400">{edu.field}</p>
                                                                </div>
                                                                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                                                    <button
                                                                        onClick={() => handleEditSection('education', index)}
                                                                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                                                    >
                                                                        <Edit className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteItem('education', index)}
                                                                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                                <Calendar className="mr-2 h-4 w-4" />
                                                                Graduated: {edu.graduation_date}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {showAddForm === 'education' && (
                                    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                        {renderEditForm()}
                                    </div>
                                )}

                                {profile.education.length === 0 && !showAddForm && (
                                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                                        <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No education added</h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Add your educational background to showcase your qualifications.
                                        </p>
                                        <button
                                            onClick={() => handleAddItem('education')}
                                            className="mt-4 inline-flex items-center rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Education
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Skills */}
                            <div
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                onMouseEnter={() => setActiveSection('skills')}
                                onMouseLeave={() => setActiveSection(null)}
                            >
                                <div className="flex items-start justify-between">
                                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Skills</h2>
                                    {activeSection === 'skills' && !editingSection && (
                                        <button
                                            onClick={() => handleAddItem('skills')}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>

                                {profile.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-3">
                                        {profile.skills.map((skill, index) => (
                                            <div
                                                key={index}
                                                className="group relative flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                            >
                                                <Code2 className="mr-2 h-4 w-4" />
                                                {skill}
                                                <button
                                                    onClick={() => handleDeleteItem('skills', index)}
                                                    className="ml-2 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-400"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {showAddForm === 'skills' && (
                                    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                        {renderEditForm()}
                                    </div>
                                )}

                                {profile.skills.length === 0 && !showAddForm && (
                                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
                                        <Code2 className="mx-auto h-10 w-10 text-gray-400" />
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Add your professional skills to showcase your expertise.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Certifications */}
                            <div
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                onMouseEnter={() => setActiveSection('certifications')}
                                onMouseLeave={() => setActiveSection(null)}
                            >
                                <div className="flex items-start justify-between">
                                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Certifications</h2>
                                    {activeSection === 'certifications' && !editingSection && (
                                        <button
                                            onClick={() => handleAddItem('certifications')}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>

                                {profile.certifications.length > 0 && (
                                    <div className="space-y-4">
                                        {profile.certifications.map((cert, index) => (
                                            <div
                                                key={index}
                                                className="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                            >
                                                <div className="flex items-center">
                                                    <Award className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                    <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteItem('certifications', index)}
                                                    className="text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {showAddForm === 'certifications' && (
                                    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                        {renderEditForm()}
                                    </div>
                                )}

                                {profile.certifications.length === 0 && !showAddForm && (
                                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
                                        <Award className="mx-auto h-10 w-10 text-gray-400" />
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Add your certifications to showcase your qualifications.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
