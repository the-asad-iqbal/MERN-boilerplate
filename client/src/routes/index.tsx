import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Home'
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import EmailVerification from '@/components/EmailVerification';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/verify-email/:token',
        element: <EmailVerification />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
