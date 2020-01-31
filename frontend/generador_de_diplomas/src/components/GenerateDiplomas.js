import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

class GenerateDiplomas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null,
      fileZip: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.save = this.save.bind(this);
  }

  save(){
    console.log("Estoy en el save");
    console.log(this.state.fileZip);
    // const blod = new Blob([this.state.fileZip], {type: "application/zip"});
    // console.log(blod);
    
    // const url = window.URL.createObjectURL(blod);
    // console.log(url);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = 'diplomas.zip';
    // a.click()

    // var file;
    // var data = [];
    // data.push(this.state.fileZip);
    // var properties = {type: 'application/octet-stream'}; // Specify the file's mime-type.
    // try {
    //   // Specify the filename using the File constructor, but ...
    //   file = new File(data, "file.zip", properties);
    // } catch (e) {
    //   // ... fall back to the Blob constructor if that isn't supported.
    //   file = new Blob(data, properties);
    // }
    // var url = URL.createObjectURL(file);
    // document.getElementById('link').href = url;
    
    // var fileDownload = require('js-file-download');
    // fileDownload(this.state.fileZip, 'diplomas.zip');
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.file);
    const url = 'http://127.0.0.1:8000/api/generar_diplomas';

    const formData = new FormData();
    formData.append('file', this.state.file);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    axios.post(url, formData, config)
    .then((response) => {
      console.log("Entre al then");
      console.log(response);

      // var binario = response.data;
      // var name = 'diplomas.zip';

      // this.setState({fileZip: binario});

      // var fileDownload = require('js-file-download');
      // fileDownload(response.data, 'diplomas.zip');
      // window.location.reload('http://127.0.0.1:8000/media/diplomas/Generate_Diplomas.zip')
      window.location.replace("http://127.0.0.1:8000/media/diplomas/diplomas.zip")
    })
    .catch(function (error) {
      console.log("Error");
    });

  }

  render() {
    return (
      <div style={useStyles.root}>
        <form noValidate onSubmit={e => this.handleSubmit(e)}>
          <Typography component="h1" variant="h5">
            Generar Diplomas.
          </Typography>

          <input
            style={{display: 'none'}}
            id="contained-button-file"
            type="file"
            onChange={(e) => this.setState({file:e.target.files[0]})}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span" style={{marginTop: 20}}>
              <CloudUploadIcon style={{marginRight: 10}} />
              Seleccionar archivo
            </Button>
          </label>

          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={useStyles.submit}
          >
            Generar
          </Button>
        </form>

        <Button 
            fullWidth
            variant="contained"
            color="primary"
            style={useStyles.submit}
            onClick={ () => this.save() }
          >
            Generar
          </Button>

          <a id="download_link" download="my_exported_file.txt" href='' >Download as Text File</a>
      </div>
    );
  }

}

export default GenerateDiplomas