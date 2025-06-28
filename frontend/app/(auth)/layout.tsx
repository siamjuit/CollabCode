import React from 'react';
import Header from "@/features/landing/components/header";

interface Props {
    children: React.ReactNode;
}

const Layout = ({
    children
}: Props) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default Layout;
