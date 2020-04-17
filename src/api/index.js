const axios = require('axios');

const getPendingPlans = async () => {
  try {
    return axios.get(`${process.env.REACT_APP_API_URL}/plans/pending`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  } catch (err) {
    return err;
  }
};

const getMasterListPlans = async () => {
  try {
    return axios.get(`${process.env.REACT_APP_API_URL}/plans`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  } catch (err) {
    return err;
  }
};

export default {
  getPendingPlans,
  getMasterListPlans
};
