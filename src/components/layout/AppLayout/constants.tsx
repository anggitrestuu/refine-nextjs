import Iconify from '@components/iconify'
import { NavItem } from './types'

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    href: '/home',
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    ariaLabel: 'Go to home page',
  },
  {
    href: '/agents',
    title: 'Manage Agents',
    icon: <Iconify icon="eva:people-fill" />,
    ariaLabel: 'Open manage agents',
  },
  {
    href: '/app/workspace?layoutId=chatWorkroomGallery',
    title: 'Workspace',
    icon: <Iconify icon="eva:grid-fill" />,
    ariaLabel: 'Open workspace',
  },
]

/**
 * Footer navigation items for the sidebar
 */
export const FOOTER_NAV_ITEMS: NavItem[] = [
  {
    href: '/app/settings',
    title: 'Settings',
    icon: <Iconify icon="eva:settings-2-fill" />,
    ariaLabel: 'Open settings',
    iconSize: 'small',
  },
  {
    href: '/app/profile',
    title: 'Profile',
    icon: <Iconify icon="eva:person-fill" />,
    ariaLabel: 'View your profile',
    isProfile: true,
  },
]
