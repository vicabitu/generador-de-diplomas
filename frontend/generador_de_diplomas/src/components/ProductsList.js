import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class ProductsList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      products: [],
      openModal: false,
      product_code: null,
      id: null
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {

    const url = 'http://127.0.0.1:8000/api/products';
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));

    axios.get(url, { headers: { Authorization: AuthStr } })
    .then((response) => {
      this.setState({products: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleOpenModal(product_code, id) {
    this.setState({product_code: product_code});
    this.setState({id: id});
    this.setState({openModal: true});
  }

  handleCloseModal() {
    this.setState({openModal: false});
  }

  // Funcion que se encarga de manejar la confirmacion del modal.
  // Elimina el producto.
  handleConfirmModal() {
    const url = 'http://127.0.0.1:8000/api/eliminar_producto/'+this.state.id;
    const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token'));

    axios.delete(url, { headers: { Authorization: AuthStr } })
    .then((response) => {
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
            title="Productos"
            columns={[
              { title: 'Código', field: 'code' },
              {
                title: 'Firmas',
                field: 'firmas',
                render: rowData => (
                  <p>{rowData.firmas.length}</p>
                ),
              },
              {
                title: 'Avales',
                field: 'avales',
                render: rowData => (
                  <p>{rowData.avales.length}</p>
                ),
              },
              {
                title: 'Ver detalle',
                field: 'detail',
                render: rowData => (
                  <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/detalle_de_producto/${rowData.id}`}>
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
                  <IconButton onClick={() => this.handleOpenModal(rowData.code, rowData.id)} aria-label="delete"> 
                    <DeleteIcon> 
                    </DeleteIcon>
                  </IconButton>
                )
              }
            ]}
            data={this.state.products.length > 0 ? this.state.products : []}
          />
        </div>

        <Dialog
            open={this.state.openModal}
            onClose={() => this.handleCloseModal()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Eliminar</DialogTitle>
            <DialogContent id="alert-dialog-description">
              <DialogContentText style={{display: 'inline'}}>
                {'Desea eliminar el producto '}
              </DialogContentText>
              <DialogContentText style={{display: 'inline', fontWeight: 'bold'}}>
                {this.state.product_code}
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
    )
  }
}

export default ProductsList;