import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import NavBar from './components/navBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    id: 'home',
  },
  {
    path: '/about',
    element: (
      <>
        <NavBar />
        <div>About</div>
      </>
    ),
    id: 'about',
  },
]);

export default router;
