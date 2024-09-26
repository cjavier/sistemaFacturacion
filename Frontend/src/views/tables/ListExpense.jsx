import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| ListExpense ||============================== //

const ListExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('token'); // Asume que el token JWT está guardado en localStorage
      if (!token) {
        alert('No estás autenticado');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/expenses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error obteniendo los gastos:', error);
        alert('Hubo un problema al obtener los gastos.');
      }
    };

    fetchExpenses();
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom>
                Lista de Gastos
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {isLoading ? (
                <Typography variant="h6">Cargando gastos...</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Moneda</TableCell>
                        <TableCell>Categoría</TableCell>
                        <TableCell>RFC Emisor</TableCell>
                        <TableCell>Fecha</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {expenses.map((expense) => (
                        <TableRow key={expense._id}>
                          <TableCell>{expense.description}</TableCell>
                          <TableCell>{expense.amount}</TableCell>
                          <TableCell>{expense.currency}</TableCell>
                          <TableCell>{expense.category.join(', ')}</TableCell>
                          <TableCell>{expense.rfcSender}</TableCell>
                          <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ListExpense;