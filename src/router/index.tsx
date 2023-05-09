import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "@pages/home";
import LoginPage from "@pages/login";
import MainLayout from "@shared/mainLayout";
import Question from "@pages/question";
import Video from "@pages/video";
import Mine from "@pages/mine";
import AuthRoute from "@router/authRoute";
import Personal from "@pages/personal";


export const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: 'home', element: <Home/>},
            {
                path: 'question', element: <Question/>
            },
            {path: 'video', element: <Video/>},
            {
                path: 'mine', element: <AuthRoute>
                    <Mine/>
                </AuthRoute>
            }

        ]
    },
    {path: '/login', element: <LoginPage/>},
    {
        path: '/person', element: <Personal/>
    }
])


export default function AppRouter() {
    return <RouterProvider router={router}/>
}