import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { useForm } from '@inertiajs/react';

interface Props {
    group?: {
        id: number;
        name: string;
        description: string | null;
    };
}

export default function Form({ group }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: group?.name || '',
        description: group?.description || '',
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (group) {
            put(route('contact-groups.update', group.id));
        } else {
            post(route('contact-groups.store'));
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{group ? 'Edit Group' : 'Create Group'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {group ? 'Update Group' : 'Create Group'}
                </Button>
            </div>
        </form>
    );
}
