import { createReducer, on } from '@ngrx/store';
import { initLogos, UploadPhoto, UploadLogo, InitAccount, CompanyName, ProfileName } from '../actions/users.actions';
import { User } from '../../models/User';
import { UploadState, AccountState } from './../interfaces/interfaces.types';

const initialUpload : UploadState = {
  profile_pic : "",
  company_logo : ""
};

const initialAccount : AccountState = {
  company_name : "",
  fname : "",
  lname : ""
}

const _uploadReducer = createReducer(
  initialUpload,
  on(initLogos, (state : UploadState, {user}) => ({
    ...state,
    profile_pic : user.photo,
    company_logo : user.client.company_logo
  })),
  on(UploadPhoto, (state : UploadState, {user}) => ({
  	...state,
  	profile_pic : user.photo,
  })),
  on(UploadLogo, (state : UploadState, {user}) => ({
    ...state,
    company_logo : user.company_logo
  }))
);

const _accountReducer = createReducer(
initialAccount,
on(InitAccount, (state : AccountState, {user}) => ({
  ...state,
  company_name : user.client.company_name,
  fname : user.first_name,
  lname : user.last_name
})),
on(CompanyName, (state : AccountState, {user}) => ({
  ...state,
  company_name : user.company_name,
})),
on(ProfileName, (state : AccountState, {user}) => ({
  ...state,
  fname : user.fname,
  lname : user.lname
}))
);
 
export function uploadReducer(state, action) {
  return _uploadReducer(state, action);
}

export function accountReducer(state, action) {
  return _accountReducer(state, action);
}