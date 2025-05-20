import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useForm } from '@inertiajs/react';

interface Group {
    id: number;
    name: string;
}

interface Props {
    contact?: {
        id: number;
        name: string;
        phone: string | null;
        email: string | null;
        custom_fields: Record<string, string>;
        groups: Group[];
    };
    groups: Group[];
}

export default function Form({ contact, groups }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: contact?.name || '',
        phone: contact?.phone || '',
        email: contact?.email || '',
        custom_fields: contact?.custom_fields || {},
        group_ids: contact?.groups.map((g) => g.id) || [],
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (contact) {
            put(route('contacts.update', contact.id));
        } else {
            post(route('contacts.store'));
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{contact ? 'Edit Contact' : 'Create Contact'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Groups</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {groups.map((group) => (
                                <div key={group.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`group-${group.id}`}
                                        checked={data.group_ids.includes(group.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setData('group_ids', [...data.group_ids, group.id]);
                                            } else {
                                                setData(
                                                    'group_ids',
                                                    data.group_ids.filter((id) => id !== group.id),
                                                );
                                            }
                                        }}
                                    />
                                    <Label htmlFor={`group-${group.id}`}>{group.name}</Label>
                                </div>
                            ))}
                        </div>
                        {errors.group_ids && <p className="text-sm text-red-500">{errors.group_ids}</p>}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {contact ? 'Update Contact' : 'Create Contact'}
                </Button>
            </div>
        </form>
    );
}
