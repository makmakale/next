'use client'
import {
  CLEAR_MESSAGE,
  SET_DATA,
  SET_LOADING,
  SET_MESSAGE,
  SET_PAGE_INDEX,
  SET_PAGE_SIZE,
  SET_SEARCH_VALUE
} from "@/components/Views/Table/store/types";
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "@/lib/constants";

export const toggleLoading = (value) => ({type: SET_LOADING, payload: value})
export const setData = (data) => ({type: SET_DATA, payload: data})
export const setMessage = (type, message) => ({type: SET_MESSAGE, payload: {type, message}})
export const clearMessage = () => ({type: CLEAR_MESSAGE})
export const setSearchValue = (str) => ({type: SET_SEARCH_VALUE, payload: str})
export const setPageSize = (value) => ({type: SET_PAGE_SIZE, payload: value})
export const setPageIndex = (value) => ({type: SET_PAGE_INDEX, payload: value})

export const loadData = async (state, dispatch) => {
  // clear rows for init loading
  dispatch(setData({rows: [], count: 0}))
  dispatch(toggleLoading(true))

  try {
    const {data, error} = await state.getData({
      offset: state.page || DEFAULT_PAGE_INDEX,
      limit: state.rowsPerPage || DEFAULT_PAGE_SIZE,
      q: state.searchValue || ''
    })

    if (data) dispatch(setData(data))
    if (error) dispatch(setMessage('error', error))

  } finally {
    dispatch(toggleLoading(false))
  }
}
