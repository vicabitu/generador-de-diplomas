import React from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140,
    // margin: 'auto',
    // display: 'block',
    // maxWidth: '100%',
    // maxHeight: '100%',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    openDialog: false,
  },
};

class InstitutionDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      new_logo: null,
      id_producto: null,
      product: null
    }

    this.handleDeleteFirma = this.handleDeleteFirma.bind(this);
    this.handleDeleteAval = this.handleDeleteAval.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({id_producto: `${params.id}`});

    const url = 'http://127.0.0.1:8000/api/producto/'+`${params.id}`;
    axios.get(url)
    .then((response) => {
      console.log("then del component did mount")
      console.log(response);
      this.setState({product: response.data})
    })
    .catch(function (error) {
      console.log("Error");
    });
  }

  handleDeleteFirma(id_firma) {
    console.log("Elimiar firma, id: " + id_firma);
    const url = 'http://127.0.0.1:8000/api/eliminar_firma/'+id_firma;
    
    axios.delete(url)
    .then((response) => {
      console.log("then del delete")
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log("Error");
    });
  }

  handleDeleteAval(id_aval){
    console.log("Elimiar aval, id: " + id_aval);
    const url = 'http://127.0.0.1:8000/api/eliminar_aval/'+id_aval;
    
    axios.delete(url)
    .then((response) => {
      console.log("then del delete")
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log("Error");
    });

  }
  
  render() {
    var firmas;
    var avales;
    this.state.product ? firmas = this.state.product.firmas : firmas = [];
    this.state.product ? avales = this.state.product.avales : avales = [];

    return (
      <Grid style={useStyles.root}>
        
          <Grid>
            <Typography variant="h4" gutterBottom>
              Firmas
            </Typography>
          </Grid>
          <Grid container spacing={2}>
          {firmas.map(item => (
            <Grid key={item.id} item xs={3}>
              <Card style={useStyles.card}>
                <CardActionArea>
                  <CardMedia>
                    <img
                      style={useStyles.media}
                      alt="complex"
                      src={item.image}
                    />
                  </CardMedia>

                  {/* <CardMedia
                    style={useStyles.media}
                    image={item.image}
                    title="Contemplative Reptile"
                  /> */}

                  {/* <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent> */}
                </CardActionArea>
                <CardActions>
                  {/* <Button size="small" color="primary">
                    Eliminar firma
                  </Button> */}
                  <Button
                    style={{color: '#6976BB'}}
                    startIcon={<DeleteIcon />}
                    onClick={ () => this.handleDeleteFirma(item.id) }
                  >
                    Eliminar firma
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
          
        <Grid style={{marginTop: 30}}>
            <Typography variant="h4" gutterBottom>
              Avales
            </Typography>
          </Grid>
          <Grid container spacing={2}>
          {avales.map(item => (
            <Grid key={item.id} item xs={3}>
              <Card style={useStyles.card}>
                <CardActionArea>
                  <CardMedia>
                    <img
                      style={useStyles.media}
                      alt="complex"
                      src={item.image}
                    />
                  </CardMedia>

                  {/* <CardMedia
                    style={useStyles.media}
                    image={item.image}
                    title="Contemplative Reptile"
                  /> */}

                  {/* <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent> */}
                </CardActionArea>
                <CardActions>
                  
                  <Button
                    style={{color: '#6976BB'}}
                    startIcon={<DeleteIcon />}
                    onClick={ () => this.handleDeleteAval(item.id) }
                  >
                    Eliminar firma
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default InstitutionDetail