import { useRoutes } from 'react-router-dom';
import config from '@/configs/base';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes], config.basename);
}
