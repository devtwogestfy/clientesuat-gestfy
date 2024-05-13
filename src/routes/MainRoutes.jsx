import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'configuraciones/guards/AuthGuards';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const DocumentsPage = Loadable(lazy(() => import('views/pages/documents/DocumentsPage')));
const InvoicesPage = Loadable(lazy(() => import('views/pages/invoices/InvoicesPage')));
const IncidentsPage = Loadable(lazy(() => import('views/pages/incidents/IncidentsPage')));
const ServicesPage = Loadable(lazy(() => import('views/pages/services/ServicesPage')));
const ProfileViewPage = Loadable(lazy(() => import('views/pages/profile/profileViewPage')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <AuthGuard component={<DashboardDefault />}></AuthGuard>
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'documents',
            element: <DocumentsPage />
        },
        {
            path: 'invoices',
            element: <InvoicesPage />
        },
        {
            path: 'incidents',
            element: <IncidentsPage />
        },
        {
            path: 'profile',
            element: <ProfileViewPage />
        },
        {
            path: 'services',
            element: <ServicesPage />
        }
    ]
};

export default MainRoutes;
