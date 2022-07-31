import { Link } from 'react-router-dom';

const Navbar = (): JSX.Element => {
  return (
    <div className="layout">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
