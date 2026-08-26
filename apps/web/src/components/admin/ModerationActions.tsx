
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { updatePropertyAction } from '@/actions/admin';
import { toast } from 'sonner';

interface ModerationActionsProps {
    id: string;
}

export function ModerationActions({ id }: ModerationActionsProps) {
    const [isApproveLoading, setIsApproveLoading] = useState(false);
    const [isRejectLoading, setIsRejectLoading] = useState(false);

    const handleAction = async (status: 'PUBLISHED' | 'REJECTED') => {
        const loadingSetter = status === 'PUBLISHED' ? setIsApproveLoading : setIsRejectLoading;
        loadingSetter(true);

        const formData = new FormData();
        formData.append('id', id);
        formData.append('status', status);

        const result = await updatePropertyAction(formData);

        if (result?.success) {
            toast.success(`Property ${status === 'PUBLISHED' ? 'Approved' : 'Rejected'} successfully`, {
                description: 'The listing status has been updated and live site revalidated.'
            });
        } else {
            toast.error(result?.error || 'Failed to update property status');
        }

        loadingSetter(false);
    };

    return (
        <div className="flex gap-2">
            <Button
                onClick={() => handleAction('PUBLISHED')}
                disabled={isApproveLoading || isRejectLoading}
                variant="ghost"
                className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all gap-2 min-w-[110px]"
            >
                {isApproveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Approve
            </Button>

            <Button
                onClick={() => handleAction('REJECTED')}
                disabled={isApproveLoading || isRejectLoading}
                variant="ghost"
                className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all gap-2 min-w-[110px]"
            >
                {isRejectLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                Reject
            </Button>
        </div>
    );
}
