// assets
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

// constant
const icons = { AttachMoneyIcon, MoneyOffIcon };

// ==============================|| INCOME & EXPENSES MENU ITEMS ||============================== //

const pages = {
  id: 'financial-menus',
  type: 'group',
  children: [
    {
      id: 'income-list',
      title: 'Lista de Ingresos',
      type: 'item',
      url: '/ingresos',
      icon: icons.AttachMoneyIcon,
      breadcrumbs: false
    },
    {
      id: 'expense-list',
      title: 'Lista de Egresos',
      type: 'item',
      url: '/egresos',
      icon: icons.MoneyOffIcon,
      breadcrumbs: false
    }
  ]
};

export default pages;