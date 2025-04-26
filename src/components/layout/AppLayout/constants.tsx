import Iconify from '@components/iconify'
import { NavItem } from './types'

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    href: '/app/home',
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    ariaLabel: 'Go to home page',
  },
  {
    href: '/app/news',
    title: 'News',
    icon: <Iconify icon="eva:file-text-fill" />,
    ariaLabel: 'View latest news',
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
    icon: null, // Will use UserProfileBadge instead
    ariaLabel: 'View your profile',
    isProfile: true,
  },
]
