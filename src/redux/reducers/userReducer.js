import * as types from "../types";

const initialState = {
	authenticated: false,
	loading: true
};

function reducer (state = initialState, action) {
	switch (action.type) {
		case types.SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true
			};
		case types.SET_UNAUTHENTICATED:
			return initialState;
		case types.SET_USER:
			return {
				authenticated: true,
				loading: false,
				...action.payload
			};
		case types.LOADING_USER:
			return {
				...state,
				loading: true
			};
		// case types.LIKE_POST:
		// 	return {
		// 		...state,
		// 		likes: [
		// 			...state.likes,
		// 			{
		// 				userHandle: state.credentials.handle,
		// 				postId: action.payload.postId
		// 			}
		// 		]
		// 	};
		// case types.UNLIKE_POST:
		// 	return {
		// 		...state,
		// 		likes: state.likes.filter((like) => like.postId !== action.payload.postId)
		// 	};
		// case types.MARK_NOTIFICATIONS_READ:
		// 	state.notifications.forEach((not) => (not.read = true));
		// 	return {
		// 		...state
		// 	};
		// case types.LIKE_COMMENT:
		// 	return {
		// 		...state,
		// 		likes: [
		// 			...state.likes,
		// 			{
		// 				userHandle: state.credentials.handle,
		// 				commentId: action.payload.commentId
		// 			}
		// 		]
		// 	};
		// case types.UNLIKE_COMMENT:
		// 	return {
		// 		...state,
		// 		likes: state.likes.filter((like) => like.commentId !== action.payload.commentId)
		// 	};
		// case types.SET_PROFILE:
		// 	return {
		// 		...state,
		// 		loading: false
		// 	};
		default:
			return state;
	}
}

export default reducer;
