// assets
import { IconHome, IconUser, IconReceipt, IconAlertTriangleFilled, IconSettings, IconFileFilled } from '@tabler/icons-react';

// constant
const icons = {
    IconHome,
    IconUser,
    IconReceipt,
    IconAlertTriangleFilled,
    IconSettings,
    IconFileFilled
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'layout.menu_home',
            type: 'item',
            url: '/',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'util-date',
            title: 'Datos',
            type: 'item',
            url: '/profile',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'util-invoices',
            title: 'Facturas',
            type: 'item',
            url: '/invoices',
            icon: icons.IconReceipt,
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Incidencias',
            type: 'item',
            url: '/incidents',
            icon: icons.IconAlertTriangleFilled,
            breadcrumbs: false
        },
        {
            id: 'util-services',
            title: 'Servicios',
            type: 'item',
            url: '/services',
            icon: icons.IconSettings,
            breadcrumbs: false
        },
        {
            id: 'util-documentation',
            title: 'Documentación',
            type: 'item',
            url: '/documents',
            icon: icons.IconFileFilled,
            breadcrumbs: false
        }
    ]
};

export default utilities;
