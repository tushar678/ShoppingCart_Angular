export interface Menu {
  path: string;
  name: string;
}

export const menuList: Menu[] = [
  {
    path: '/products',
    name: 'Products'
  },
  {
    path: '/about',
    name: 'About'
  },
  {
    path: '/contact',
    name: 'Contact'
  },
  {
    path: '/dashboard',
    name: 'Dashboard'
  },
  {
    path: '/cart',
    name: 'Cart'
  }
  // {
  //   path: '/Review',
  //   name: 'Order'
  // },
  // {
  //   path: '/doc',
  //   name: 'Doc'
  // }
];
