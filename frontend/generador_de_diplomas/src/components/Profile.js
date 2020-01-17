import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    marginTop: 20
  }
};

class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      last_name: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    let url = 'http://127.0.0.1:8000/api/user/'+this.props.userId;
    console.log(url);
    axios.get(url)
    .then((response) => { 
      this.setState({name: response.data.first_name});
      this.setState({last_name: response.data.last_name});
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    let url = 'http://127.0.0.1:8000/api/update_user/'+this.props.userId;
    const data = {"first_name": this.state.name, "last_name": this.state.last_name};
    axios.put(url, data)
    .then(function (response) {
    })
    .catch(function (error) {
    });

  }

  render(){
    return (
      <div style={useStyles.root}>
        <form noValidate onSubmit={e => this.handleSubmit(e)}>
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
          <TextField
            name='apellido'
            label='Apellido'
            type='text'
            margin='normal'
            fullWidth
            placeholder='Apellido'
            value={this.state.last_name}
            onChange={(e) => this.setState({last_name:e.target.value})}
          />
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
export default Profile
