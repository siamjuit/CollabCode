"use client"

import React from 'react';
import {useAuth} from "@/features/auth/hooks/use-auth";
import {redirect} from "next/navigation";

interface Props {
    children: React.ReactNode;
}

const Layout = ({
    children
}: Props) => {

    const {isAuthenticated} = useAuth();

    if( !isAuthenticated ){
        redirect("/sign-in")
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;
