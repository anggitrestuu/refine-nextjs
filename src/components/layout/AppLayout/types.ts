export interface AppLayoutProps {

    children: React.ReactNode
}

export interface NavItem {
    href: string
    title: string
    icon?: React.ReactNode | JSX.Element
    ariaLabel?: string
    iconSize?: 'small' | 'medium' | 'large'
    isProfile?: boolean
}