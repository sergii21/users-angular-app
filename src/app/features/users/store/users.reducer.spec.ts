import { UsersActions } from './users.actions';
import { reducer, initialState } from './users.reducer';

describe('Users Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as typeof UsersActions.addUser;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
