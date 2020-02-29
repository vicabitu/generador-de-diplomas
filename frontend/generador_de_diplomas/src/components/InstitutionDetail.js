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

const useStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    openDialog: false
  },
  submit: {
    marginTop: 20
  }
};

// Componente encargado de mostrar el detalle de una institucion y de la modificacion
class InstitutionDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      logo: null,
      name: '',
      new_logo: null,
      id_institution: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({id_institution: `${params.id}`});

    const url = 'http://127.0.0.1:8000/api/institucion/'+`${params.id}`;
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
    axios.get(url, { headers: { Authorization: AuthStr } })
    .then((response) => {
      this.setState({name: response.data.name});
      this.setState({logo:response.data.logo});
    })
    .catch(function (error) {
      console.log("Error");
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const url = 'http://127.0.0.1:8000/api/modificar_institucion/'+this.state.id_institution;
    if (this.state.name.length == 0) {
      this.setState({openDialog: true});
      return;
    }
    const formData = new FormData()
    formData.append('name', this.state.name);
    if (this.state.new_logo) {
      formData.append('logo', this.state.new_logo[0]);
    } else {
      formData.append('logo', '');
    }
    formData.append('id', this.state.id_institution);
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          Authorization: AuthStr
      }
    };
    axios.put(url, formData, config)
    .then((response) => {
      window.location.reload();
    })
    .catch(function (error) {
      console.log("Error");
    });
  }

  handleDialog = () => {
    this.setState({openDialog: false});
  }

  render() {
    if (this.state.new_logo) {
      var listLogos = [];
      for (var [key, value] of Object.entries(this.state.new_logo)) {
        let item = <li key={key}>{value.name}</li>;
        listLogos[key] = item;
      }
    }
    return (
      <div>
        <div style={useStyles.root}>
          <form noValidate onSubmit={e => this.handleSubmit(e)}>
            <Typography component="h1" variant="h5">
              Modificar institución
            </Typography>
            
            <TextField
              name='nombre'
              label='Nombre'
              type='text'
              margin='normal'
              fullWidth
              placeholder='Nombre'
              value={this.state.name}
              onChange={(e) => this.setState({name:e.target.value})}
            />

            <div>
              <Typography variant="h6">
                Logo actual:
              </Typography>
              <img style={{width: 350, height: 'auto'}} src={this.state.logo ? this.state.logo : ''} />
            </div>
        
            <input
              accept="image/*"
              style={{display: 'none'}}
              id="contained-button-file"
              type="file"
              onChange={(e) => this.setState({new_logo:e.target.files})}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span" style={{marginTop: 20}}>
                <CloudUploadIcon style={{marginRight: 10}} />
                Cambiar logo
              </Button>
            </label>

            
            {this.state.new_logo  && 
              <div style={{marginTop: 30}}>
                <Typography variant="h6">
                  Nuevo logo:
                </Typography>
                <ul>{listLogos}</ul>
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
        </div>

        <div>
          {/* Mensaje de error para cuando dejan vacio el campo de nombre */}
          <Dialog
              open={this.state.openDialog}
              onClose={() => this.handleDialog()}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Error</DialogTitle>
              <DialogContent id="alert-dialog-description">
                <DialogContentText id="alert-dialog-description">
                  Debe ingresar el nombre de la institución.
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
    )
  }
}

export default InstitutionDetail