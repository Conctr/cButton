import axios from './init';
import { CONCTR_APP_ID, ACTION_TRIGGER_API_KEY } from '../../config';

// ----------------------------------------------------------------- AUTH ROUTES
const loginConsumer = (email, pwd) => {
  const payload = {
    userData: {
      email: email,
      pwd: pwd
    }
  };

  return axios.post(`/consumers/admin/${CONCTR_APP_ID}/login`, payload);
};

const signupConsumer = (email, pwd, captcha_resp) => {
  const payload = {
    userData: {
      email: email,
      pwd: pwd
    },
    captcha_resp: captcha_resp
  };

  return axios.post(`/consumers/admin/${CONCTR_APP_ID}/register`, payload);
};

const oAuthLogin = (provider, accessToken) => {
  const payload = {
    'provider': provider
  };

  const headers = {
    'headers': {
      'Authorization': `oth:${accessToken}`
    }
  };

  return axios.post(`/consumers/admin/${CONCTR_APP_ID}/oauth/login`, payload, headers);
};

const oAuthSignup = (provider, accessToken) => {
  const payload = {
    'provider': provider
  };

  const headers = {
    'headers': {
      'Authorization': `oth:${accessToken}`
    }
  };

  return axios.post(`/consumers/admin/${CONCTR_APP_ID}/oauth/register`, payload, headers);
};

// FIXME: Currently not working: Email redirects to CONCTR Consumer Portal 
// Also errors on password change - CONCTR backend
const forgotPassword = (email) => {
  const payload = {
    email: email
  };

  return axios.post(`/consumers/admin/${CONCTR_APP_ID}/forgotPassword`, payload);
};



// --------------------------------------------------------------- DEVICE ROUTES
const getDevice = (deviceId) => {
  return axios.get(`/consumers/admin/${CONCTR_APP_ID}/devices/${deviceId}`);
};

const getAllConsumerDevices = () => {
  return axios.get(`/consumers/admin/${CONCTR_APP_ID}/devices/`);
};

const updateDevice = (deviceId, updatedDevice) => {
  return axios.patch(`/consumers/admin/${CONCTR_APP_ID}/devices/${deviceId}`, updatedDevice);
};

const getHistoricalDeviceData = (deviceId) => {
  return axios.post(`/consumers/data/${CONCTR_APP_ID}/devices/historical/search/${deviceId}`);
};

// -------------------------------------------------------------- PROFILE ROUTES
const getConsumerProfile = () => {
  return axios.get(`/consumers/admin/${CONCTR_APP_ID}/profile/`);
};

// FIXME: Currently not working: "Conn is not defined" 
// Jaye says it's a CONCTR end bug
const updateConsumerProfile = (updatedConsumer) => {
  return axios.patch(`/consumers/admin/${CONCTR_APP_ID}/profile/`, updatedConsumer);
};


// -------------------------------------------------------------- ACTION TRIGGERS

// CONCTR Admit 'Action Editor' token gets sent through for Action API Calls
const actionToken = {
  headers: {
    'Authorization': `api:${ACTION_TRIGGER_API_KEY}`
  }
};

const updateExistingAction = (deviceId, body) => {

  const reference = `action_${deviceId}`;
  return axios.patch(`/admin/apps/${CONCTR_APP_ID}/actions/${reference}`, body, actionToken);
};


const makeAction = (body) => {
  return axios.post(`/admin/apps/${CONCTR_APP_ID}/actions`, body, actionToken);
};


const makeRule = (body) => {
  return axios.post(`/admin/apps/${CONCTR_APP_ID}/rules`, body, actionToken);
};

const ingestData = (deviceId, body) => {
  return axios.post(`/consumers/data/apps/${CONCTR_APP_ID}/devices/${deviceId}`, body);
};

const getAction = (actionId) => {
  return axios.get(`/admin/apps/${CONCTR_APP_ID}/actions/${actionId}`, actionToken);
};


export default {
  loginConsumer,
  signupConsumer,
  forgotPassword,
  getDevice,
  getAllConsumerDevices,
  updateDevice,
  getHistoricalDeviceData,
  getConsumerProfile,
  updateConsumerProfile,
  oAuthLogin,
  oAuthSignup,
  makeAction,
  makeRule,
  ingestData,
  updateExistingAction,
  getAction
};