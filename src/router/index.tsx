import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "@pages/home";
import LoginPage from "@pages/login";


export const router = createBrowserRouter([
    {path: '', element: <Home/>},
    {path:'/login',element:<LoginPage />}
])


export default function AppRouter() {
    return <RouterProvider router={router}/>
}