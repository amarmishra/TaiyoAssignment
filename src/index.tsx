import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import contactReducer from './store/reducers/contacts'
//import React-Redux provider
import { Provider } from 'react-redux';
//import reactquery Provider
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const store=createStore(contactReducer)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
      <Provider store={store}>  
        <App />
      </Provider>
    </QueryClientProvider>
    </Router>
  // </React.StrictMode>
);

