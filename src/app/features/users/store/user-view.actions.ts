import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserViewActions = createActionGroup({
  source: 'UserView',
  events: {
    'Create Button Click': emptyProps(),
    'User Click': props<{ id: number }>(),
  },
});
