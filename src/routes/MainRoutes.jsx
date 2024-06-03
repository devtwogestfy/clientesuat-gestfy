import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'settings/guards/AuthGuards';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const DocumentsPage = Loadable(lazy(() => import('views/pages/documents/DocumentsPage')));
const InvoicesPage = Loadable(lazy(() => import('views/pages/invoices/InvoicesPage')));
const IncidentsPage = Loadable(lazy(() => import('views/pages/incidents/IncidentsPage')));
const ServicesPage = Loadable(lazy(() => import('views/pages/services/ServicesPage')));
const ProfileViewPage = Loadable(lazy(() => import('views/pages/profile/profileViewPage')));
const PhoneRecordsPage = Loadable(lazy(() => import('views/pages/services/phoneRecords/PhoneRecordsPage')));
const RouterPage = Loadable(lazy(() => import('views/pages/services/router/RouterPage')));
const PrepaysPage = Loadable(lazy(() => import('views/pages/services/prepays/PrepaysPage')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <AuthGuard component={<MainLayout />}></AuthGuard>,
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
    },
    {
      path: 'services',
      children: [
        {
          path: 'phone-records/:id',
          element: <AuthGuard component={<PhoneRecordsPage />}></AuthGuard>
        },
        {
          path: 'prepays/:id',
          element: <AuthGuard component={<PrepaysPage />}></AuthGuard>
        },
        {
          path: 'router/:id',
          element: <AuthGuard component={<RouterPage />}></AuthGuard>
        }
      ]
    }
  ]
};

export default MainRoutes;
