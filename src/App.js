import logo from './logo.svg';
import './App.css';
import { BlobServiceClient } from "@azure/storage-blob";


const blobSasUrl = 'https://soafiles.blob.core.windows.net/?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-04-25T13:35:04Z&st=2021-03-25T05:35:04Z&spr=https,http&sig=3pa3Q8quR2KbhVpXWwzOxENduRl6p8Fe3po9oXzgIMo%3D';
const blobServiceClient = new BlobServiceClient(blobSasUrl);

const containerName = 'files';
const containerClient = blobServiceClient.getContainerClient(containerName);


const uploadFiles = async (event) => {

    try {
        const promises = [];
        for (const file of event.target.files) {
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
            promises.push(blockBlobClient.uploadBrowserData(file));
        }
        await Promise.all(promises);
        alert('Done.');
    }
    catch (error) {
        alert(error.message);
    }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <input type="file" multiple onChange={uploadFiles}/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

//npm install @azure/storage-blob