import axios from 'axios';
import { push } from 'react-router-redux'
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import {
  MECANO_REGISTRATION_ERROR,
  REGISTERED_MECANO,
  UPDATED_MECANO
} from './types';


// API CALLS

export function registerMecano(data, next_path){
  return dispatch => {
    return axios.post('/api/mecano_profiles', data)
      .then(response => {
        dispatch(push(next_path))
        dispatch(registeredMecano(response.data.mecano_profile))
        setNextHeaders(response.headers)
      }).catch(error => {
        mecanoRegistrationError(error.response)
        setNextHeaders(error.response.headers)
      })
  };
};

export function updateMecanoProfile(id, data, next_path){
  return dispatch => {
    return axios.put(`/api/mecano_profiles/${id}`, data)
      .then(response => {
        dispatch(push(next_path))
        dispatch(updatedMecano(response.data.mecano_profile))
        setNextHeaders(response.headers)
      }).catch(error => {
        console.log(error)
        mecanoRegistrationError(error.response)
        setNextHeaders(error.response.headers)
      })
  };
};


// REDUX ACTION CREATORS

export function registeredMecano(mecano_profile) {
  return {
    type: REGISTERED_MECANO,
    mecano_profile
  };
}

export function updatedMecano(mecano_profile) {
  return {
    type: UPDATED_MECANO,
    mecano_profile
  };
}

export function mecanoRegistrationError(errors) {
  console.log(errors)
  if(!errors){
    return {
      type: MECANO_REGISTRATION_ERROR,
      payload: { main: "erreur d'enregistrement" }
    }
  }
  const errorGroup = {};
  Object.keys(errors).forEach(function(key,index) {
    errorGroup[key] = errors[key];
  });
}