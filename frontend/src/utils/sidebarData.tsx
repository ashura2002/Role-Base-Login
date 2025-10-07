import { Building2, Home, LucideBuilding, Notebook, NotebookPenIcon, NotepadText, Users2Icon } from "lucide-react";

export const adminLinks = [
    { name: 'Home', icons: <Home />, to: '/admin-homepage' },
    { name: 'Employees', icons: <Users2Icon />, to: '/admin-employees' },
    { name: 'Request', icons: <NotepadText />, to: '/admin-request' },
    { name: 'Departments', icons: <Building2 />, to: "/admin-departments" },
    { name: 'Buildings', icons: <LucideBuilding />, to: "/admin-building-management" },
]

export const clientLinks = [
    { name: 'Home', icons: <Home />, to: '/client-homepage' },
    { name: 'Request', icons: <Notebook />, to: '/client-request' },
    { name: 'Apply Request', icons: <NotebookPenIcon />, to: '/client-form' },
]