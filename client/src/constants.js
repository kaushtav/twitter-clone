import HomeIcon from './assets/icons/sidebar/home.svg'
import ExploreIcon from './assets/icons/sidebar/explore.svg'
import NotificationsIcon from './assets/icons/sidebar/notifications.svg'
import MessagesIcon from './assets/icons/sidebar/messages.svg'
import BookmarksIcon from './assets/icons/sidebar/bookmarks.svg'
import ProfileIcon from './assets/icons/sidebar/profile.svg'
import SettingsIcon from './assets/icons/sidebar/settings.svg'

export const SidebarItems = [
    {
        title: 'Home',
        image: HomeIcon,
        link: '/home'
    },
    // {
    //     title: 'Explore',
    //     image: ExploreIcon,
    //     link: '/explore'
    // },
    // {
    //     title: 'Notifications',
    //     image: NotificationsIcon,
    //     link: '/notifications'
    // },
    // {
    //     title: 'Messages',
    //     image: MessagesIcon,
    //     link: '/messages'
    // },
    // {
    //     title: 'Bookmarks',
    //     image: BookmarksIcon,
    //     link: '/bookmarks'
    // },
    {
        title: 'Profile',
        image: ProfileIcon,
        link: '/user'
    },
    {
        title: 'Settings',
        image: SettingsIcon,
        link: '/settings'
    },
]