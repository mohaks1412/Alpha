import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store/store.js"
const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
<Auth0Provider
    domain="dev-7u4xs4ynhkypv4wz.us.auth0.com"
    clientId="HMWygDctTO8WJ9sifUAbSLr4YLJhih4E"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </Provider>
);