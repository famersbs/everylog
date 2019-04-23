/// <reference types="react-scripts" />

interface AUTH_STATUS {
  isLogin: boolean | null; // null = yet request, true = logined, false = no logined
  photoURL?: string | null;
  uid?: string | null;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
}
