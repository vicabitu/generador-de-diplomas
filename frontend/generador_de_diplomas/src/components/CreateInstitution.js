import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';

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
      name: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = 'http://127.0.0.1:8000/api/crear_institucion';
    const formData = new FormData();
    formData.append('logo', this.state.logo);
    formData.append('name', this.state.name);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    axios.post(url, formData, config)
    .then(function (response) {
      console.log("Entre al then");
    })
    .catch(function (error) {
      console.log("Error");
    });

  }

  render() {
    return (
      <div style={useStyles.root}>
        <form noValidate onSubmit={e => this.handleSubmit(e)}>
        <Typography component="h1" variant="h5">
          Crear institucion
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
          multiple
          type="file"
          onChange={(e) => this.setState({logo:e.target.files[0]})}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" style={{marginTop: 20}}>
            <CloudUploadIcon style={{marginRight: 10}} />
            Seleccionar logo
          </Button>
        </label>
      
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
    );
  }

}

export default CreateInstitution