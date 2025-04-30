export interface NavLink {
  id: 'home' | 'blog' | 'talk';
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
    id: 'talk',
    url: '/talk',
  },
];
