import {
  LOGIN_SUCCESS,
  MECANO_REGISTRATION_ERROR,
  REGISTERED_MECANO,
  REGISTERED_DOMAINS
} from '../actions/types';

const INITIAL_STATE = {
    mecano_profile: null,
    technical_skills: [],
    car_makes: [],
    errors: {}
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, mecano_profile: action.user.mecano_profile}
    case MECANO_REGISTRATION_ERROR:
      const new_errors = Object.assign({}, state.errors, action.error);
      return { ...state, errors: new_errors }
    case REGISTERED_MECANO:
      return { ...state, mecano_profile: action.mecano_profile }
    case REGISTERED_DOMAINS:
      const car_makes = state.car_makes;
      const technical_skills = state.technical_skills;
      action.domains.map((domain) =>{
        if(domain.kind === 'car_make'){
          if(!car_makes.includes(domain.name)){car_makes.push(domain.name)};
        }else{
          if(!technical_skills.includes(domain.name)){technical_skills.push(domain.name)};
        }
      })
      return { ...state, car_makes, technical_skills }
    default:
      return state;
  }
}
