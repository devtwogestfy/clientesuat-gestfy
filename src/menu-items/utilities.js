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
      title: 'Inicio',
      type: 'item',
      url: '/',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: 'util-date',
      title: 'Datos',
      type: 'item',
      url: '/utils/util-color',
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
      url: '/utils/sample-page',
      icon: icons.IconSettings,
      breadcrumbs: false
    },
    {
      id: 'util-documentation',
      title: 'Documentación',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconFileFilled,
      breadcrumbs: false
    }
  ]
};

export default utilities;