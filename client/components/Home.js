import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Grid, Typography, Button, Box, makeStyles, Hidden } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  background: {
    backgroundImage:
      'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwiB-W_mSs_082h2oqX5tf_DKfwUDPLKkYC9FnXc2yWLdEe8BsmhvFSRsHaQqqc0M8YLg&usqp=CAU")',
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
    <Box mt={3}>
      <Grid container>
        <Hidden smDown>
          <Grid item md={6} container justify="center" alignItems="center">
            <img
              className={classes.image}
              src="https://media.istockphoto.com/photos/cat-scottish-straight-playing-on-electric-guitar-picture-id899303916?k=6&m=899303916&s=612x612&w=0&h=_CVhJJixmlXtV2rYONjJ8mjKfKKtAwQ-eBnfudcKe08="
            />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6} container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h1" className={classes.title} align="center">
              Welcome to Grace Rocker
            </Typography>
          </Grid>
          <Grid item>
            <Box mt={3}>
              <Button component={RouterLink} to="/products" variant="contained" size="large">
                Explore our Products
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    // <Grid
    //   className={classes.background}
    //   container
    //   justify="flex-start"
    //   alignItems="center"
    //   direction="column"
    // >
    //   <Box mt={10}>
    //     <Typography variant="h1" className={classes.title}>
    //       Welcome to Grace Rocker
    //     </Typography>
    //   </Box>
    //   <Box mt={3}>
    //     <Button component={RouterLink} to="/products" variant="contained" size="large">
    //       Explore our Products
    //     </Button>
    //   </Box>
    // </Grid>
  );
};

export default Home;
