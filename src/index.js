import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from "react-router-dom"
import router from './routes/router.js';
import AppRoutes from './routes/AppRoutes.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppRoutes />
            {/* <RouterProvider router={router} /> */}
        </BrowserRouter>
    </React.StrictMode>
);
