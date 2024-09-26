import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const DashboardMain = Loadable(lazy(() => import('views/dashboard/dashboard')));
const CreateIncome = Loadable(lazy(() => import('views/forms/CreateIncome')));
const CreateExpense = Loadable(lazy(() => import('views/forms/CreateExpense')));
const ListIncome = Loadable(lazy(() => import('views/tables/ListIncome')));
const ListExpense = Loadable(lazy(() => import('views/tables/ListExpense')));




// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardMain />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'crear-ingreso',
          element: <CreateIncome />
        },
        {
          path: 'crear-egreso',
          element: <CreateExpense />
        },
        {
          path: 'egresos',
          element: <ListExpense />
        },
        {
          path: 'ingresos',
          element: <ListIncome />
        }
      ]
    }
  ]
};

export default MainRoutes;
