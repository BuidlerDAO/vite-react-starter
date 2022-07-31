import { useCallback, useContext } from 'react';
import { Auth, Theme } from './reducer';
import { AppSettingContext } from './context';

export function useAppSetting() {
  const [{ theme, i18n, auth }, dispatch] = useContext(AppSettingContext);

  const setTheme = useCallback(
    (theme: Theme) => dispatch('setTheme', theme),
    []
  );

  const setAuth = useCallback((auth: Auth) => dispatch('setAuth', auth), []);

  return {
    appSetting: {
      theme,
      i18n,
      auth
    },
    theme,
    i18n,
    auth,
    setTheme,
    setAuth
  };
}
