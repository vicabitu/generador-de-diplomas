import React, { Component } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class InstitutionsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      institutions: [],
      openModal: false,
      name: '',
      id: null
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleConfirmModal = this.handleConfirmModal.bind(this);
  }
  
  componentDidMount(){
    // Obtengo las instituciones para mostrarlas en el listado
    const url = 'http://127.0.0.1:8000/api/instituciones';
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));

    axios.get(url, { headers: { Authorization: AuthStr } })
    .then((response) => {
      this.setState({institutions: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleOpenModal(name, id) {
    this.setState({name: name});
    this.setState({id: id});
    this.setState({openModal: true});
  }

  handleCloseModal() {
    this.setState({openModal: false});
  }

  handleConfirmModal() {
    const url = 'http://127.0.0.1:8000/api/eliminar_institucion/'+this.state.id;
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));

    axios.delete(url, { headers: { Authorization: AuthStr } })
    .then((response) => {
      console.log("Entre al then de eliminar la institucion")
    })
    .catch(function (error) {
      console.log(error);
    })
    this.setState({openModal: false});
    window.location.reload();
  }
  
  render() {
    return (
      <div>
        <div>
          <MaterialTable
            title="Instituciones"
            columns={[
              { title: 'Nombre', field: 'name' },
              {
                title: 'Logo',
                field: 'logo',
                render: rowData => (
                  <a target="_blank" href={rowData.logo} >
                    <img
                      style={{ height: 55, width: 55 }}
                      src={rowData.logo}
                    />
                  </a>
                ),
              },
              {
                title: 'Ver detalle',
                field: 'detail',
                render: rowData => (
                  <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/detalle_institucion/${rowData.id}`}>
                    <IconButton>
                      <VisibilityIcon>
                      </VisibilityIcon>
                    </IconButton>
                  </Link>
                )
              },
              {
                title: 'Eliminar',
                field: 'delete',
                render: rowData => (
                  <IconButton onClick={() => this.handleOpenModal(rowData.name, rowData.id)} aria-label="delete">
                    <DeleteIcon>
                    </DeleteIcon>
                  </IconButton>
                )
              }
            ]}
            data={this.state.institutions.length > 0 ? this.state.institutions : []}
          />
        </div>

        <div>
          <Dialog
            open={this.state.openModal}
            onClose={() => this.handleCloseModal()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Eliminar</DialogTitle>
            <DialogContent id="alert-dialog-description">
              <DialogContentText style={{display: 'inline'}}>
                {'Desea eliminar la institución '}
              </DialogContentText>
              <DialogContentText style={{display: 'inline', fontWeight: 'bold'}}>
                {this.state.name}
              </DialogContentText>
              <DialogContentText style={{display: 'inline'}}>
                {'?'}
              </DialogContentText>
              <DialogActions>
                <Button onClick={() => this.handleCloseModal()} color="primary">
                  Cancelar
                </Button>
                <Button onClick={() => this.handleConfirmModal()} color="primary" autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }
}

export default InstitutionsList;