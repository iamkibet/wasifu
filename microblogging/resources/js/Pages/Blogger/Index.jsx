import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import Blogger from "@/Components/blogger";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Index({ auth, bloggers }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("blogger.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Blogger" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("message", e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Blog
                    </PrimaryButton>
                </form>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {bloggers.map((blogger) => (
                        <Blogger key={blogger.id} blogger={blogger} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
