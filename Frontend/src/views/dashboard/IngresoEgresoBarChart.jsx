import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// existing chart data configuration
import chartDataTemplate from './chart-data/total-growth-bar-chart';

// Opciones para el filtro de tiempo
const status = [
  {
    value: 'month',
    label: 'Este Mes'
  },
  {
    value: 'year',
    label: 'Este Año'
  }
];

// ==============================|| DASHBOARD - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState('month');
  const [chartData, setChartData] = useState(chartDataTemplate); // Inicia con la configuración del chart existente
  const theme = useTheme();

  useEffect(() => {
    const fetchFinancialData = async () => {
      const token = localStorage.getItem('token'); // Asume que el token JWT está guardado en localStorage
      if (!token) {
        alert('No estás autenticado');
        return;
      }

      try {
        // Obtener los ingresos
        const incomeResponse = await axios.get('http://localhost:4000/income', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Obtener los egresos
        const expenseResponse = await axios.get('http://localhost:4000/expenses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Procesar los datos mensualmente
        const monthlyData = processMonthlyData(incomeResponse.data, expenseResponse.data);

        // Actualiza los datos del gráfico con los ingresos y egresos reales
        setChartData({
          ...chartDataTemplate,
          series: [
            {
              name: 'Ingresos',
              data: monthlyData.incomes
            },
            {
              name: 'Egresos',
              data: monthlyData.expenses
            }
          ]
        });
      } catch (error) {
        console.error('Error obteniendo los datos:', error);
        alert('Hubo un problema al obtener los datos financieros.');
      }
    };

    fetchFinancialData();
  }, [value]);

  // Función para procesar los ingresos y egresos de manera mensual
  const processMonthlyData = (incomes, expenses) => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('es', { month: 'short' }));
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpense = Array(12).fill(0);

    // Procesar ingresos
    incomes.forEach(income => {
      const month = new Date(income.date).getMonth(); // Obtiene el mes del ingreso
      monthlyIncome[month] += income.amount;
    });

    // Procesar egresos
    expenses.forEach(expense => {
      const month = new Date(expense.date).getMonth(); // Obtiene el mes del egreso
      monthlyExpense[month] += expense.amount;
    });

    return {
      incomes: monthlyIncome,
      expenses: monthlyExpense
    };
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="subtitle2">Crecimiento Total</Typography>
                  <Typography variant="h3">Ingresos vs Egresos</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-period"
                    select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                '& .apexcharts-menu.apexcharts-menu-open': {
                  bgcolor: 'background.paper'
                }
              }}
            >
              <Chart options={chartData.options} series={chartData.series} type="bar" height={480} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;