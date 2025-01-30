'use client';
import {
  CLEAR_MESSAGES,
  SET_DATA,
  SET_ERROR,
  SET_LOADING,
  SET_OPTIONS,
  SET_SUCCESS
} from '@/components/Views/Detail/store/types';

export const toggleLoading = (value) => ({type: SET_LOADING, payload: value});
export const setDetails = (data) => ({type: SET_DATA, payload: data});
export const setOptions = (options) => ({type: SET_OPTIONS, payload: options});
export const setError = (error) => ({type: SET_ERROR, payload: error});
export const setSuccess = (success) => ({type: SET_SUCCESS, payload: success});
export const clearMessages = () => ({type: CLEAR_MESSAGES});

export const loadData = async (dispatch, getData) => {
  // clear data for init loading
  dispatch(setDetails(null))
  dispatch(toggleLoading(true))

  try {
    const {data, error} = await getData()

    if (data) dispatch(setDetails(data))
    if (error) dispatch(setError(error))

  } finally {
    dispatch(toggleLoading(false))
  }
}

export const loadOptions = async (dispatch, getOptions) => {
  dispatch(setOptions(null))
  dispatch(toggleLoading(true))

  try {
    const {data, error} = await getOptions()

    if (data) dispatch(setOptions(data))
    if (error) dispatch(setError('error', error))

  } finally {
    dispatch(toggleLoading(false))
  }
}