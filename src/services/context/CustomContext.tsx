import React, {createContext, useState, useContext, ReactNode} from 'react';
import CustomAlertDialog from './CustomAlertDialog';

type DialogButton = {
  text: string;
  onPress?: () => void;
};

type DialogOptions = {
  title: string;
  message: string;
  buttons?: DialogButton[];
};

type CustomContextType = {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  showDialog: (options: DialogOptions) => void;
  hideDialog: () => void;
};

const LoaderContext = createContext<CustomContextType | undefined>(undefined);

// Export variables for direct access
let showLoaderFunction: () => void;
let hideLoaderFunction: () => void;
let showDialogFunction: (options: DialogOptions) => void;
let hideDialogFunction: () => void;

export const ContextProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(
    null,
  );

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  const showDialog = (options: DialogOptions) => setDialogOptions(options);
  const hideDialog = () => setDialogOptions(null);

  // Assign functions to variables for global access
  showLoaderFunction = showLoader;
  hideLoaderFunction = hideLoader;
  showDialogFunction = showDialog;
  hideDialogFunction = hideDialog;

  return (
    <LoaderContext.Provider
      value={{isLoading, showLoader, hideLoader, showDialog, hideDialog}}>
      {children}
      {dialogOptions && (
        <CustomAlertDialog
          title={dialogOptions.title}
          message={dialogOptions.message}
          buttons={dialogOptions.buttons}
          onClose={hideDialog}
        />
      )}
    </LoaderContext.Provider>
  );
};

export const useCustomContext = (): CustomContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

// Export loader functions
export const showLoader = () => showLoaderFunction();
export const hideLoader = () => hideLoaderFunction();

export const showDialog = (options: DialogOptions) =>
  showDialogFunction(options);
export const hideDialog = () => hideDialogFunction();
