import React, { lazy } from 'react';
import { Container, Nav, Navbar, Card } from 'react-bootstrap';

import { Outlet, RouterProvider, Link, Router, Route, RootRoute } from '@tanstack/react-router';

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
  <Container>
    <Navigation />

    <Outlet />
  </Container>
);

const apps = [
  {
    name: 'blog',
    path: '/blog',
    script: 'http://localhost:9001/dist/app.js',
  },
  {
    name: 'shop',
    path: '/shop',
    script: 'http://localhost:9002/dist/app.js',
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

const root = new RootRoute({ component: Root });

const router = new Router({
  routeTree: root.addChildren([
    new Route({
      path: '/',
      component: Home,
      getParentRoute: () => root,
    }),

    ...apps.map(
      (app) =>
        new Route({
          path: app.path,
          component: lazy(() => import(/* @vite-ignore */ app.script)),
          getParentRoute: () => root,
        }),
    ),
  ]),
});

const App = () => <RouterProvider router={router} />;

export default App;
