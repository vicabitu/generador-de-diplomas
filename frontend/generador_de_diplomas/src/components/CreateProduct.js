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

class CreateProduct extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      code: '',
      avales: null,
      firmas: null,
      producto_id: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAvales = this.handleAvales.bind(this);
    this.handleFirmas = this.handleFirmas.bind(this);
    this.createFirmas = this.createFirmas.bind(this);
    this.createAvales = this.createAvales.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Handle Submit");
    this.createProduct();
  }

  createProduct = () => {
    const url = 'http://127.0.0.1:8000/api/crear_producto';
    const formData = new FormData();
    formData.append('code', this.state.code);
    console.log("Create product");
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    axios.post(url, formData, config)
    .then((response) => {
      console.log("Entre al then de create product");
      this.setState({producto_id: response.data.id});
      this.createFirmas();
      this.createAvales();
    })
    .catch(function (error) {
      console.log("Error");
    });
  }

  createFirmas() {
    const url = 'http://127.0.0.1:8000/api/crear_firma';
    const formData = new FormData();
    console.log("Crear firmas");
    console.log(this.state.firmas);
    
    console.log("Por entrar al for");
    for (var [key, value] of Object.entries(this.state.firmas)) {
      console.log((value));
      
      formData.append('image', value);
      formData.append('product', this.state.producto_id);
      
      const config = {
      headers: {
          'content-type': 'multipart/form-data'
        }
      };
      console.log("Form Data");
      console.log(formData);
      axios.post(url, formData, config)
      .then(function (response) {
        console.log("Entre al then de crear firma");
        console.log(response);
      })
      .catch(function (error) {
        console.log("Error");
      });
    }
  }

  createAvales() {
    const url = 'http://127.0.0.1:8000/api/crear_aval';
    const formData = new FormData();
    console.log("Crear avales");
    console.log(this.state.avales);
    
    console.log("Por entrar al for");
    for (var [key, value] of Object.entries(this.state.avales)) {
      console.log((value));
      
      formData.append('image', value);
      formData.append('product', this.state.producto_id);
      
      const config = {
      headers: {
          'content-type': 'multipart/form-data'
        }
      };
      console.log("Form Data");
      console.log(formData);
      axios.post(url, formData, config)
      .then(function (response) {
        console.log("Entre al then de crear avales");
        console.log(response);
      })
      .catch(function (error) {
        console.log("Error");
      });
    }
  }

  handleFirmas = (files) => {
    console.log("handle firmas");
    console.log(files);
    this.setState({firmas:files});
    console.log(this.state.firmas);
  }

  handleAvales = (files) => {
    console.log("handle avales")
    console.log(files);
    this.setState({avales:files})
    console.log(this.state.avales)
  };

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
          // onChange={(d) => this.setState({firmas:d.target.files})}
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
      </div>
    );
  }
}

export default CreateProduct