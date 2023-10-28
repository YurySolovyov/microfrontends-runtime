import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';

import { Outlet, RouterProvider, Link, Router, Route, RootRoute } from '@tanstack/react-router';

const Navigation = () => {
  return (
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
};

function Root() {
  return (
    <Container>
      <Navigation />

      <Outlet />
    </Container>
  );
}

const root = new RootRoute({
  component: Root,
});

const Index = () => {
  return <Card className="p-3">Hello App</Card>;
};

const Shop = () => {
  return <Card className="p-3">Shop</Card>;
};

const Blog = () => {
  return <Card className="p-3">Blog</Card>;
};

// Create the router using your route tree
const router = new Router({
  routeTree: root.addChildren([
    new Route({
      getParentRoute: () => root,
      path: '/',
      component: Index,
    }),

    new Route({
      getParentRoute: () => root,
      path: '/shop',
      component: Shop,
    }),

    new Route({
      getParentRoute: () => root,
      path: '/blog',
      component: Blog,
    }),
  ]),
});

// Create an index route

const App = () => <RouterProvider router={router} />;

export default App;
