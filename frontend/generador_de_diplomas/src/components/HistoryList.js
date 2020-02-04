import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

class HistoryList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      history: []
    }
  }
  
  componentDidMount() {
    const url = 'http://127.0.0.1:8000/api/historial';

    axios.get(url)
    .then((response) => {
      this.setState({history: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (

      <div>
        <MaterialTable
          title="Historial"
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'Nombre', field: 'user.first_name' },
            { title: 'Apellido', field: 'user.last_name' },
            { title: 'Email', field: 'user.email' },
            { title: 'Fecha', field: 'date' },
            { title: 'Archivo', field: 'file_name' },
            { title: 'Observaciones', field: 'observations' }
          ]}
          data={this.state.history.length > 0 ? this.state.history : []}
          options={{
            pageSize: 10,
            pageSizeOptions: [20,25],
        }}
        />
      </div>
    );
  }
}

export default HistoryList;