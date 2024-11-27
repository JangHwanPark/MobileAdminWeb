import {StrictMode} from 'react'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";

import App from './App.tsx'
import Home from "./Home/pages/Home.tsx";
import Company from "./Company/pages/Company.tsx";
import User from "./User/pages/User.tsx";
import Question from "./Question/pages/Question.tsx";

// React Router Dom 설정
const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {index: true, element: <Home />},
            {path: '/user', element: <User />},
            {path: '/company', element: <Company />},
            {path: '/question', element: <Question />},
        ],
    },
];

// 라우터 생성
const router = createBrowserRouter(routes);

// React Query Client 생성
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
)
