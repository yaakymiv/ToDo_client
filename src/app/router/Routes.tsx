import { createBrowserRouter } from "react-router-dom";
import App from "../layout/app/App";
import HomePage from "../../features/HomePage/HomePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
        ],
    },
]);
