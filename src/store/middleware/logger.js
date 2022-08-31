export const middlewareLogger = store => next => action => {
  if (!action.type) {
    return next(action);
  }
  console.log('type', action.type);
  console.log('payload:', action.payload);
  console.log('current state', store.getState());

  // syncronos wait until action sends to reducers selector then move ahead
  next(action);

  console.log('next state', store.getState());
};
