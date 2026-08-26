'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { deletePropertyAction } from '@/actions/properties';
import { toast } from 'sonner';

export default function DeletePropertyButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        // Rule: SOFT DELETE (Safety Check)
        if (!confirm('ARCHIVE LISTING? \n\nThis property will be hidden from public search but retained in your archives. Proceed?')) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await deletePropertyAction(id);
            if (result?.error) {
                toast.error(result.error);
                setIsDeleting(false);
            } else {
                toast.success('Listing Archived', {
                    description: 'Property has been moved to soft-delete state.'
                });
            }
        } catch (error) {
            toast.error('Failed to process archive request');
            setIsDeleting(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete Listing"
        >
            {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Trash2 className="w-4 h-4" />
            )}
        </Button>
    );
}
