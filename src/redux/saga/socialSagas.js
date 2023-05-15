import { call, put, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import axios from "axios";

function* getSocialData () {
	try {
		yield put({ type: "LOADING_SOCIAL" });
		const res = yield axios.get("/social");
		yield put({ type: "SET_SOCIAL", payload: res.data });
	} catch (e) {
		yield put({ type: "SOCIAL_SET_ERROR", payload: e.response.data });
	}
}

function* createPost (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.post("/social", action.payload.newPostData);
		const res = yield axios.get("/social");
		yield put({ type: "SET_SOCIAL", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* getPost (action) {
	try {
		yield put({ type: "LOADING_SOCIAL" });
		const res = yield axios.get(`/social/${action.payload.postId}`);
		yield put({ type: "SET_SOCIAL", payload: res.data });
	} catch (e) {
		yield put({ type: "SOCIAL_SET_ERROR", payload: e.response.data });
	}
}

function* createReply (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.post(`/social/${action.payload.postId}`, action.payload.newReplyData);
		const res = yield axios.get(`/social/${action.payload.postId}`);
		yield put({ type: "SET_SOCIAL", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* createReplyReply (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.post(
			`/social/${action.payload.postId}/replies/${action.payload.replyId}`,
			action.payload.newReplyData
		);
		const res = yield axios.get(`/social/${action.payload.postId}`);
		yield put({ type: "SET_SOCIAL", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* createReplyReply2 (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.post(
			`/social/${action.payload.postId}/replies/${action.payload.replyId}/replies/${action.payload.replyId2}`,
			action.payload.newReplyData
		);
		const res = yield axios.get(`/social/${action.payload.postId}`);
		yield put({ type: "SET_SOCIAL", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* deletePost (action) {
	try {
		yield axios.delete(`/social/${action.payload.postId}`);
		yield axios.get(`/social/${action.payload.postId}`);
		yield put({ type: "SOCIAL_SET_ERROR", payload: { error: "Server error" } });
	} catch (e) {
		yield put({ type: "SOCIAL_SET_ERROR", payload: e.response.data });
	}
}

function* deletePostReply (action) {
	try {
		yield axios.delete(`/social/${action.payload.postId}/replies/${action.payload.replyId}`);
		const res = yield axios.get(`/social/${action.payload.postId}`);
		yield put({ type: "SET_SOCIAL", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* deletePostReplyReply (action) {
	try {
		yield axios.delete(
			`/social/${action.payload.postId}/replies/${action.payload.replyId}/replies/${action.payload.replyReplyId}`
		);
		const res = yield axios.get(`/social/${action.payload.postId}`);
		yield put({ type: "SET_SOCIAL", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* editPost (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.patch(`/social/${action.payload.postId}`, action.payload.newPostData);
		const res = yield axios.get(`/social/${action.payload.postId}`);
		yield put({ type: "SET_SOCIAL", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* editPostReply (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.patch(
			`/social/${action.payload.postId}/replies/${action.payload.replyId}`,
			action.payload.newPostReplyData
		);
		const res = yield axios.get(`/social/${action.payload.postId}`);
		yield put({ type: "SET_SOCIAL", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* editPostReplyReply (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.patch(
			`/social/${action.payload.postId}/replies/${action.payload.replyId}/replies/${action.payload
				.replyReplyId}`,
			action.payload.newPostReplyData
		);
		const res = yield axios.get(`/social/${action.payload.postId}`);
		yield put({ type: "SET_SOCIAL", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* likePost (action) {
	try {
		yield axios.post(`/social/${action.payload.postId}/like`);
		const res = yield axios.get(`/recommend/social`);
		yield put({ type: "EXPLORE_SET_SOCIAL", payload: res.data });
		// const res = yield axios.get(`/social/${action.payload.postId}`);
		// yield put({ type: "SET_SOCIAL", payload: res.data });
		const res2 = yield axios.get("/user");
		yield put({ type: "SET_USER", payload: res2.data.userData });
	} catch (e) {
		yield put({ type: "SOCIAL_SET_ERROR", payload: e.response.data });
	}
}

function* socialSaga () {
	yield takeLatest("GET_SOCIAL_DATA", getSocialData);
	yield takeLatest("CREATE_SOCIAL_POST", createPost);
	yield takeLatest("GET_SOCIAL_POST", getPost);
	yield takeLatest("CREATE_SOCIAL_REPLY", createReply);
	yield takeLatest("CREATE_SOCIAL_REPLYREPLY", createReplyReply);
	yield takeLatest("CREATE_SOCIAL_REPLYREPLY2", createReplyReply2);
	yield takeLatest("DELETE_SOCIAL_POST", deletePost);
	yield takeLatest("DELETE_SOCIAL_POSTREPLY", deletePostReply);
	yield takeLatest("DELETE_SOCIAL_POSTREPLYREPLY", deletePostReplyReply);
	yield takeLatest("EDIT_SOCIAL_POST", editPost);
	yield takeLatest("EDIT_SOCIAL_POSTREPLY", editPostReply);
	yield takeLatest("EDIT_SOCIAL_POSTREPLYREPLY", editPostReplyReply);
	yield takeLeading("LIKE_SOCIAL_POST", likePost);
}

export default socialSaga;
