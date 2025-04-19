export interface NavLink {
  id: 'home' | 'about';
  url: string;
}

export const AllLinks: NavLink[] = [
  {
    id: 'home',
    url: '/',
  },
  {
    id: 'about',
    url: '/about',
  },
];
