import { Outlet } from 'react-router-dom';
import Navbar from '../navbar';

const Layout = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
