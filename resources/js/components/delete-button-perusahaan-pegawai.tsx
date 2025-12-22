import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';

export default function DeleteButton({ perusahaanId, id, featured, childId, childfeature }: { perusahaanId: string | number, id: number, featured: string, childId:  string | number, childfeature: string}) {

    const handleDelete = () => {
        const deletes = new Promise((resolve, reject) => {
            router.delete(`/dashboard-perusahaan/${perusahaanId}/${featured}/${id}/${childfeature}/${childId}/delete`, {
                onSuccess: () => resolve(true),
                onError: () => reject(false),
            });
        });

        toast.promise(deletes, {
            loading: `Deleting ${childfeature}...`,
            success: `${childfeature.charAt(0).toUpperCase() + childfeature.slice(1)} deleted successfully`,
            error: `Failed to delete ${childfeature}`,
        });
    };



    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="hover:bg-red-200 hover:text-red-600"><Trash /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the {childfeature} .
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant="default" className='hover:bg-red-700 hover:text-white' onClick={handleDelete}>Continue</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
