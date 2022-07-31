import { createContext, ReactNode, useCallback, useReducer } from 'react';
import {
  Actions,
  ActionsMap,
  AppSettingReducer,
  AppSettingState,
  Auth,
  I18n,
  Theme
} from './reducer';

export type Dispatcher = <
  Type extends Actions['type'],
  Payload extends ActionsMap[Type]
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

export type AppSettingContextInterface = readonly [AppSettingState, Dispatcher];

const initTheme: Theme = {
  mode: 'light'
};

const initI18n: I18n = {
  lang: navigator.language || 'en-US'
};

const initAuth: Auth = {
  address: '',
  uid: '',
  role: 0
};

export const AppSettingContext = createContext<AppSettingContextInterface>([
  { theme: initTheme, i18n: initI18n, auth: initAuth },
  () => null
]);

export function AppSettingProvider({ children }: { children: ReactNode }) {
  const [state, _dispatch] = useReducer(AppSettingReducer, {
    theme: initTheme,
    i18n: initI18n,
    auth: initAuth
  });

  const dispatch: Dispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as Actions);
  }, []);
  return (
    <AppSettingContext.Provider value={[state, dispatch]}>
      {children}
    </AppSettingContext.Provider>
  );
}
