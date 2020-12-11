import { createAction } from '@ngrx/store';


export const initVisitor = createAction('[Init Visitor]',  (data: any) => ({data}));