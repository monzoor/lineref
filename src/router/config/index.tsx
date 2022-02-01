import type { RouteObject } from 'react-router-dom';

import { PAGES } from '@constants/pages';

import Public from '@components/Layouts/Public';

import Home from '@containers/Home';
import NotFound from '@containers/NotFound';

let routes: RouteObject[] = [
  {
    path: PAGES.HOME,
    element: <Public />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
