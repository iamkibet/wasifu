import AdminLayout from '@/layouts/admin-layout';
import { SharedData } from '@/types';
import { User } from '@/types/index.d';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { 
    Users, 
    DollarSign, 
    FileText, 
    Mail, 
    Settings, 
    BarChart3, 
    TrendingUp,
    UserPlus,
    CreditCard,
    MessageSquare,
    Database,
    Activity,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Download,
    Send
} from 'lucide-react';

interface Props {
    users: {
        data: User[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    stats?: {
        totalUsers: number;
        activeSubscriptions: number;
        monthlyRevenue: number;
        documentsGenerated: number;
        newUsersThisMonth: number;
        conversionRate: number;
    };
}

export default function Dashboard({ users, stats }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [processing, setProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

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

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'emails', label: 'Email Templates', icon: Mail },
        { id: 'system', label: 'System', icon: Settings },
    ];

    const filteredUsers = users.data.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Users className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                    <dd className="text-lg font-medium text-gray-900">{stats?.totalUsers || 0}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CreditCard className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Active Subscriptions</dt>
                                    <dd className="text-lg font-medium text-gray-900">{stats?.activeSubscriptions || 0}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <DollarSign className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                                    <dd className="text-lg font-medium text-gray-900">${stats?.monthlyRevenue || 0}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FileText className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Documents Generated</dt>
                                    <dd className="text-lg font-medium text-gray-900">{stats?.documentsGenerated || 0}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <div className="text-center">
                            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Chart will be implemented here</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <div className="text-center">
                            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Chart will be implemented here</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <UserPlus className="h-5 w-5 text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900">New user registered: john.doe@example.com</p>
                                <p className="text-xs text-gray-500">2 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <FileText className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900">Document generated for Software Engineer position</p>
                                <p className="text-xs text-gray-500">5 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <CreditCard className="h-5 w-5 text-purple-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900">Pro subscription activated for jane.smith@example.com</p>
                                <p className="text-xs text-gray-500">10 minutes ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add User
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Users ({filteredUsers.length})</h3>
                        {selectedUsers.length > 0 && (
                            <div className="flex gap-2">
                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete Selected
                                </button>
                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                    <Send className="h-4 w-4 mr-1" />
                                    Send Email
                                </button>
                            </div>
                        )}
                    </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedUsers(filteredUsers.map(u => u.id));
                                                } else {
                                                    setSelectedUsers([]);
                                                }
                                            }}
                                        />
                                    </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Joined</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className={selectedUsers.includes(user.id) ? 'bg-blue-50' : ''}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedUsers([...selectedUsers, user.id]);
                                                    } else {
                                                        setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                                    }
                                                }}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                                                        disabled={processing}
                                                className="inline-flex rounded-full px-2 text-xs leading-5 font-semibold border-0 bg-transparent focus:ring-0"
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex rounded-full px-2 text-xs leading-5 font-semibold bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button className="text-indigo-600 hover:text-indigo-900">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
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
    );

    const renderPayments = () => (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Management</h3>
                <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Payment management interface will be implemented here</p>
                </div>
            </div>
        </div>
    );

    const renderDocuments = () => (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Document Management</h3>
                <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Document management interface will be implemented here</p>
                </div>
            </div>
        </div>
    );

    const renderEmails = () => (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Email Template Management</h3>
                <div className="text-center py-12">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Email template management will be implemented here</p>
                </div>
            </div>
        </div>
    );

    const renderSystem = () => (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Management</h3>
                <div className="text-center py-12">
                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">System management interface will be implemented here</p>
                </div>
            </div>
        </div>
    );

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'users':
                return renderUsers();
            case 'payments':
                return renderPayments();
            case 'documents':
                return renderDocuments();
            case 'emails':
                return renderEmails();
            case 'system':
                return renderSystem();
            default:
                return renderOverview();
        }
    };

    return (
        <AdminLayout user={auth.user as User} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Admin Dashboard</h2>}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Tab Navigation */}
                    <div className="bg-white shadow rounded-lg mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`${
                                                activeTab === tab.id
                                                    ? 'border-indigo-500 text-indigo-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                                        >
                                            <Icon className="h-5 w-5 mr-2" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Tab Content */}
                    {renderActiveTab()}
                </div>
            </div>
        </AdminLayout>
    );
}
