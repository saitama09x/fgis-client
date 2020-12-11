import { createAction } from '@ngrx/store';
import { User } from '../../models/User';

export const initLogos = createAction('[Init logos]',  (user: any) => ({user}));
export const UploadPhoto = createAction('[Upload Photo]',  (user: any) => ({user}));
export const UploadLogo = createAction('[Upload Logo]',  (user: any) => ({user}));
export const InitAccount = createAction('[Init Account]',  (user: any) => ({user}));
export const CompanyName = createAction('[Company Name]',  (user: any) => ({user}));
export const ProfileName = createAction('[Profile Name]',  (user: any) => ({user}));