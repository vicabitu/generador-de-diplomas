import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
      fileZip: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.file);
    const url = 'http://127.0.0.1:8000/api/generar_diplomas';

    const formData = new FormData();
    formData.append('file', this.state.file);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    axios.post(url, formData, config)
    .then((response) => {
      console.log("Entre al then");
      console.log(response);

      window.location.replace("http://127.0.0.1:8000/media/diplomas/diplomas.zip")
    })
    .catch(function (error) {
      console.log("Error");
    });

  }

  render() {
    var name_file = '';
    this.state.file ? name_file = this.state.file.name : name_file = '';

    return (
      <div style={useStyles.root}>
        <form noValidate onSubmit={e => this.handleSubmit(e)}>
          <Typography component="h1" variant="h5">
            Generar Diplomas
          </Typography>

          <input
            style={{display: 'none'}}
            id="contained-button-file"
            type="file"
            onChange={(e) => this.setState({file:e.target.files[0]})}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span" style={{marginTop: 20}}>
              <CloudUploadIcon style={{marginRight: 10}} />
              Seleccionar archivo
            </Button>
          </label>

          {/* Muestro el nombre del archivo que seleccionaron */}
          {name_file &&
            <div>
              <p style={{fontWeight: 'bold'}}>Archivo seleccionado:</p>
              <p style={{fontWeight: 'bold'}}>{name_file}</p>
            </div>
          }

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
      </div>
    );
  }

}

export default GenerateDiplomas