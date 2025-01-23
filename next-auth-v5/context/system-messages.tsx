"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type SystemMessagesProps = {
  success: string | null;
  setSuccessMessage: (message?: string | undefined) => void;
  error: string | null;
  setErrorMessage: (message?: string | undefined) => void;
};

const SystemMessagesContext = createContext<SystemMessagesProps | null>(null);

export const useSystemMessages = () => {
  const context = useContext(SystemMessagesContext);

  if (!context) {
    throw new Error(
      "Component must be rendered as child component of SystemMessagesProvider",
    );
  }

  return context;
};

export const SystemMessagesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setSuccessMessage = useCallback(
    (message?: string | undefined) => {
      setSuccess(message || null);
    },
    [setSuccess],
  );

  const setErrorMessage = useCallback(
    (message?: string | undefined) => {
      setError(message || null);
    },
    [setError],
  );

  const systemMessages: SystemMessagesProps = useMemo(
    () => ({
      success,
      setSuccessMessage,
      error,
      setErrorMessage,
    }),
    [error, success, setSuccessMessage, setErrorMessage],
  );

  return (
    <SystemMessagesContext.Provider value={systemMessages}>
      {children}
    </SystemMessagesContext.Provider>
  );
};
