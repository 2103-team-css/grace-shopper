import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Grid, Typography, Button, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  background: {
    backgroundImage:
      'url("https://image.freepik.com/free-photo/instrument-wood-background_127069-14.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
}));

export const Home = () => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.background}
      container
      justify="flex-start"
      alignItems="center"
      direction="column"
    >
      <Box mt={10}>
        <Typography variant="h1" className={classes.title}>
          Welcome to Grace Rocker
        </Typography>
      </Box>
      <Box mt={3}>
        <Button component={RouterLink} to="/products" variant="contained" size="large">
          Explore our Products
        </Button>
      </Box>
    </Grid>
  );
};

export default Home;
