import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
// import MyTasks from "../pages/Mytasks/Mytasks";
import NewTask from "../pages/Newtasks/NewTask";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthLayouts from "../layouts/AuthLayouts";
import EditTask from "../pages/Edittask/EditTask";
import MyTasks from "../pages/Mytasks/Mytasks";


// import Login from "../pages/Login";


export default function AppRoutes() {
  
  
  const routes = [
    {
        path: "/",
      element: <RootLayout />,
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          path: "/alltask",
          element: <MyTasks />,
        },
         {
          path: "/newtask",
          element: <NewTask />,
        },
        {
          path: "/edittask/:id",
          element: <EditTask   />,
            // element: <EditTask  tasks={tasks} setTasks={setTasks} />,
        },

      ],
    },
    {
      element: <AuthLayouts />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

