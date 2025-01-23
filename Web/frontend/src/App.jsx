import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout } from "./pages/HomeLayout";
import { Landing } from "./pages/Landing";
import { ContactUs } from "./pages/ContactUs";
import { AboutUs } from "./pages/AboutUs";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import ProductList from "./pages/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path:'/product-list',
        element: <ProductList/>
      }
    ],
  },
]);

function App() {
  return (
    <>
    <AuthContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthContextProvider>
    </>
  );
}

export default App;