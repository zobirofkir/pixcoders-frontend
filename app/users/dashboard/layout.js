'use client';

import ProtectedRouteCommon from "@/components/common/ProtectedRouteCommon";

export default function DashboardLayout({ children }) {
    return (
        <ProtectedRouteCommon>
            {children}
        </ProtectedRouteCommon>
    );
}
