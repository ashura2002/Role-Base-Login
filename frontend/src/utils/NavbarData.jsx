import { EyeClosedIcon, Home, NotebookTabsIcon, User, UserPlus, Users2, UsersRoundIcon } from "lucide-react";

export const AdminNavbarData = [
    { text: 'Home', icon: <Home />, to: '/admin-homepage' },
    { text: 'User Management', icon: <UserPlus />, to: '/admin-user-management' },
    { text: 'User Request', icon: <NotebookTabsIcon />, to: '/admin-user-request' },
    { text: 'Employees', icon: <Users2 />, to: '/admin-employees' },
]

export const ClientNavbarData = [
    { text: 'Home', icon: <Home />, to: '/client-homepage' },
    { text: 'Apply Request', icon: <NotebookTabsIcon />, to: '/client-apply-request' },
    { text: 'View Request', icon: <EyeClosedIcon />, to: '/client-view-request' },
]