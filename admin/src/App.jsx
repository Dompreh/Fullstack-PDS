import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Parcel from './pages/Parcel'
import Parcels from './pages/Parcels'
import Users from './pages/Users'
import NewUser from './pages/NewUser'
import NewParcel from './pages/NewParcel'
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import Footer from './components/Footer'

function App() {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="flex">
          <div className="w-[20%]">
            <Menu />
          </div>
          <div className="w-[80%]">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/parcel/:parcelId",
          element: <Parcel />,
        },
        {
          path: "/parcels",
          element: <Parcels />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/newparcel",
          element: <NewParcel />,
        },
        {
          path: "/newUser",
          element: <NewUser />,
        },
      ]
    },
  
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
