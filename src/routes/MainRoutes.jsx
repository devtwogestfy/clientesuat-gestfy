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
                    element: <AuthGuard component={<DashboardDefault />}></AuthGuard>
                }
            ]
        },
        {
            path: 'documents',
            element: <AuthGuard component={<DocumentsPage />}></AuthGuard>
        },
        {
            path: 'invoices',
            element: <AuthGuard component={<InvoicesPage />}></AuthGuard>
        },
        {
            path: 'incidents',
            element: <AuthGuard component={<IncidentsPage />}></AuthGuard>
        },
        {
            path: 'profile',
            element: <AuthGuard component={<ProfileViewPage />}></AuthGuard>
        },
        {
            path: 'services',
            element: <AuthGuard component={<ServicesPage />}></AuthGuard>
        }
    ]
};

export default MainRoutes;
