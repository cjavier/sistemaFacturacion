import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| ListIncome ||============================== //

const ListIncome = () => {
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchIncomes = async () => {
      const token = localStorage.getItem('token'); // Asume que el token JWT está guardado en localStorage
      if (!token) {
        alert('No estás autenticado');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/income', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIncomes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error obteniendo los ingresos:', error);
        alert('Hubo un problema al obtener los ingresos.');
      }
    };

    fetchIncomes();
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom>
                Lista de Ingresos
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {isLoading ? (
                <Typography variant="h6">Cargando ingresos...</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Moneda</TableCell>
                        <TableCell>Categoría</TableCell>
                        <TableCell>RFC Receptor</TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell>Forma de Pago</TableCell>
                        <TableCell>¿Pagado?</TableCell>
                        <TableCell>Fecha</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {incomes.map((income) => (
                        <TableRow key={income._id}>
                          <TableCell>{income.description}</TableCell>
                          <TableCell>{income.amount}</TableCell>
                          <TableCell>{income.currency}</TableCell>
                          <TableCell>{income.category.join(', ')}</TableCell>
                          <TableCell>{income.rfcReceiver}</TableCell>
                          <TableCell>{income.product}</TableCell>
                          <TableCell>{income.paymentMethod}</TableCell>
                          <TableCell>{income.isPaid ? 'Sí' : 'No'}</TableCell>
                          <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
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

export default ListIncome;