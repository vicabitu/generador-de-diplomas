import React from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // openDialog: false,
  },
};

class InstitutionDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      id_producto: null,
      product: null,
      openModalCreateFirma: false,
      imagenFirma: null,
      openModalCreateAval: false,
      imagenAval: null
    }

    this.handleDeleteFirma = this.handleDeleteFirma.bind(this);
    this.handleDeleteAval = this.handleDeleteAval.bind(this);
    this.handleCloseModalCreateFirma = this.handleCloseModalCreateFirma.bind(this);
    this.handleConfirmModalCreateFirma = this.handleConfirmModalCreateFirma.bind(this);
    this.handleCloseModalCreateAval = this.handleCloseModalCreateAval.bind(this);
    this.handleConfirmModalCreateAval = this.handleConfirmModalCreateAval.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({id_producto: `${params.id}`});

    const url = 'http://127.0.0.1:8000/api/producto/'+`${params.id}`;
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
    axios.get(url, { headers: { Authorization: AuthStr } })
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
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));

    axios.delete(url, { headers: { Authorization: AuthStr } })
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
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
    
    axios.delete(url, { headers: { Authorization: AuthStr } })
    .then((response) => {
      console.log("then del delete")
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log("Error");
    });
  }

  handleCloseModalCreateFirma() {
    this.setState({openModalCreateFirma: false});
    this.setState({imagenFirma: null});
  }

  handleConfirmModalCreateFirma() {
    const url = 'http://127.0.0.1:8000/api/crear_firma';
    const formData = new FormData();
      
    formData.append('image', this.state.imagenFirma);
    formData.append('product', this.state.id_producto);
    
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          Authorization: AuthStr
        }
    };
    axios.post(url, formData, config)
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      console.log("Error");
    });
  }

  handleCloseModalCreateAval() {
    this.setState({openModalCreateAval: false});
    this.setState({imagenAval: null});
  }

  handleConfirmModalCreateAval() {
    const url = 'http://127.0.0.1:8000/api/crear_aval';
    const formData = new FormData();
    formData.append('image', this.state.imagenAval);
    formData.append('product', this.state.id_producto);
    
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
    const config = {
    headers: {
        'content-type': 'multipart/form-data',
        Authorization: AuthStr
      }
    };
    axios.post(url, formData, config)
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      console.log("Error");
    });
  }
  
  render() {
    var firmas;
    var avales;
    var nombre_firma;
    var nombre_aval;
    this.state.product ? firmas = this.state.product.firmas : firmas = [];
    this.state.product ? avales = this.state.product.avales : avales = [];
    this.state.imagenFirma ? nombre_firma = this.state.imagenFirma.name : nombre_firma = '';
    this.state.imagenAval ? nombre_aval = this.state.imagenAval.name : nombre_aval = ''

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
                    <a
                      href={item.image}
                      target="_blank">
                      <img
                        style={useStyles.media}
                        alt="complex"
                        src={item.image}
                      />
                    </a>
                  </CardMedia>
                </CardActionArea>
                <CardActions>
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
          <Button
            variant="text"
            startIcon={<AddCircleIcon />}
            style={{color: '#6976BB'}}
            onClick={ () => this.setState({openModalCreateFirma: true}) }
          >
            Crear Firma
          </Button>
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
                    <a
                      href={item.image}
                      target="_blank">
                      <img
                        style={useStyles.media}
                        alt="complex"
                        src={item.image}
                      />
                    </a>
                  </CardMedia>
                </CardActionArea>
                <CardActions>
                  <Button
                    style={{color: '#6976BB'}}
                    startIcon={<DeleteIcon />}
                    onClick={ () => this.handleDeleteAval(item.id) }
                  >
                    Eliminar aval
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Grid style={{marginTop: 30}} >
          <Button
            variant="text"
            startIcon={<AddCircleIcon />}
            style={{color: '#6976BB'}}
            onClick={ () => this.setState({openModalCreateAval: true}) }
          >
            Crear Aval
          </Button>
        </Grid>

        {/* Modal de crear aval */}
        <Dialog open={this.state.openModalCreateAval} onClose={ () => this.handleCloseModalCreateAval() } aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Crear Aval</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Seleccione la imagen del aval.
            </DialogContentText>
              <input
                accept="image/*"
                style={{display: 'none'}}
                id="contained-button-file-firmas"
                type="file"
                name="firmas"
                onChange={(e) => this.setState({imagenAval: e.target.files[0]})}
              />
              <label htmlFor="contained-button-file-firmas">
                <Button variant="contained" color="primary" component="span" style={{marginTop: 20}} fullWidth>
                  <CloudUploadIcon style={{marginRight: 10}} />
                  Seleccionar aval
                </Button>
              </label>
              {/* Muestro el nombre del archivo que seleccionaron */}
              {nombre_aval &&
                <div>
                  <p style={{fontWeight: 'bold'}}>Imagen seleccionada:</p>
                  <p style={{fontWeight: 'bold'}}>{nombre_aval}</p>
                </div>
              }
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => this.handleCloseModalCreateAval() } color="primary">
              Cancelar
            </Button>
            <Button onClick={ () => this.handleConfirmModalCreateAval() } color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal de crear firma */}
        <Dialog open={this.state.openModalCreateFirma} onClose={ () => this.handleCloseModalCreateFirma() } aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Crear firma</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Seleccione la imagen de la firma.
            </DialogContentText>
              <input
                accept="image/*"
                style={{display: 'none'}}
                id="contained-button-file-firmas"
                type="file"
                name="firmas"
                onChange={(e) => this.setState({imagenFirma: e.target.files[0]})}
              />
              <label htmlFor="contained-button-file-firmas">
                <Button variant="contained" color="primary" component="span" style={{marginTop: 20}} fullWidth>
                  <CloudUploadIcon style={{marginRight: 10}} />
                  Seleccionar firma
                </Button>
              </label>
              {/* Muestro el nombre del archivo que seleccionaron */}
              {nombre_firma &&
                <div>
                  <p style={{fontWeight: 'bold'}}>Imagen seleccionada:</p>
                  <p style={{fontWeight: 'bold'}}>{nombre_firma}</p>
                </div>
              }
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => this.handleCloseModalCreateFirma() } color="primary">
              Cancelar
            </Button>
            <Button onClick={ () => this.handleConfirmModalCreateFirma() } color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      
      </Grid>
    );
  }
}

export default InstitutionDetail