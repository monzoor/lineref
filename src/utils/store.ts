interface IStore {
  isLoading?: boolean;
  isLoaded?: boolean;
  isError?: boolean;
  data?: any;
}

export const getLoadingState = (state = {}): IStore => ({
  ...state,
  isLoading: true,
  isLoaded: false,
  isError: false,
});

export const getReadyState = (data = {}): IStore => ({
  data,
  isLoading: false,
  isLoaded: true,
  isError: false,
});

export const getErrorState = (data = {}): IStore => ({
  data,
  isLoading: false,
  isLoaded: false,
  isError: true,
});

export const isLoading = (state: IStore = {}) => !!state.isLoading;
export const isLoaded = (state: IStore = {}) => !!state.isLoaded;
export const isError = (state: IStore = {}) => !!state.isError;

export const getData = (state: IStore = {}, defaultValue = {}) =>
  state.data || defaultValue;
export const hasData = (state: IStore = {}) => !!state.data;
export const shouldLoad = (state: IStore = {}) =>
  !state.isLoaded && !state.isLoading;
