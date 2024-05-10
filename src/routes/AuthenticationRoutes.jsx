import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import UnAuthRoutes from 'configuraciones/guards/UnAuthRoutes';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <UnAuthRoutes component={<AuthLogin3 />}></UnAuthRoutes>
        }
    ]
};

export default AuthenticationRoutes;
