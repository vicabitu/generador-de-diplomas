import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

class CreateInstitution extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      logo: null,
      name: '',
      openBar: false,
      openDialog: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBar = this.handleBar.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = 'http://127.0.0.1:8000/api/crear_institucion';
    // Verifico que ambos campos del formulario esten completos.
    if (this.state.logo == null || this.state.name == '') {
      this.setState({openDialog: true});
      return;
    }

    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
    const formData = new FormData();
    formData.append('logo', this.state.logo);
    formData.append('name', this.state.name);
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          Authorization: AuthStr
      }
    };
    axios.post(url, formData, config)
    .then((response) => {
      console.log("Entre al then");
      this.setState({openBar: true});
      window.location.reload();
    })
    .catch(function (error) {
      console.log("Error");
    });

  }

  handleBar = () => {
    this.setState({openBar: false});
  }

  handleDialog = () => {
    this.setState({openDialog: false});
  }

  render() {
    var name_logo = '';
    this.state.logo ? name_logo = this.state.logo.name : name_logo = '';

    return (
      <div style={useStyles.root}>
        <form noValidate onSubmit={e => this.handleSubmit(e)}>
        <Typography component="h1" variant="h5">
          Crear institución
        </Typography>
          
        <TextField
          name='nombre'
          label='Nombre'
          type='text'
          margin='normal'
          fullWidth
          placeholder='Nombre'
          onChange={(e) => this.setState({name:e.target.value})}
        />
      
        <input
          accept="image/*"
          style={{display: 'none'}}
          id="contained-button-file"
          type="file"
          onChange={(e) => this.setState({logo:e.target.files[0]})}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" style={{marginTop: 20}}>
            <CloudUploadIcon style={{marginRight: 10}} />
            Seleccionar logo
          </Button>
        </label>

        {/* Muestro el nombre del archivo que seleccionaron */}
        {name_logo &&
          <div>
            <p style={{fontWeight: 'bold'}}>Imagen seleccionada:</p>
            <p style={{fontWeight: 'bold'}}>{name_logo}</p>
          </div>
        }
      
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
          <Snackbar open={this.state.openBar} autoHideDuration={6000} onClose={() => this.handleBar()}>
            <Alert onClose={() => this.handleBar()} severity="success" variant="filled">
              Institucion creada con éxito!
            </Alert>
          </Snackbar>
        </div>

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
                Debe completar el formulario correctamente. Ingrese un nombre para la institucion y seleccione una imagen para el logo.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleDialog()} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }

}

export default CreateInstitution