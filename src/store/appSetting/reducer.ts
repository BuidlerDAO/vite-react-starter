export function AppSettingReducer(
  state: AppSettingState,
  action: Actions
): AppSettingState {
  switch (action.type) {
    case 'setTheme':
      return {
        ...state,
        theme: action.payload
      };

    case 'setI18n':
      return {
        ...state,
        i18n: action.payload
      };
    case 'setAuth':
      return {
        ...state,
        auth: action.payload
      };
  }
}

export interface Theme {
  mode: string;
}

export interface I18n {
  lang: string;
}

export interface Auth {
  address: string;
  uid: string;
  role: number;
}

export type AppSettingState = {
  theme: Theme;
  i18n: I18n;
  auth: Auth;
};

export type ActionsMap = {
  setTheme: Theme;
  setI18n: I18n;
  setAuth: Auth;
};

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload: ActionsMap[Key];
  };
}[keyof ActionsMap];
