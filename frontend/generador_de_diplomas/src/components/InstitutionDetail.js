import React from 'react'

class InstitutionDetail extends React.Component {

  componentDidMount() {
    const { match: { params } } = this.props;
    console.log("Component did mount")
    console.log(this.props);
    console.log(`${params.id}`)
  }

  render() {
    console.log(`${this.props.params}`)
    return (
      <div>
        <h1>Detalle de institucion</h1>
      </div>
    )
  }
}

export default InstitutionDetail