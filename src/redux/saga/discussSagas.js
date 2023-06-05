import { call, put, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import axios from "axios";

function* getDiscussData () {
	try {
		yield put({ type: "LOADING_DISCUSS" });
		const res = yield axios.get("/discuss");
		yield put({ type: "SET_DISCUSS", payload: res.data });
	} catch (e) {
		yield put({ type: "DISCUSS_SET_ERROR", payload: e.response.data });
	}
}

function* createPost (action) {
	try {
		yield put({ type: "LOADING_UI" });
		const res = yield axios.post("/discuss", action.payload.newPostData);
		yield put({ type: "CLEAR_ERRORS" });
		action.payload.history.push(`/discuss/${res.data.id}`);
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* getPost (action) {
	try {
		yield put({ type: "LOADING_DISCUSS" });
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
	} catch (e) {
		yield put({ type: "DISCUSS_SET_ERROR", payload: e.response.data });
	}
}

function* createReply (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.post(`/discuss/${action.payload.postId}`, action.payload.newReplyData);
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* createReplyReply (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.post(
			`/discuss/${action.payload.postId}/replies/${action.payload.replyId}`,
			action.payload.newReplyData
		);
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
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
			`/discuss/${action.payload.postId}/replies/${action.payload.replyId}/replies/${action.payload.replyId2}`,
			action.payload.newReplyData
		);
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* deletePost (action) {
	try {
		yield axios.delete(`/discuss/${action.payload.postId}`);
		yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "DISCUSS_SET_ERROR", payload: { error: "Server error" } });
	} catch (e) {
		yield put({ type: "DISCUSS_SET_ERROR", payload: e.response.data });
	}
}

function* deletePostReply (action) {
	try {
		yield axios.delete(`/discuss/${action.payload.postId}/replies/${action.payload.replyId}`);
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* deletePostReplyReply (action) {
	try {
		yield axios.delete(
			`/discuss/${action.payload.postId}/replies/${action.payload.replyId}/replies/${action.payload.replyReplyId}`
		);
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* editPost (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.patch(`/discuss/${action.payload.postId}`, action.payload.newPostData);
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
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
			`/discuss/${action.payload.postId}/replies/${action.payload.replyId}`,
			action.payload.newPostReplyData
		);
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
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
			`/discuss/${action.payload.postId}/replies/${action.payload.replyId}/replies/${action.payload
				.replyReplyId}`,
			action.payload.newPostReplyData
		);
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* likePost (action) {
	try {
		yield axios.post(`/discuss/${action.payload.postId}/like`);
		// const res = yield axios.get(`/recommend/social`);
		// yield put({ type: "EXPLORE_SET_SOCIAL", payload: res.data });
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
		const res2 = yield axios.get("/user");
		yield put({ type: "SET_USER", payload: res2.data.userData });
	} catch (e) {
		yield put({ type: "DISCUSS_SET_ERROR", payload: e.response.data });
	}
}

function* dislikePost (action) {
	try {
		yield axios.post(`/discuss/${action.payload.postId}/dislike`);
		// const res = yield axios.get(`/recommend/social`);
		// yield put({ type: "EXPLORE_SET_SOCIAL", payload: res.data });
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
		const res2 = yield axios.get("/user");
		yield put({ type: "SET_USER", payload: res2.data.userData });
	} catch (e) {
		yield put({ type: "DISCUSS_SET_ERROR", payload: e.response.data });
	}
}

function* likePost2 (action) {
	try {
		yield axios.post(`/discuss/${action.payload.postId}/like`);
		const res = yield axios.get("/discuss");
		yield put({ type: "SET_DISCUSS", payload: res.data });
		// const res = yield axios.get(`/recommend/social`);
		// yield put({ type: "EXPLORE_SET_SOCIAL", payload: res.data });
		// const res = yield axios.get(`/discuss/${action.payload.postId}`);
		// yield put({ type: "SET_DISCUSS", payload: res.data });
		const res2 = yield axios.get("/user");
		yield put({ type: "SET_USER", payload: res2.data.userData });
	} catch (e) {
		yield put({ type: "DISCUSS_SET_ERROR", payload: e.response.data });
	}
}

function* dislikePost2 (action) {
	try {
		yield axios.post(`/discuss/${action.payload.postId}/dislike`);
		const res = yield axios.get("/discuss");
		yield put({ type: "SET_DISCUSS", payload: res.data });
		// const res = yield axios.get(`/recommend/social`);
		// yield put({ type: "EXPLORE_SET_SOCIAL", payload: res.data });
		// const res = yield axios.get(`/discuss/${action.payload.postId}`);
		// yield put({ type: "SET_DISCUSS", payload: res.data });
		const res2 = yield axios.get("/user");
		yield put({ type: "SET_USER", payload: res2.data.userData });
	} catch (e) {
		yield put({ type: "DISCUSS_SET_ERROR", payload: e.response.data });
	}
}

function* discussSaga () {
	yield takeLatest("GET_DISCUSS_DATA", getDiscussData);
	yield takeLatest("CREATE_DISCUSS_POST", createPost);
	yield takeLatest("GET_DISCUSS_POST", getPost);
	yield takeLatest("CREATE_DISCUSS_REPLY", createReply);
	yield takeLatest("CREATE_DISCUSS_REPLYREPLY", createReplyReply);
	yield takeLatest("CREATE_DISCUSS_REPLYREPLY2", createReplyReply2);
	yield takeLatest("DELETE_DISCUSS_POST", deletePost);
	yield takeLatest("DELETE_DISCUSS_POSTREPLY", deletePostReply);
	yield takeLatest("DELETE_DISCUSS_POSTREPLYREPLY", deletePostReplyReply);
	yield takeLatest("EDIT_DISCUSS_POST", editPost);
	yield takeLatest("EDIT_DISCUSS_POSTREPLY", editPostReply);
	yield takeLatest("EDIT_DISCUSS_POSTREPLYREPLY", editPostReplyReply);
	yield takeLeading("LIKE_DISCUSS_POST", likePost);
	yield takeLeading("DISLIKE_DISCUSS_POST", dislikePost);
	yield takeLeading("LIKE_DISCUSS_POST2", likePost2);
	yield takeLeading("DISLIKE_DISCUSS_POST2", dislikePost2);
}

export default discussSaga;
