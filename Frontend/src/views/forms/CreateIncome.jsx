import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Categorías predefinidas
const categories = [
  'Servicios',
  'Venta de Productos',
  'Consultoría',
  'Renta',
  'Otros'
];

// Formas de pago predefinidas
const paymentMethods = [
  { value: 'EFECTIVO', label: 'Efectivo' },
  { value: 'TARJETA', label: 'Tarjeta de Crédito/Débito' },
  { value: 'TRANSFERENCIA', label: 'Transferencia Bancaria' },
  { value: 'CHEQUE', label: 'Cheque' }
];

const CreateIncome = () => {
  const [isLoading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('EFECTIVO');
  const [isPaid, setIsPaid] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [rfcReceiver, setRfcReceiver] = useState('');
  const [product, setProduct] = useState('');
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

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleIsPaidChange = (event) => {
    setIsPaid(event.target.checked);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token'); // Asume que el token JWT está guardado en localStorage
    if (!token) {
      alert('No estás autenticado');
      return;
    }

    const incomeData = {
      description,
      amount: parseFloat(amount), // Nos aseguramos de que sea un número
      currency,
      category,
      rfcReceiver,
      product,
      paymentMethod,
      isPaid,
      date: new Date(), // Fecha actual
    };

    try {
      const response = await axios.post('http://localhost:4000/income', incomeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        alert('Ingreso creado exitosamente');
      }
    } catch (error) {
      console.error('Error creando el ingreso:', error);
      alert('Hubo un problema al crear el ingreso.');
    }
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
              <Typography variant="h3" gutterBottom>
                Crear Ingreso
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Descripción del Ingreso"
                placeholder="Ej. Venta de productos"
                variant="outlined"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Monto"
                placeholder="Ej. 1000"
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
                label="RFC Receptor"
                placeholder="Ej. ABCD123456XYZ"
                variant="outlined"
                margin="normal"
                value={rfcReceiver}
                onChange={(e) => setRfcReceiver(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Producto"
                placeholder="Ej. Servicios de Consultoría"
                variant="outlined"
                margin="normal"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                multiple
                label="Categoría"
                value={category}
                onChange={handleCategoryChange}
                variant="outlined"
                margin="normal"
                SelectProps={{
                  multiple: true
                }}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Forma de Pago"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                variant="outlined"
                margin="normal"
              >
                {paymentMethods.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPaid}
                    onChange={handleIsPaidChange}
                    name="isPaid"
                    color="primary"
                  />
                }
                label="¿Pagado?"
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Crear Ingreso
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CreateIncome;