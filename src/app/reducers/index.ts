import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthState } from '../auth/reducers';

export interface AppState {
  auth: AuthState;
  courses: any;
  ['app-routing']: any;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: undefined,
  ['app-routing']: routerReducer,
  courses: undefined
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.info('State Before', state);
    console.info('Action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
