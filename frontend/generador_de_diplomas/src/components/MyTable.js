import React, { Component } from 'react'
import MaterialTable from 'material-table'
import DescriptionIcon from '@material-ui/icons/Description';

class MyTable extends Component {
  
  
  
  render() {
    return (
      // <MaterialTable
      //   title="Instituciones"
      //   columns={[
      //     { title: 'Nombre', field: 'name' },
      //     { title: 'Surname', field: 'surname' },
      //     { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      //     {
      //       title: 'Birth Place',
      //       field: 'birthCity',
      //       lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      //     },
      //   ]}
      //   data={[
      //     { name: 'UNPSJB', surname: 'Baran', birthYear: 1987, birthCity:  <DescriptionIcon /> },
      //     { name: 'IDES', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      //     { name: 'Universidad del Sur', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      //     { name: 'Colegio Nacional', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      //     { name: 'Universidad de Buenos Aires', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      //     { name: 'Universidad Nacional de la Plata', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      //   ]}        
      //   options={{
      //     search: true
      //   }}
      // />
      <MaterialTable
        title="Remote Data Preview"
        columns={[
          {
            title: 'Avatar',
            field: 'avatar',
            render: rowData => (
              <img
                style={{ height: 36, borderRadius: '50%' }}
                src={rowData.avatar}
              />
            ),
          },
          { title: 'Id', field: 'id' },
          { title: 'First Name', field: 'first_name' },
          { title: 'Last Name', field: 'last_name' },
        ]}
        data={query =>
          new Promise((resolve, reject) => {
            let url = 'https://reqres.in/api/users?'
            url += 'per_page=' + query.pageSize
            url += '&page=' + (query.page + 1)
            fetch(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                })
              })
          })
        }
        />
    )
  }
}

export default MyTable;