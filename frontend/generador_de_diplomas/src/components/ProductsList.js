import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class ProductsList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      products: [],
      openModal: false,
      name: '',
      id: null
    }
  }

  componentDidMount() {

    const url = 'http://127.0.0.1:8000/api/products';

    axios.get(url)
    .then((response) => {
      this.setState({products: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
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
                  // <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/detalle_institucion/${rowData.id}`}>
                    <IconButton>
                      <VisibilityIcon>
                      </VisibilityIcon>
                    </IconButton>
                  // </Link>
                )
              },
              {
                title: 'Eliminar',
                field: 'delete',
                render: rowData => (
                  <IconButton aria-label="delete"> 
                    <DeleteIcon> 
                    </DeleteIcon>
                  </IconButton>
                )
              }
            ]}
            data={this.state.products.length > 0 ? this.state.products : []}
          />
        </div>
      </div>
    )
  }
}

export default ProductsList;