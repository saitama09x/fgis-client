import { createReducer, on } from '@ngrx/store';
import { initVisitor } from '../actions/group.actions';
import { GroupState } from './../interfaces/interfaces.types';


const initialVisitor : GroupState = {
  	groupId : 0,
	clientId : 0,
	name : "",
	description : ""
};

const _loadVisitors = createReducer(
	initialVisitor,
	on(initVisitor, (state : GroupState, {data}) => ({
		...state,
		groupId : data.groupId,
		clientId : data.clientId,
		name : data.name,
		description : data.description
	}))
);

export function VisitorReducer(state, action) {
  return _loadVisitors(state, action);
}
