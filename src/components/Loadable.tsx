import { ComponentType, LazyExoticComponent, Suspense } from 'react';

// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
  (Component: LazyExoticComponent<ComponentType<any>>) =>
  // eslint-disable-next-line react/display-name
  (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );

export default Loadable;
