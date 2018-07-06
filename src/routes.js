import About from './components/About';
import Contact from './components/Contact';
import Secret from './components/Secret';
import TopAnime from './components/TopAnime';
import AnimeDetail from './components/AnimeDetail';

export default [
  {
    path: '/',
    component: TopAnime,
    exact: true,
  },
  {
    path: '/anime/:malId',
    component: AnimeDetail,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '/contact',
    component: Contact,
    exact: true,
  },
  {
    path: '/secret',
    component: Secret,
    exact: true,
  },
];
