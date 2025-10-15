import { Profile } from '@/types';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { 
    User, 
    Briefcase, 
    GraduationCap, 
    Award, 
    Plus, 
    Trash2, 
    Save,
    ArrowLeft,
    Sparkles,
    CheckCircle,
    Building2
} from 'lucide-react';
import { useState } from 'react';

export default function Create() {
    const [currentStep, setCurrentStep] = useState(0);
    const { data, setData, post, processing, errors } = useForm<Partial<Profile>>({
        full_name: '',
        phone_number: '',
        address: '',
        email: '',
        professional_summary: '',
        work_experience: [{ company: '', position: '', start_date: '', end_date: '', description: '' }],
        education: [{ institution: '', degree: '', field: '', graduation_date: '' }],
        skills: [''],
        certifications: [''],
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Profile', href: '/profile' },
        { title: 'Create Profile', href: '/profile/create' }
    ];

    const steps = [
        { id: 'basic', title: 'Basic Information', icon: User, description: 'Your personal details' },
        { id: 'experience', title: 'Work Experience', icon: Briefcase, description: 'Professional background' },
        { id: 'education', title: 'Education', icon: GraduationCap, description: 'Academic qualifications' },
        { id: 'skills', title: 'Skills & Certifications', icon: Award, description: 'Technical abilities' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prepare the data for submission
        const formData = prepareFormData();
        
        // Validate that we have at least one skill
        if (formData.skills.length === 0) {
            alert('Please add at least one skill before creating your profile.');
            setCurrentStep(3); // Go to skills step
            return;
        }
        
        // Submit the form with cleaned data using transform
        post(route('profile.store'), {
            transform: () => formData,
            onSuccess: () => {
                // Success handled by redirect
            },
            onError: (errors) => {
                console.error('Profile creation errors:', errors);
                console.log('Form data being sent:', data);
                console.log('Prepared form data:', formData);
                
                // Show detailed error message
                let errorMessage = 'There was an error creating your profile:\n\n';
                Object.keys(errors).forEach(key => {
                    errorMessage += `${key}: ${Array.isArray(errors[key]) ? errors[key].join(', ') : errors[key]}\n`;
                });
                alert(errorMessage);
            }
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

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const isStepValid = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return data.full_name?.trim() && data.professional_summary?.trim();
            case 1:
                return data.work_experience?.some(exp => 
                    exp.company?.trim() && 
                    exp.position?.trim() && 
                    exp.start_date && 
                    exp.end_date && 
                    exp.description?.trim()
                );
            case 2:
                return data.education?.some(edu => 
                    edu.institution?.trim() && 
                    edu.degree?.trim() && 
                    edu.field?.trim() && 
                    edu.graduation_date
                );
            case 3:
                return data.skills?.some(skill => skill?.trim());
            default:
                return false;
        }
    };

    const prepareFormData = () => {
        console.log('Original data:', data);
        
        // Filter out empty skills and certifications
        const filteredSkills = data.skills?.filter(skill => skill?.trim()) || [];
        const filteredCerts = data.certifications?.filter(cert => cert?.trim()) || [];
        
        // Filter out incomplete work experience
        const filteredWorkExp = data.work_experience?.filter(exp => 
            exp.company?.trim() && 
            exp.position?.trim() && 
            exp.start_date && 
            exp.end_date && 
            exp.description?.trim()
        ) || [];
        
        // Filter out incomplete education
        const filteredEducation = data.education?.filter(edu => 
            edu.institution?.trim() && 
            edu.degree?.trim() && 
            edu.field?.trim() && 
            edu.graduation_date
        ) || [];

               const result = {
                   full_name: data.full_name?.trim(),
                   phone_number: data.phone_number?.trim() || null,
                   address: data.address?.trim() || null,
                   email: data.email?.trim() || null,
                   professional_summary: data.professional_summary?.trim(),
                   work_experience: filteredWorkExp,
                   education: filteredEducation,
                   skills: filteredSkills,
                   certifications: filteredCerts,
               };
        
        console.log('Prepared data:', result);
        return result;
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return renderBasicInfo();
            case 1:
                return renderWorkExperience();
            case 2:
                return renderEducation();
            case 3:
                return renderSkillsAndCerts();
            default:
                return null;
        }
    };

    const renderBasicInfo = () => (
        <div className="space-y-8">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30">
                    <User className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Tell us about yourself</p>
            </div>

                   <div className="space-y-6">
                            <div>
                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                               Full Name <span className="text-orange-500">*</span>
                           </label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                               placeholder="Enter your full name"
                               className="w-full rounded-xl border-0 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                           />
                           {errors.full_name && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.full_name}</p>}
                       </div>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                   Phone Number
                               </label>
                               <input
                                   type="tel"
                                   value={data.phone_number}
                                   onChange={(e) => setData('phone_number', e.target.value)}
                                   placeholder="+1 (555) 123-4567"
                                   className="w-full rounded-xl border-0 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                               />
                               {errors.phone_number && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.phone_number}</p>}
                           </div>

                           <div>
                               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                   Email Address
                               </label>
                               <input
                                   type="email"
                                   value={data.email}
                                   onChange={(e) => setData('email', e.target.value)}
                                   placeholder="your.email@example.com"
                                   className="w-full rounded-xl border-0 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                               />
                               {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                           </div>
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                               Address
                           </label>
                           <textarea
                               value={data.address}
                               onChange={(e) => setData('address', e.target.value)}
                               rows={3}
                               placeholder="Enter your full address including city, state, and postal code..."
                               className="w-full rounded-xl border-0 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                           />
                           {errors.address && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.address}</p>}
                            </div>

                            <div>
                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                               Professional Summary <span className="text-orange-500">*</span>
                           </label>
                                <textarea
                                    value={data.professional_summary}
                                    onChange={(e) => setData('professional_summary', e.target.value)}
                               rows={6}
                               placeholder="Write a compelling summary of your professional background, skills, and career goals..."
                               className="w-full rounded-xl border-0 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                           />
                           {errors.professional_summary && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.professional_summary}</p>}
                       </div>
                   </div>
        </div>
    );

    const renderWorkExperience = () => (
        <div className="space-y-8">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30">
                    <Briefcase className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Work Experience</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Add your professional experience</p>
            </div>

            <div className="space-y-6">
                {data.work_experience?.map((exp, index) => (
                    <div key={index} className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                    <Building2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Experience #{index + 1}</h3>
                            </div>
                            {data.work_experience!.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newExp = data.work_experience!.filter((_, i) => i !== index);
                                        setData('work_experience', newExp);
                                    }}
                                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors duration-200"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            )}
                            </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Company <span className="text-orange-500">*</span>
                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.company}
                                                    onChange={(e) => {
                                                        const newExp = [...data.work_experience!];
                                                        newExp[index].company = e.target.value;
                                                        setData('work_experience', newExp);
                                                    }}
                                    placeholder="Company name"
                                    className="w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Position <span className="text-orange-500">*</span>
                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.position}
                                                    onChange={(e) => {
                                                        const newExp = [...data.work_experience!];
                                                        newExp[index].position = e.target.value;
                                                        setData('work_experience', newExp);
                                                    }}
                                    placeholder="Job title"
                                    className="w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Start Date <span className="text-orange-500">*</span>
                                </label>
                                                <input
                                                    type="date"
                                                    value={exp.start_date}
                                                    onChange={(e) => {
                                                        const newExp = [...data.work_experience!];
                                                        newExp[index].start_date = e.target.value;
                                                        setData('work_experience', newExp);
                                                    }}
                                    className="w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    End Date <span className="text-orange-500">*</span>
                                </label>
                                                <input
                                                    type="date"
                                                    value={exp.end_date}
                                                    onChange={(e) => {
                                                        const newExp = [...data.work_experience!];
                                                        newExp[index].end_date = e.target.value;
                                                        setData('work_experience', newExp);
                                                    }}
                                    className="w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description <span className="text-orange-500">*</span>
                            </label>
                                            <textarea
                                                value={exp.description}
                                                onChange={(e) => {
                                                    const newExp = [...data.work_experience!];
                                                    newExp[index].description = e.target.value;
                                                    setData('work_experience', newExp);
                                                }}
                                                rows={3}
                                placeholder="Describe your responsibilities and achievements..."
                                className="w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                                            />
                                        </div>
                                    </div>
                                ))}

                <button
                    type="button"
                    onClick={addWorkExperience}
                    className="flex w-full items-center justify-center space-x-2 rounded-xl border-2 border-dashed border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 px-6 py-4 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200"
                >
                    <Plus className="h-5 w-5" />
                    <span className="font-medium">Add Another Experience</span>
                </button>
            </div>
        </div>
    );

    const renderEducation = () => (
        <div className="space-y-8">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30">
                    <GraduationCap className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Education</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Add your educational background</p>
            </div>

            <div className="space-y-6">
                {data.education?.map((edu, index) => (
                    <div key={index} className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                    <GraduationCap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Education #{index + 1}</h3>
                            </div>
                            {data.education!.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newEdu = data.education!.filter((_, i) => i !== index);
                                        setData('education', newEdu);
                                    }}
                                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors duration-200"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            )}
                            </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Institution <span className="text-orange-500">*</span>
                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.institution}
                                                    onChange={(e) => {
                                                        const newEdu = [...data.education!];
                                                        newEdu[index].institution = e.target.value;
                                                        setData('education', newEdu);
                                                    }}
                                    placeholder="University or school name"
                                    className="w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Degree <span className="text-orange-500">*</span>
                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={(e) => {
                                                        const newEdu = [...data.education!];
                                                        newEdu[index].degree = e.target.value;
                                                        setData('education', newEdu);
                                                    }}
                                    placeholder="Degree type"
                                    className="w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Field of Study <span className="text-orange-500">*</span>
                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.field}
                                                    onChange={(e) => {
                                                        const newEdu = [...data.education!];
                                                        newEdu[index].field = e.target.value;
                                                        setData('education', newEdu);
                                                    }}
                                    placeholder="Field of study"
                                    className="w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Graduation Date <span className="text-orange-500">*</span>
                                </label>
                                                <input
                                                    type="date"
                                                    value={edu.graduation_date}
                                                    onChange={(e) => {
                                                        const newEdu = [...data.education!];
                                                        newEdu[index].graduation_date = e.target.value;
                                                        setData('education', newEdu);
                                                    }}
                                    className="w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                <button
                    type="button"
                    onClick={addEducation}
                    className="flex w-full items-center justify-center space-x-2 rounded-xl border-2 border-dashed border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 px-6 py-4 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200"
                >
                    <Plus className="h-5 w-5" />
                    <span className="font-medium">Add Another Education</span>
                </button>
            </div>
        </div>
    );

    const renderSkillsAndCerts = () => (
        <div className="space-y-8">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30">
                    <Award className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Skills & Certifications</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Highlight your technical abilities</p>
                            </div>

            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                            <Sparkles className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Skills</h3>
                                </div>

                    <div className="space-y-3">
                                {data.skills?.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            value={skill}
                                            onChange={(e) => {
                                                const newSkills = [...data.skills!];
                                                newSkills[index] = e.target.value;
                                                setData('skills', newSkills);
                                            }}
                                    placeholder="Enter a skill"
                                    className="flex-1 rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                />
                                {data.skills!.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newSkills = data.skills!.filter((_, i) => i !== index);
                                            setData('skills', newSkills);
                                        }}
                                        className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors duration-200"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                                    </div>
                                ))}
                            </div>

                    <button
                        type="button"
                        onClick={addSkill}
                        className="mt-4 flex w-full items-center justify-center space-x-2 rounded-lg border border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 px-4 py-2.5 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200"
                    >
                        <Plus className="h-4 w-4" />
                        <span className="text-sm font-medium">Add Skill</span>
                                    </button>
                                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                            <Award className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Certifications</h3>
                    </div>

                    <div className="space-y-3">
                                {data.certifications?.map((cert, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            value={cert}
                                            onChange={(e) => {
                                                const newCerts = [...data.certifications!];
                                                newCerts[index] = e.target.value;
                                                setData('certifications', newCerts);
                                            }}
                                    placeholder="Enter a certification"
                                    className="flex-1 rounded-lg border-0 bg-gray-50 dark:bg-gray-700/50 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                />
                                {data.certifications!.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newCerts = data.certifications!.filter((_, i) => i !== index);
                                            setData('certifications', newCerts);
                                        }}
                                        className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors duration-200"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                                    </div>
                                ))}
                            </div>

                    <button
                        type="button"
                        onClick={addCertification}
                        className="mt-4 flex w-full items-center justify-center space-x-2 rounded-lg border border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 px-4 py-2.5 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200"
                    >
                        <Plus className="h-4 w-4" />
                        <span className="text-sm font-medium">Add Certification</span>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Profile" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-orange-900/10">
                <div className="mx-auto max-w-4xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-100/50 bg-white/80 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold tracking-tight text-orange-600 backdrop-blur-sm dark:border-orange-400/20 dark:bg-gray-900/80 dark:text-orange-300">
                            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 fill-orange-400/20 stroke-orange-500" />
                            <span>Professional Profile</span>
                        </div>
                        <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Create Your Profile
                        </h1>
                        <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
                            Build a compelling professional profile in just a few steps
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-6 sm:mb-8">
                        <div className="flex items-center justify-between overflow-x-auto pb-2">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isCompleted = index < currentStep;
                                const isCurrent = index === currentStep;
                                
                                return (
                                    <div key={step.id} className="flex items-center min-w-0">
                                        <div className="flex flex-col items-center min-w-0">
                                            <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                                isCompleted 
                                                    ? 'bg-orange-600 border-orange-600 text-white' 
                                                    : isCurrent 
                                                    ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-500 text-orange-600 dark:text-orange-400' 
                                                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                                            }`}>
                                                {isCompleted ? (
                                                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                                                ) : (
                                                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                                )}
                                            </div>
                                            <div className="mt-2 text-center min-w-0">
                                                <p className={`text-xs sm:text-sm font-medium ${isCurrent ? 'text-orange-600 dark:text-orange-400' : isCompleted ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    <span className="hidden xs:inline">{step.title}</span>
                                                    <span className="xs:hidden">{step.title.split(' ')[0]}</span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block max-w-20 truncate">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`hidden sm:block flex-1 h-0.5 mx-2 sm:mx-4 transition-all duration-300 ${
                                                isCompleted ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'
                                            }`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                        <div className="p-4 sm:p-6 lg:p-8">
                            <form onSubmit={handleSubmit}>
                                {renderStepContent()}

                                {/* Navigation */}
                                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        disabled={currentStep === 0}
                                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 sm:px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        <span>Previous</span>
                                    </button>

                                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                            Step {currentStep + 1} of {steps.length}
                                        </span>
                                        
                                        {currentStep < steps.length - 1 ? (
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={!isStepValid(currentStep)}
                                                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-4 sm:px-6 py-3 text-sm font-medium text-white shadow-lg hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                            >
                                                <span>Next</span>
                                                <ArrowLeft className="h-4 w-4 rotate-180" />
                                            </button>
                                        ) : (
                                <button
                                    type="submit"
                                                disabled={processing || !isStepValid(currentStep)}
                                                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 sm:px-6 py-3 text-sm font-medium text-white shadow-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                                <Save className="h-4 w-4" />
                                                <span>{processing ? 'Creating...' : 'Create Profile'}</span>
                                </button>
                                        )}
                                    </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </AppLayout>
    );
}