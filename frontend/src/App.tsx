import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import 'antd/dist/reset.css';

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
export default App;