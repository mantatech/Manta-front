<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="fetchRmInfo">Fetch RM Info</button>
    <button @click="fetchNameServerList">Get Name Server List</button>
    <button @click="fetchAiModules">Fetch AI Modules</button>
    <button @click="fetchDistributedDatasets">Fetch Distributed Datasets</button>
    <button @click="fetchSessions">Fetch Sessions</button>
    <div>
      <label for="sessionNameInput">Session Name:</label>
      <input type="text" id="sessionNameInput" v-model="sessionName" />
      <button @click="startSession">Start Session</button>
    </div>

    <form @submit.prevent="uploadSessionFile">
      <input type="file" ref="fileInput" accept=".yaml" />
      <button type="submit">Upload YAML File</button>
    </form>
    <div v-if="fetchedData">
      <h2>Fetched Data:</h2>
      <pre>{{ fetchedData }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
      fetchedData: null
    };
  },
  methods: {
    fetchRmInfo() {
      axios.get('http://localhost:5000/api/resource-manager-info')
        .then(response => {
          console.log(response.data);
          this.fetchedData = JSON.stringify(response.data, null, 2);
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchNameServerList() {
      axios.get('http://localhost:5000/api/name-server-list')
        .then(response => {
          console.log(response.data);
          this.fetchedData = JSON.stringify(response.data, null, 2);
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchAiModules() {
      axios.get('http://localhost:5000/api/ai-modules')
        .then(response => {
          console.log(response.data);
          this.fetchedData = JSON.stringify(response.data, null, 2);
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchDistributedDatasets() {
      axios.get('http://127.0.0.1:5000/api/distributed-datasets')
        .then(response => {
          console.log(response.data);
          this.fetchedData = JSON.stringify(response.data, null, 2);
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchSessions() {
      axios.get('http://127.0.0.1:5000/api/sessions')
        .then(response => {
          console.log(response.data);
          this.fetchedData = JSON.stringify(response.data, null, 2);
        })
        .catch(error => {
          console.error(error);
        });
    },
    startSession() {
      // Send a POST request to start a session with the entered session name
      axios.post('http://127.0.0.1:5000/api/start-session', { session_name: this.sessionName })
        .then(response => {
          console.log(response.data);
          // Handle the response from the server
        })
        .catch(error => {
          console.error(error);
        });
    },

    uploadSessionFile() {
      const fileInput = this.$refs.fileInput;
      if (fileInput.files.length === 0) {
        console.error('No file selected.');
        return;
      }

      // Create a FormData object to append the selected file
      const formData = new FormData();
      formData.append('sessionFile', fileInput.files[0]);

      axios.post('http://console-flask:5000/api/register-session', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      })
        .then(response => {
          console.log(response.data);
          // Handle the response from the server
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
