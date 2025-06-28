import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface Props {
    title: string;
    description: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClick: () => void
}

const Alert = ({
    title,
    description,
    open,
    onOpenChange,
    onClick
}: Props) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-gray-900 border-gray-800">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white font-bold">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-800  text-gray-300 hover:bg-gray-700 hover:text-white">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onClick}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Delete Room
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Alert;
