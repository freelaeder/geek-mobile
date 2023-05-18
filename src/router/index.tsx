import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Home from "@pages/home";
import LoginPage from "@pages/login";
import MainLayout from "@shared/mainLayout";
import Question from "@pages/question";
import Video from "@pages/video";
import Mine from "@pages/mine";
import AuthRoute from "@router/authRoute";
import Personal from "@pages/personal";
import Search from "@pages/search";
import SearchResult from "@pages/searchResult";
import Article from "@pages/article";


export const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>,
        children: [
            {
                path: "",
                element: <Navigate to={'/0'}/>,
            },
            {
                path: ":cid",
                element: <Home/>,
            },
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
    },
    {
        path:'/search',element:<Search />
    },
    {
        path:'/search/:key',element:<SearchResult />
    },
    {
        path:'/article/:id',element:<Article />
    }

])


export default function AppRouter() {
    return <RouterProvider router={router}/>
}