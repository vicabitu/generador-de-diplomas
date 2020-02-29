import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  submit: {
    marginTop: 20
  }
};

class CreateProduct extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      code: '',
      avales: null,
      firmas: null,
      producto_id: null,
      openDialog: false,
      errorMessage: '',
      openBar: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAvales = this.handleAvales.bind(this);
    this.handleFirmas = this.handleFirmas.bind(this);
    this.createFirmas = this.createFirmas.bind(this);
    this.createAvales = this.createAvales.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
    this.handleBar = this.handleBar.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.code == '' || this.state.avales == null || this.state.firmas == null) {
      this.setState({errorMessage: 'Debe completar el código del producto, las imágenes de las firmas y las imágenes de los avales'});
      this.setState({openDialog: true});
      return;
    }
    this.createProduct();
  }

  createProduct = () => {
    const url = 'http://127.0.0.1:8000/api/crear_producto';
    const formData = new FormData();
    formData.append('code', this.state.code);
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          Authorization: AuthStr
      }
    };
    axios.post(url, formData, config)
    .then((response) => {
      this.setState({producto_id: response.data.id});
      this.createFirmas();
      this.createAvales();
      this.setState({openBar: true});
    })
    .catch((response) => {
      let message = 'El producto con el código: ' + this.state.code + ' ya existe.';
      this.setState({errorMessage: message});
      this.setState({openDialog: true});
    });
  }

  createFirmas() {
    const url = 'http://127.0.0.1:8000/api/crear_firma';
    for (var [key, value] of Object.entries(this.state.firmas)) {
      const formData = new FormData();
      
      formData.append('image', value);
      formData.append('product', this.state.producto_id);
      
      const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
      const config = {
      headers: {
          'content-type': 'multipart/form-data',
          Authorization: AuthStr
        }
      };
      axios.post(url, formData, config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("Error");
      });
    }
  }

  createAvales() {
    const url = 'http://127.0.0.1:8000/api/crear_aval';

    for (var [key, value] of Object.entries(this.state.avales)) {
      const formData = new FormData();
      
      formData.append('image', value);
      formData.append('product', this.state.producto_id);
      
      const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
      const config = {
      headers: {
          'content-type': 'multipart/form-data',
          Authorization: AuthStr
        }
      };
      axios.post(url, formData, config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("Error");
      });
    }
  }

  handleFirmas = (files) => {
    this.setState({firmas:files});
  }

  handleAvales = (files) => {
    this.setState({avales:files});
  };

  handleDialog = () => {
    this.setState({openDialog: false});
  }

  handleBar = () => {
    this.setState({openBar: false});
  }

  render() {
    if (this.state.firmas) {
      var listFirmas = [];
      for (var [key, value] of Object.entries(this.state.firmas)) {
        let item = <li key={key}>{value.name}</li>;
        listFirmas[key] = item;
      }
    }
    
    if (this.state.avales) {
      var listAvales = [];
      for (var [key, value] of Object.entries(this.state.avales)) {
        let item = <li key={key}>{value.name}</li>;
        listAvales[key] = item;
      }
    }
    return (
      <div style={useStyles.root}>
        <form noValidate onSubmit={e => this.handleSubmit(e)}>
        <Typography component="h1" variant="h5">
          Crear producto
        </Typography>
        
        <TextField
          name='codigo'
          label='Codigo'
          type='text'
          margin='normal'
          fullWidth
          placeholder='Codigo'
          onChange={(e) => this.setState({code:e.target.value})}
        />
      
        <input
          accept="image/*"
          style={{display: 'none'}}
          id="contained-button-file-firmas"
          multiple
          type="file"
          name="firmas"
          onChange={(e) => this.handleFirmas(e.target.files)}
        />
        <label htmlFor="contained-button-file-firmas">
          <Button variant="contained" color="primary" component="span" style={{marginTop: 20}} fullWidth>
            <CloudUploadIcon style={{marginRight: 10}} />
            Seleccionar firmas
          </Button>
        </label>

        {/* Listado de archivos de firmas */}
        <ul>{listFirmas}</ul>

        <input
          accept="image/*"
          style={{display: 'none'}}
          id="contained-button-file"
          multiple
          type="file"
          name="avales"
          // onChange={(e) => this.setState({avales:e.target.files})}
          onChange={(e) => this.handleAvales(e.target.files)}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" style={{marginTop: 20}} fullWidth>
            <CloudUploadIcon style={{marginRight: 10}} />
            Seleccionar avales
          </Button>
        </label>

        {/* Listado de archivos de avales */}
        <ul>{listAvales}</ul>

        <Button 
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={useStyles.submit}
        >
          Guardar
        </Button>
        </form>

        <div>
          <Dialog
            open={this.state.openDialog}
            onClose={() => this.handleDialog()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Error</DialogTitle>
            <DialogContent id="alert-dialog-description">
              <DialogContentText id="alert-dialog-description">
                {this.state.errorMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleDialog()} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Snackbar open={this.state.openBar} autoHideDuration={6000} onClose={() => this.handleBar()}>
            <Alert onClose={() => this.handleBar()} severity="success" variant="filled">
              Producto creado con exito!
            </Alert>
          </Snackbar>
        </div>

      </div>
    );
  }
}

export default CreateProduct