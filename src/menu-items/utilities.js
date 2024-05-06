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
      url: '/main',
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
      url: '/utils/util-shadow',
      icon: icons.IconReceipt,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Incidencias',
      type: 'collapse',
      icon: icons.IconAlertTriangleFilled,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'material-icons',
          title: 'Material Icons',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        }
      ]
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
