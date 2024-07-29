import React from "react";
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListEmployeeComponent from './components/ListEmployeeComponent';
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListEmployeeComponent/>,
  },
 
  {
    path: "employees",
    element: <ListEmployeeComponent/>
  },
  {
    path: "add-employee/:id",
    element: <CreateEmployeeComponent/>
  },
  {
    path: "view-employee/:id",
    element: <ViewEmployeeComponent/>
  },
]);

function App() {
  return (
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  );
}

export default App;
