import axios from 'axios';
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    time: 1000,
  },
  // .. other options
});

export default instance;
