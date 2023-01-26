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

export const createReplyReply2 = (postId, replyId, replyId2, newReplyData) => (dispatch) => {
	dispatch({ type: "CREATE_DISCUSS_REPLYREPLY2", payload: { postId, replyId, replyId2, newReplyData } });
};

export const deleteDiscussPost = (postId) => (dispatch) => {
	dispatch({ type: "DELETE_DISCUSS_POST", payload: { postId } });
};

export const deleteDiscussPostReply = (postId, replyId) => (dispatch) => {
	dispatch({ type: "DELETE_DISCUSS_POSTREPLY", payload: { postId, replyId } });
};

export const deleteDiscussPostReplyReply = (postId, replyId, replyReplyId) => (dispatch) => {
	dispatch({ type: "DELETE_DISCUSS_POSTREPLYREPLY", payload: { postId, replyId, replyReplyId } });
};

export const editDiscussPost = (postId, newPostData) => (dispatch) => {
	dispatch({ type: "EDIT_DISCUSS_POST", payload: { postId, newPostData } });
};

export const editDiscussPostReply = (postId, replyId, newPostReplyData) => (dispatch) => {
	dispatch({ type: "EDIT_DISCUSS_POSTREPLY", payload: { postId, replyId, newPostReplyData } });
};

export const editDiscussPostReplyReply = (postId, replyId, replyReplyId, newPostReplyData) => (dispatch) => {
	dispatch({ type: "EDIT_DISCUSS_POSTREPLYREPLY", payload: { postId, replyId, replyReplyId, newPostReplyData } });
};
