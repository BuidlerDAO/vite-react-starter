import { lazy } from 'react';

// project imports
import Loadable from '@/components/Loadable';

const Login = Loadable(lazy(() => import('@/pages/login')));

const AuthenticationRoutes = {
  path: '/',
  children: [
    {
      path: '/login',
      element: <Login />
    }
  ]
};

export default AuthenticationRoutes;
