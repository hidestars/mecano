import {
  GOT_CAR_MAKES,
  GOT_CAR_MODELS,
  SELECTED_CAR_MAKE,
  REMOVED_CAR_MAKE
} from '../actions/types';

const INITIAL_STATE = {
    car_makes_list: [],
    selected_car_makes: []
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_CAR_MAKES:
      return { ...state, car_makes_list: action.car_makes_list}
    // case GOT_CAR_MODELS:
    //   return { ...state, car_models_list: action.car_models_list }
    case SELECTED_CAR_MAKE:
      return { ...state, selected_car_makes: [...state.selected_car_makes, action.carMake] }
    case REMOVED_CAR_MAKE:
      const new_list = state.selected_car_makes
      const index = new_list.indexOf(action.carMake);
      index !== -1 ? new_list.splice(index, 1) : new_list;
      return { ...state, selected_car_makes: new_list }
    default:
      return state;
  }
}