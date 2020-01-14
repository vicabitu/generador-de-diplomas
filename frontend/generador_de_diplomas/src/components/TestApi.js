import React from 'react';
import axios from 'axios';

class TestApi extends React.Component {

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(result => {
      console.log(result.data)
    })
    .catch(console.log)
  }

  render() {
    return(
      <div>
        <h1>Test-Api</h1>
        <h1>Test-Api</h1>
      </div>
    );
  }
}

export default TestApi;