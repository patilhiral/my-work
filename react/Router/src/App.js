import {createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home';
import ProductPage from './pages/Product';
import RouteLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetail from './pages/ProductDetails';
const router = createBrowserRouter([
  {
    path:'/',
    element:<RouteLayout></RouteLayout>,
    errorElement:<ErrorPage/>,
    children:[
      {path:'/',element:<HomePage/>},
      {path:'/products',element:<ProductPage/>},
      {path:'/products/:productId',element:<ProductDetail/>}

    ]
  },
  
])
function App() {
  return <RouterProvider router={router} />;
}

export default App;
