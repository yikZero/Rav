export interface NavLink {
  id: 'home' | 'blog' | 'stack';
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
  {
    id: 'stack',
    url: '/stack',
  },
];
