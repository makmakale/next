import {
  CLEAR_MESSAGE,
  SET_DATA,
  SET_LOADING,
  SET_MESSAGE,
  SET_PAGE_INDEX,
  SET_PAGE_SIZE,
  SET_SEARCH_VALUE
} from '@/components/Views/Table/store/types';
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from '@/lib/constants';

export const initialValues = {
  isLoading: true,
  getData: null,
  rows: [],
  total: 0,
  message: null,
  searchValue: '',
  page: DEFAULT_PAGE_INDEX,
  rowsPerPage: DEFAULT_PAGE_SIZE,
};

function tableReducer(state, action) {
  const {type, payload} = action;

  switch (type) {
    case SET_LOADING:
      return {...state, isLoading: payload};

    case SET_DATA:
      return {...state, rows: payload.rows, total: payload.count};

    case SET_MESSAGE:
      return {...state, error: payload, message: {...payload}};

    case CLEAR_MESSAGE:
      return {...state, error: payload, message: null};

    case SET_SEARCH_VALUE:
      return {...state, searchValue: payload};

    case SET_PAGE_SIZE:
      return {...state, rowsPerPage: payload};

    case SET_PAGE_INDEX:
      return {...state, page: payload};

    default:
      return state;
  }
}

export default tableReducer;