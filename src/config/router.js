import { useEffect, useState } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    Navigate
} from "react-router-dom";

import LoginPage from "../Screen/LoginScreen/index";
import Home from '../Screen/HomeScreen/index';
import Company from '../Screen/Company';
import AddToken from '../Screen/AddToken';
import CompanyDetails from "../Screen/CompanyDetails";

export default function Router() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/company" element={<Company />} />
                <Route path="/AddToken" element={<AddToken />} />
                <Route path="/CompanyDetails" element={<CompanyDetails />} />
            </>
        ) 
    )

    return <RouterProvider router={router} />

}

// export {
//     Router
// }
