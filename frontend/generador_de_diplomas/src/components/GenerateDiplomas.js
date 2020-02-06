import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
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

class GenerateDiplomas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null,
      observations: '',
      openDialog: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.file) {
      console.log('No tengo archivo')
      this.setState({openDialog: true});
      return
    }

    console.log(this.state.file);
    const url = 'http://127.0.0.1:8000/api/generar_diplomas';

    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('observations', this.state.observations)
    formData.append('file_name', this.state.file.name)
    formData.append('user_id', localStorage.getItem('user_id'))
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          Authorization: AuthStr
      }
    };
    axios.post(url, formData, config)
    .then((response) => {
      console.log("Entre al then");
      console.log(response);
      window.location.replace("http://127.0.0.1:8000/media/diplomas/"+response.data.url_file)
    })
    .catch(function (error) {
      console.log("Error");
    });

  }

  handleDialog = () => {
    this.setState({openDialog: false});
  }

  render() {
    var name_file = '';
    this.state.file ? name_file = this.state.file.name : name_file = '';

    return (
        <div style={useStyles.root}>
          <Typography component="h1" variant="h5">
            Generar Diplomas
          </Typography>
          <div>
            <form noValidate onSubmit={e => this.handleSubmit(e)}>

              <input
                style={{display: 'none'}}
                id="contained-button-file"
                type="file"
                accept=".xls,.xlsx"
                onChange={(e) => this.setState({file:e.target.files[0]})}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span" style={{marginTop: 20}}>
                  <CloudUploadIcon style={{marginRight: 10}} />
                  Seleccionar archivo
                </Button>
              </label>

              <TextField
                id="standard-full-width"
                style={{ margin: 8 }}
                name='observations'
                label='Observaciones'
                type='text'
                // margin='normal'
                fullWidth
                placeholder='Observaciones'
                onChange={(e) => this.setState({observations:e.target.value})}
                />
              
              <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={useStyles.submit}
                >
                Generar
              </Button>
            
            </form>
            {/* Muestro el nombre del archivo que seleccionaron */}      
            {name_file &&
              <div>
                <p style={{fontWeight: 'bold'}}>Archivo seleccionado:</p>
                <p style={{fontWeight: 'bold'}}>{name_file}</p>
              </div>
            }
          </div>

          <div>
            <Dialog
              open={this.state.openDialog}
              onClose={() => this.handleDialog()}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Error
              </DialogTitle>
              <DialogContent id="alert-dialog-description">
                <DialogContentText id="alert-dialog-description">
                  Debe seleccionar un archivo excel con la información.
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

export default GenerateDiplomas