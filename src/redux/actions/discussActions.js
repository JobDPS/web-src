import * as types from "../types";
import axios from "axios";

export const getDiscussData = () => (dispatch) => {
	dispatch({ type: "GET_DISCUSS_DATA" });
};

export const createPost = (newPostData) => (dispatch) => {
	dispatch({ type: "CREATE_DISCUSS_POST", payload: { newPostData } });
};
