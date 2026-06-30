export type NavigationItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNavigation: NavigationItem[] = [
  {
    label: 'Association',
    href: '/association/',
    description: 'About the association, history, presidium, and membership.',
  },
  {
    label: 'News',
    href: '/news/',
    description: 'Updates, announcements, and professional community news.',
  },
  {
    label: 'Events',
    href: '/events/',
    description: 'Conferences, meetings, lectures, and educational events.',
  },
  {
    label: 'Projects',
    href: '/projects/',
    description: 'Association initiatives and public medical projects.',
  },
  {
    label: 'Documents',
    href: '/documents/',
    description: 'Regulations, protocols, reports, and useful materials.',
  },
  {
    label: 'Contacts',
    href: '/contacts/',
    description: 'Contact information and communication channels.',
  },
];

export const languageNavigation: NavigationItem[] = [
  {
    label: 'UA',
    href: '/',
  },
  {
    label: 'EN',
    href: '/en/',
  },
];