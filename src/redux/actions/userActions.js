import * as types from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
	dispatch({ type: "LOGIN", payload: { userData, history } });
};

export const signupUser = (newUserData, history) => (dispatch) => {
	dispatch({ type: "SIGNUP", payload: { newUserData, history } });
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("RefreshToken");
	delete axios.defaults.headers.common["Authorization"];
	dispatch({ type: types.SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
	dispatch({ type: "GET_USER_DATA" });
};

// export const uploadImage = (formData) => (dispatch) => {
// 	dispatch({ type: LOADING_USER });
// 	axios
// 		.post('/user/image', formData)
// 		.then(() => {
// 			dispatch(getUserData());
// 		})
// 		.catch((err) => console.log(err));
// };

// export const editUserDetails = (userDetails) => (dispatch) => {
// 	dispatch({ type: LOADING_USER });
// 	axios
// 		.post('/user', userDetails)
// 		.then(() => {
// 			dispatch(getUserData());
// 		})
// 		.catch((err) => console.log(err));
// };

// export const markNotificationsRead = (notificationIds) => (dispatch) => {
// 	axios
// 		.post('/notifications', notificationIds)
// 		.then((res) => {
// 			dispatch({
// 				type: MARK_NOTIFICATIONS_READ
// 			});
// 		})
// 		.catch((err) => console.log(err));
// };
