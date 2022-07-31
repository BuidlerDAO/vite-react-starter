import { Navigate, Route } from 'react-router-dom';

const AuthRoute = (props: {
  [x: string]: any;
  user: { role: any };
  role: any;
  backUrl: any;
}): JSX.Element => {
  const {
    user: { role: userRole },
    role: routeRole,
    backUrl,
    ...otherProps
  } = props;

  // 如果用户有权限，就渲染对应的路由
  if (userRole && userRole.indexOf(routeRole) > -1) {
    return <Route {...otherProps} />;
  } else {
    // 如果没有权限，返回配置的默认路由
    return <Navigate to={backUrl} />;
  }
};

export default AuthRoute;
