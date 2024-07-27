import { ConfigProvider, theme } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/reset.css';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider theme={{ algorithm: theme.compactAlgorithm }}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
