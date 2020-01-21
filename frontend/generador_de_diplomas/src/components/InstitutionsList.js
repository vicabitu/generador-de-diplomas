import React, { Component } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

class InstitutionsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      institutions: []
    }
  }
  
  componentDidMount(){
    const url = 'http://127.0.0.1:8000/api/instituciones';

    axios.get(url)
    .then((response) => {
      this.setState({institutions: response.data});
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  
  render() {
    return (
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
                <VisibilityIcon>
                </VisibilityIcon>
              </Link>
            )
          },
          {
            title: 'Eliminar',
            field: 'delete',
            render: rowData => (
              <DeleteIcon>
              </DeleteIcon>
            )
          }
        ]}
        data={this.state.institutions.length > 0 ? this.state.institutions : []}
      />
    )
  }
}

export default InstitutionsList;