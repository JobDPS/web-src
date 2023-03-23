import * as types from "../types";

const initialState = {
	loading: true,
	errors: null
};

function reducer (state = initialState, action) {
	switch (action.type) {
		case types.SET_COMPANIES:
			return {
				...state,
				loading: false,
				...action.payload
			};
		case types.LOADING_COMPANIES:
			return {
				...state,
				loading: true
			};
		case types.COMPANIES_CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: null
			};
		case types.COMPANIES_SET_ERRORS:
			return {
				...state,
				loading: false,
				errors: action.payload
			};
		default:
			return state;
	}
}

export default reducer;