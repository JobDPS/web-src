import * as types from "../types";

const initialState = {
	loading: true,
	errors: null
};

function reducer (state = initialState, action) {
	switch (action.type) {
		case types.SET_SOCIAL:
			return {
				loading: false,
				...action.payload
			};
		case types.LOADING_SOCIAL:
			return {
				...state,
				loading: true
			};
		case types.SOCIAL_CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: null
			};
		case types.SOCIAL_SET_ERRORS:
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
