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

const updateMasterListPlan = async (body, id) => {
  try {
    return axios.put(`${process.env.REACT_APP_API_URL}/plans/${id}`, body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  } catch (err) {
    return err;
  }
};

const deleteMasterListPlan = async id => {
  try {
    return axios.delete(`${process.env.REACT_APP_API_URL}/plans/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  } catch (err) {
    return err;
  }
};

const updatePlanMapper = async body => {
  try {
    return axios.put(`${process.env.REACT_APP_API_URL}/plan-mappers`, body, {
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
  getMasterListPlans,
  updateMasterListPlan,
  deleteMasterListPlan,
  updatePlanMapper
};
