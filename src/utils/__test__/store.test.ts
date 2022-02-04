import {
  isLoaded,
  isLoading,
  isError,
  getErrorState,
  getLoadingState,
  getReadyState,
  getData,
  shouldLoad,
  hasData,
} from '@utils/store';

describe('Store utilities', () => {
  describe('isLoaded', () => {
    it('should use default value', () => {
      expect(isLoaded()).toEqual(false);
    });

    it('should return correct loaded state when data is loaded', () => {
      const data = {
        name: 'Test',
        isLoaded: true,
      };

      expect(isLoaded(data)).toEqual(true);
    });

    it('should return correct loaded state when data is not loaded', () => {
      const data: any = {
        name: 'Test',
      };

      expect(isLoaded(data)).toEqual(false);
    });
  });

  describe('isLoading', () => {
    it('should use default value', () => {
      expect(isLoading()).toEqual(false);
    });

    it('should return correct loading state when loading in process', () => {
      const data: any = {
        name: 'Test',
        isLoading: true,
      };

      expect(isLoading(data)).toEqual(true);
    });

    it('should return correct loading state when loading is not in process', () => {
      const data: any = {
        name: 'Test',
      };

      expect(isLoading(data)).toEqual(false);
    });
  });

  describe('isError', () => {
    it('error state should use default value', () => {
      expect(isError()).toEqual(false);
    });

    it('should return correct error state when error is present', () => {
      const data = {
        name: 'Test',
        isError: true,
      };

      expect(isError(data)).toEqual(true);
    });

    it('should return correct error state when error is not present', () => {
      const data: any = {
        name: 'Test',
      };

      expect(isError(data)).toEqual(false);
    });
  });

  describe('getReadyState', () => {
    it('should return correct state when no value passed', () => {
      expect(getReadyState()).toMatchObject({
        isLoaded: true,
        isLoading: false,
        isError: false,
      });
    });

    it('should set correct state when value is passed', () => {
      const data = {
        name: 'Test',
      };

      expect(getReadyState(data)).toMatchObject({
        isLoaded: true,
        isLoading: false,
        isError: false,
      });
    });
  });

  describe('getLoadingState', () => {
    it('should set correct loading state', () => {
      const data = {
        name: 'Test',
      };

      expect(getLoadingState(data)).toMatchObject({
        isLoaded: false,
        isLoading: true,
        isError: false,
      });
    });

    it('should return correct state when no value passed', () => {
      expect(getLoadingState()).toMatchObject({
        isLoaded: false,
        isLoading: true,
        isError: false,
      });
    });
  });

  describe('getErrorState', () => {
    it('should return correct state when no value passed', () => {
      expect(getErrorState()).toMatchObject({
        isLoaded: false,
        isLoading: false,
        isError: true,
      });
    });

    it('should set correct state', () => {
      const data = {
        name: 'Test',
      };

      expect(getErrorState(data)).toMatchObject({
        isLoaded: false,
        isLoading: false,
        isError: true,
      });
    });
  });

  describe('getData', () => {
    it('should return correct data value', () => {
      const state = {
        name: 'Test',
        data: {
          test: 'test',
        },
      };

      expect(getData(state)).toEqual(state.data);
    });

    it('should return empty value when state is not passed', () => {
      expect(getData()).toEqual({});
    });

    it('should return correct data value when it is missed', () => {
      const state: any = {
        name: 'Test',
      };

      expect(getData(state)).toEqual({});
    });
  });

  describe('should load', () => {
    it('should return true when it is necessary to load and state is not provided', () => {
      expect(shouldLoad()).toEqual(true);
    });

    it('should return false when it is necessary to load and state in loading mode', () => {
      const state = {
        isLoaded: false,
        isLoading: true,
        isError: false,
      };

      expect(shouldLoad(state)).toEqual(false);
    });

    it('should return false when it is necessary to load and state in loaded mode', () => {
      const state = {
        isLoaded: true,
        isLoading: false,
        isError: false,
      };

      expect(shouldLoad(state)).toEqual(false);
    });

    it('should return true when it is necessary to load and state in error mode', () => {
      const state = {
        isLoaded: false,
        isLoading: false,
        isError: true,
      };

      expect(shouldLoad(state)).toEqual(true);
    });

    it('should return true when it is necessary to load and state in initial mode', () => {
      const state = {
        isLoaded: false,
        isLoading: false,
        isError: false,
      };

      expect(shouldLoad(state)).toEqual(true);
    });
  });

  describe('hasData', () => {
    it('should return false when payload is not populated', () => {
      expect(hasData()).toEqual(false);
    });

    it('should return true when data is populated', () => {
      const state = {
        data: {},
      };

      expect(hasData(state)).toEqual(true);
    });
  });
});
