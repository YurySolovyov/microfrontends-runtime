import React, { lazy, Suspense } from 'react';
import { Container, Nav, Navbar, Card } from 'react-bootstrap';

import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';

import Deferred from './deferred.jsx';

const Navigation = () => (
  <Navbar>
    <Container>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/shop">
            Shop
          </Nav.Link>
          <Nav.Link as={Link} to="/blog">
            Blog
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const Root = () => (
  <React.StrictMode>
    <Container>
      <Navigation />

      <Outlet />
    </Container>
  </React.StrictMode>
);

const apps = [
  {
    name: 'blog',
    path: '/blog',
    script: 'http://localhost:9001/blog/index.js',
  },
  {
    name: 'shop',
    path: '/shop',
    script: 'http://localhost:9002/shop/index.js',
  },
];

const Home = () => {
  return (
    <div>
      <Card className="p-3">Hello App</Card>

      <Card className="mt-3 p-3">
        <Deferred value="hello" />
      </Card>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Root />,
    path: '/',

    children: [
      {
        index: true,
        element: <Home />,
      },

      ...apps.map((app) => {
        const Component = lazy(() => import(app.script));

        return {
          path: app.path,
          element: (
            <Suspense fallback={<p>Loading... {app.name}</p>}>
              <Component />
            </Suspense>
          ),
        };
      }),
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
