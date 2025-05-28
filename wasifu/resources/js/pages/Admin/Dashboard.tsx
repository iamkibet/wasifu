import AdminLayout from '@/layouts/admin-layout';
import { PageProps, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props extends PageProps {
    users: {
        data: User[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function Dashboard({ auth, users }: Props) {
    const [processing, setProcessing] = useState(false);

    const handleRoleUpdate = (userId: number, newRole: string) => {
        setProcessing(true);
        router.post(
            `/admin/users/${userId}/role`,
            { role: newRole },
            {
                onSuccess: () => {
                    toast.success('User role updated successfully');
                    setProcessing(false);
                },
                onError: () => {
                    toast.error('Failed to update user role');
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <AdminLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Admin Dashboard</h2>}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium">User Management</h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {users.data.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                            user.role === 'admin'
                                                                ? 'bg-purple-100 text-purple-800'
                                                                : user.role === 'pro'
                                                                  ? 'bg-green-100 text-green-800'
                                                                  : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                                                        disabled={processing}
                                                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="pro">Pro</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-4">
                                {users.links && (
                                    <div className="flex items-center justify-between">
                                        {users.links.map((link, i) => (
                                            <button
                                                key={i}
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                                className={`rounded-md px-4 py-2 text-sm font-medium ${
                                                    link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
