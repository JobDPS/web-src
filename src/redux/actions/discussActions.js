import * as types from "../types";
import axios from "axios";

export const getDiscussData = () => (dispatch) => {
	dispatch({ type: "GET_DISCUSS_DATA" });
};

export const createPost = (newPostData) => (dispatch) => {
	dispatch({ type: "CREATE_DISCUSS_POST", payload: { newPostData } });
};

export const getDiscussPost = (postId) => (dispatch) => {
	dispatch({ type: "GET_DISCUSS_POST", payload: { postId } });
};

export const createReply = (postId, newReplyData) => (dispatch) => {
	dispatch({ type: "CREATE_DISCUSS_REPLY", payload: { postId, newReplyData } });
};

export const createReplyReply = (postId, replyId, newReplyData) => (dispatch) => {
	dispatch({ type: "CREATE_DISCUSS_REPLYREPLY", payload: { postId, replyId, newReplyData } });
};

export const deleteDiscussPost = (postId) => (dispatch) => {
	dispatch({ type: "DELETE_DISCUSS_POST", payload: { postId } });
};

export const editDiscussPost = (postId, newPostData) => (dispatch) => {
	dispatch({ type: "EDIT_DISCUSS_POST", payload: { postId, newPostData } });
};

