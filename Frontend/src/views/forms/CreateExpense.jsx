import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Categorías predefinidas para gastos
const expenseCategories = [
  'Oficina',
  'Renta',
  'Servicios Públicos',
  'Materiales',
  'Publicidad',
  'Otros'
];

// ==============================|| CreateExpense ||============================== //

const CreateExpense = () => {
  const [isLoading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('MXN');
  const [category, setCategory] = useState('');
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [rfcSender, setRfcSender] = useState('');
  const theme = useTheme();

  const currencies = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'MXN', label: 'MXN' }
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token'); // Asume que el token JWT está guardado en localStorage
    if (!token) {
      alert('No estás autenticado');
      return;
    }

    const expenseData = {
      description: concept,
      amount: parseFloat(amount), // Nos aseguramos de que sea un número
      currency,
      category,
      rfcSender,
      date: new Date(), // Fecha actual
    };

    try {
      const response = await axios.post('http://localhost:4000/expenses', expenseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        alert('Gasto creado exitosamente');
      }
    } catch (error) {
      console.error('Error creando el gasto:', error);
      alert('Hubo un problema al crear el gasto.');
    }
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
              <Typography variant="h3" gutterBottom>
                Crear Gasto
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Concepto del Gasto"
                placeholder="Ej. Pago de renta"
                variant="outlined"
                margin="normal"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Monto"
                placeholder="Ej. 1500"
                type="number"
                variant="outlined"
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Moneda"
                value={currency}
                onChange={handleCurrencyChange}
                variant="outlined"
                margin="normal"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Categoría del Gasto"
                value={category}
                onChange={handleCategoryChange}
                variant="outlined"
                margin="normal"
              >
                {expenseCategories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="RFC Emisor"
                placeholder="Ej. ABCD123456XYZ"
                variant="outlined"
                margin="normal"
                value={rfcSender}
                onChange={(e) => setRfcSender(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Crear Gasto
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CreateExpense;