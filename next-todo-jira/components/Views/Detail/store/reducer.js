import {
  CLEAR_MESSAGES,
  SET_DATA,
  SET_ERROR,
  SET_LOADING,
  SET_OPTIONS,
  SET_SUCCESS
} from '@/components/Views/Detail/store/types';

export const initialValues = {
  isLoading: false,
  data: null,
  options: null,
  error: '',
  success: '',
  submitAction: () => {}
};

function detailsReducer(state, action) {
  const {type, payload} = action;

  switch (type) {
    case SET_LOADING:
      return {...state, isLoading: payload};

    case SET_DATA:
      return {...state, data: payload};

    case SET_OPTIONS:
      return {...state, options: payload};

    case SET_ERROR:
      return {...state, error: payload, success: ''};

    case SET_SUCCESS:
      return {...state, success: payload, error: ''};

    case CLEAR_MESSAGES:
      return {...state, success: '', error: ''};

    default:
      return state;
  }
}

export default detailsReducer;