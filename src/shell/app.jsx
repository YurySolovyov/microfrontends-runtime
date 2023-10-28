import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Outlet, RouterProvider, Link, Router, Route, RootRoute } from '@tanstack/react-router';
import { lazy } from 'react';

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

const root = new RootRoute({ component: Root });

const router = new Router({
  routeTree: root.addChildren([
    new Route({
      path: '/',
      component: lazy(() => import('./home')),
      getParentRoute: () => root,
    }),

    new Route({
      path: '/shop',
      component: lazy(() => import('./shop')),
      getParentRoute: () => root,
    }),

    new Route({
      path: '/blog',
      component: lazy(() => import('./blog')),
      getParentRoute: () => root,
    }),
  ]),
});

const App = () => <RouterProvider router={router} />;

export default App;
