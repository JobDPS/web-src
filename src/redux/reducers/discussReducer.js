import * as types from "../types";

const initialState = {
	loading: true
};

function reducer (state = initialState, action) {
	switch (action.type) {
		case types.SET_DISCUSS:
			return {
				loading: false,
				...action.payload
			};
		case types.LOADING_DISCUSS:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}

export default reducer;
