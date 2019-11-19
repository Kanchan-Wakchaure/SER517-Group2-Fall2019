/*
    Author: Namratha Olety Venkatesh
    Date: 11-01-2019
    Description: About page for Travlendar
    References: https://material-ui.com/getting-started/templates/pricing/
*/

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import React from 'react';

import './About.css';
import namratha from './images/namratha.png';
import kanchan from './images/kanchan.jpg';
import mounika from './images/mounika.jpg';
import kaustuv from './images/kaustuv.jpg';
import raisa from './images/raisa.jpg';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    }
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

const tiers = [
  {
    title: 'Kanchan Wakchaure',
    img: kanchan,
    buttonText: 'View bio',
    buttonLink: 'https://www.linkedin.com/in/kanchan-wakchaure-7822238a/',
    buttonVariant: 'outlined'
  },
  {
    title: 'Namratha Olety',
    img: namratha,
    buttonText: 'View bio',
    buttonLink: 'https://www.linkedin.com/in/namrathaov/',
    buttonVariant: 'outlined'
  },
  {
    title: 'Mounika Gadde',
    img: mounika,
    buttonText: 'View bio',
    buttonLink: 'https://www.linkedin.com/in/mounika-gadde/',
    buttonVariant: 'outlined'
  },
  {
    title: 'Kaustuv Deolal',
    img: kaustuv,
    buttonText: 'View bio',
    buttonLink: 'https://www.linkedin.com/in/kaustuv16/',
    buttonVariant: 'outlined'
  },
  {
    title: 'Raisa Khatun',
    img: raisa,
    buttonText: 'View bio',
    buttonLink: 'https://www.linkedin.com/in/raisa-khatun/',
    buttonVariant: 'outlined'
  },
];


export default function About() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

            <div style={{backgroundColor:"white", marginRight: "15%", marginLeft: "15%"}}>
            <Container maxWidth="sm" component="main" className={classes.heroContent} >

        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          What is Travlendar?
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Travlendar provides the ability to collaboratively plan and schedule day-to-day agenda.
           The interface provides ability to view everyday agenda on a map. <br/>
          <br/>For example:
          A mother can plan her agenda to pick up and drop kids at different locations using a map.
          <br/><br/>
          This project is devised as part of the SER 517 - Software Capstone.
        </Typography>
      </Container>
      <hr/>
      <Container maxWidth="sm" component="main" className={classes.heroContent} >
        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          Who are we?
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                      <img src={tier.img} style={{
     width: '300px',
     height: '200px',
  }}/>
                  </div>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} color="primary" href={tier.buttonLink}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </div>
    </React.Fragment>
  );
}