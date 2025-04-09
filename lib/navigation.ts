export interface NavLink {
  id: 'home' | 'blog';
  url: string;
}

export const AllLinks: NavLink[] = [
  {
    id: 'home',
    url: '/',
  },
  {
    id: 'blog',
    url: '/blog',
  },
];
