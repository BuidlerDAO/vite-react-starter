import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Layout from '@/components/layout';

import Loadable from '@/components/Loadable';

const Admin = Loadable(lazy(() => import('@/pages/admin')));
const Home = Loadable(lazy(() => import('@/pages/home')));

const MainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/home" />
    },
    {
      path: '/admin',
      element: <Admin />
    },
    {
      path: '/home',
      element: <Home />
    }
  ]
};

export default MainRoutes;
