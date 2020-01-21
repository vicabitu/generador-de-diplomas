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
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({id_institution: `${params.id}`});

    const url = 'http://127.0.0.1:8000/api/institucion/'+`${params.id}`;
    axios.get(url)
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
    const formData = new FormData()
    formData.append('name', this.state.name);
    if (this.state.new_logo) {
      formData.append('logo', this.state.new_logo[0]);
    } else {
      formData.append('logo', '');
    }
    formData.append('id', this.state.id_institution);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
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

  render() {
    if (this.state.new_logo) {
      var listLogos = [];
      for (var [key, value] of Object.entries(this.state.new_logo)) {
        let item = <li key={key}>{value.name}</li>;
        listLogos[key] = item;
      }
    }
    return (
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
            <img style={{width: 200, height: 200}} src={this.state.logo ? this.state.logo : ''} />
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
    )
  }
}

export default InstitutionDetail