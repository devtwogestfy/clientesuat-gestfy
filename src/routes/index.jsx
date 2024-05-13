import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import NotFoundPage from 'views/pages/notFoundPage/NotFoundPage';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, LoginRoutes, { path: '*', element: <NotFoundPage /> }], {
    basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
