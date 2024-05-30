// assets
import { IconHome, IconUser, IconReceipt, IconAlertTriangleFilled, IconSettings, IconFileFilled } from '@tabler/icons-react';
import GetCustomization from 'services/customizeService';
// constant
const icons = {
  IconHome,
  IconUser,
  IconReceipt,
  IconAlertTriangleFilled,
  IconSettings,
  IconFileFilled
};

const customization = await GetCustomization();

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
      breadcrumbs: false,
      permission: 1
    },
    {
      id: 'util-date',
      title: 'layout.menu_info',
      type: 'item',
      url: '/profile',
      icon: icons.IconUser,
      breadcrumbs: false,
      permission: 1
    },
    {
      id: 'util-invoices',
      title: 'layout.menu_invoices',
      type: 'item',
      url: '/invoices',
      icon: icons.IconReceipt,
      breadcrumbs: false,
      permission: 1
    },
    {
      id: 'icons',
      title: 'layout.menu_incidents',
      type: 'item',
      url: '/incidents',
      icon: icons.IconAlertTriangleFilled,
      breadcrumbs: false,
      permission: customization.view_tickets
    },
    {
      id: 'util-services',
      title: 'layout.menu_services',
      type: 'item',
      url: '/services',
      icon: icons.IconSettings,
      breadcrumbs: false,
      permission: 11
    },
    {
      id: 'util-documentation',
      title: 'layout.menu_documents',
      type: 'item',
      url: '/documents',
      icon: icons.IconFileFilled,
      breadcrumbs: false,
      permission: 1
    }
  ]
};

export default utilities;
