import {
  ActionReducerMap, createReducer, on
} from '@ngrx/store';
import { User } from '../model/user.model';
import * as fromAuth from './../auth.actions';


export interface AuthState {
  user: User;
}

const defaultState: AuthState = { user: undefined };

export const authReducer = createReducer(defaultState,
  on(fromAuth.login, (state, payload) => {
    return { ...state, user: payload.user };
  }),
  on(fromAuth.appRestoreCredentials, (state, payload) => {
    return { ...state, user: payload.user };
  }),
  on(fromAuth.logout, _ => {
    return defaultState;
  })
);

export const reducers: ActionReducerMap<AuthState> = {
  user: undefined
};


