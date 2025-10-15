import AdminLayout from '@/layouts/admin-layout';
import { SharedData } from '@/types';
import { User } from '@/types/index.d';
import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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

    // Handle URL parameters for tab navigation
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');
        if (tab && ['overview', 'users', 'payments', 'documents', 'emails', 'system'].includes(tab)) {
            setActiveTab(tab);
        }
    }, []);

    // Handle tab change and update URL
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        const url = new URL(window.location.href);
        if (tabId === 'overview') {
            url.searchParams.delete('tab');
        } else {
            url.searchParams.set('tab', tabId);
        }
        window.history.replaceState({}, '', url.toString());
    };

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
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Users</dt>
                                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalUsers || 0}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                                    <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Subscriptions</dt>
                                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.activeSubscriptions || 0}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                                    <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Monthly Revenue</dt>
                                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">${stats?.monthlyRevenue || 0}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                    <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Documents Generated</dt>
                                    <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.documentsGenerated || 0}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">User Growth</h3>
                    <div className="h-64 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <div className="text-center">
                            <TrendingUp className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                            <p className="text-gray-500 dark:text-gray-400">Chart will be implemented here</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
                    <div className="h-64 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <div className="text-center">
                            <BarChart3 className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                            <p className="text-gray-500 dark:text-gray-400">Chart will be implemented here</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-5">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                            <div className="flex-shrink-0">
                                <UserPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 dark:text-white">New user registered: john.doe@example.com</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                            <div className="flex-shrink-0">
                                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 dark:text-white">Document generated for Software Engineer position</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                            <div className="flex-shrink-0">
                                <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 dark:text-white">Pro subscription activated for jane.smith@example.com</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">10 minutes ago</p>
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
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="inline-flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </button>
                        <button className="inline-flex items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add User
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Users ({filteredUsers.length})</h3>
                        {selectedUsers.length > 0 && (
                            <div className="flex gap-2">
                                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors duration-200">
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete Selected
                                </button>
                                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                                    <Send className="h-4 w-4 mr-1" />
                                    Send Email
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 dark:border-gray-600 text-orange-600 focus:ring-orange-500 dark:bg-gray-700"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedUsers(filteredUsers.map(u => u.id));
                                                } else {
                                                    setSelectedUsers([]);
                                                }
                                            }}
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400 uppercase">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400 uppercase">Joined</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className={selectedUsers.includes(user.id) ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}>
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
                                                className="rounded border-gray-300 dark:border-gray-600 text-orange-600 focus:ring-orange-500 dark:bg-gray-700"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-white">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-gray-100">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                                                disabled={processing}
                                                className="inline-flex rounded-lg px-3 py-1 text-xs leading-5 font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex rounded-full px-2 py-1 text-xs leading-5 font-semibold bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200">
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
                    <div className="mt-6">
                        {users.links && (
                            <div className="flex items-center justify-between">
                                {users.links.map((link, i) => (
                                    <button
                                        key={i}
                                        onClick={() => link.url && router.get(link.url)}
                                        disabled={!link.url}
                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                            link.active 
                                                ? 'bg-orange-600 text-white' 
                                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
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
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Management</h3>
                <div className="text-center py-16">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20 mx-auto mb-4">
                        <CreditCard className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Payment management interface will be implemented here</p>
                </div>
            </div>
        </div>
    );

    const renderDocuments = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Document Management</h3>
                <div className="text-center py-16">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20 mx-auto mb-4">
                        <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Document management interface will be implemented here</p>
                </div>
            </div>
        </div>
    );

    const renderEmails = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Email Template Management</h3>
                <div className="text-center py-16">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 mx-auto mb-4">
                        <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Email template management will be implemented here</p>
                </div>
            </div>
        </div>
    );

    const renderSystem = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">System Management</h3>
                <div className="text-center py-16">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mx-auto mb-4">
                        <Settings className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">System management interface will be implemented here</p>
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
        <AdminLayout breadcrumbs={[
            { title: 'Admin', href: '/admin-dashboard' },
            { title: 'Dashboard', href: '/admin-dashboard' }
        ]}>
            <Head title="Admin Dashboard" />

            <div className="p-6">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Monitor and manage your application</p>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        className={`${
                                            activeTab === tab.id
                                                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-200`}
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
        </AdminLayout>
    );
}
