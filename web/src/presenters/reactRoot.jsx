import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutTheGroupMembersView from './AboutTheGroupMembersView';

function AppRouter() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AboutTheGroupMembersView />,
        },
        // You can add more routes here as needed
    ]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default AppRouter;
