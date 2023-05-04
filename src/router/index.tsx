import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "@pages/home";


export const router = createBrowserRouter([
    {path: '', element: <Home/>}
])


export default function AppRouter() {
    return <RouterProvider router={router}/>
}