import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import IngresosIcon from '@mui/icons-material/AttachMoney';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TotalIngresos = ({ isLoading }) => {
  const theme = useTheme();
  const navigate = useNavigate(); // Hook para redirigir a otra página

  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchTotalIncome = async () => {
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

        const total = response.data.reduce((acc, income) => acc + income.amount, 0);
        setTotalIncome(total);
      } catch (error) {
        console.error('Error obteniendo los ingresos:', error);
        alert('Hubo un problema al obtener los ingresos.');
      }
    };

    fetchTotalIncome();
  }, []);

  // Función para manejar el clic y redirigir a /ingresos
  const handleCardClick = () => {
    navigate('/ingresos');
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          onClick={handleCardClick} // Hace clickeable toda la tarjeta
          sx={{
            cursor: 'pointer', // Cambia el cursor al de clickeable
            bgcolor: 'secondary.dark',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -105, sm: -85 },
              right: { xs: -140, sm: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -155, sm: -125 },
              right: { xs: -70, sm: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      bgcolor: 'secondary.800',
                      mt: 1,
                      color: '#fff' // Asegúrate de que el color del ícono sea blanco
                    }}
                    >
                    <IngresosIcon color="inherit" />  {/* Hace que el ícono herede el color blanco */}
                  </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      ${totalIncome.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        ...theme.typography.smallAvatar,
                        bgcolor: 'secondary.200',
                        color: 'secondary.dark'
                      }}
                    >
                      <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'secondary.200'
                  }}
                >
                  Total de Ingresos
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
};

TotalIngresos.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalIngresos;