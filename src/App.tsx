import Routes from '@/routes';
import { BrowserRouter } from 'react-router-dom';

import { AppSettingProvider } from '@/store/appSetting/context';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AppSettingProvider>
        <Routes />
      </AppSettingProvider>
    </BrowserRouter>
  );
};

export default App;
