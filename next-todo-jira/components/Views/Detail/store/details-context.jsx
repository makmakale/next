'use client';
import {createContext, useContext, useEffect, useReducer} from 'react';
import detailsReducer, {initialValues} from '@/components/Views/Detail/store/reducer';
import {loadData, loadOptions} from "@/components/Views/Detail/store/actions";

const DetailsContext = createContext();

export const useDetailsContext = () => {
  const context = useContext(DetailsContext);

  if (!context) {
    throw new Error('Component must be rendered as child component of DetailsContext');
  }

  return context;
};

export const DetailsProvider = ({config, children}) => {
  const {submitAction = null} = config
  const [state, dispatch] = useReducer(detailsReducer, {
    ...initialValues,
    submitAction
  });

  useEffect(() => {
    if (!state.data && Object.hasOwn(config, 'getData')) {
      loadData(dispatch, config.getData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.data, config])

  useEffect(() => {
    if (!state.options && Object.hasOwn(config, 'getOptions')) {
      loadOptions(dispatch, config.getOptions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.options, config])

  return (
    <DetailsContext.Provider value={[state, dispatch]}>
      {children}
    </DetailsContext.Provider>
  );
};