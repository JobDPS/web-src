import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getRelationData () {
	try {
		yield put({ type: "LOADING_RELATION" });
		const res = yield axios.get("/relation");
		yield put({ type: "SET_RELATION", payload: res.data });
	} catch (e) {
		yield put({ type: "RELATION_SET_ERROR", payload: e });
	}
}

function* getRelation (action) {
	try {
		yield put({ type: "LOADING_RELATION" });
		const res = yield axios.get(`/relation/${action.payload.relationId}`);
		yield put({ type: "SET_RELATION", payload: res.data });
	} catch (e) {
		yield put({ type: "RELATION_SET_ERROR", payload: e });
	}
}

function* editRelation (action) {
	try {
		// yield put({ type: "LOADING_RELATION" });
		yield put({ type: "LOADING_UI" });
		yield axios.patch(`/relation/${action.payload.relationId}`, action.payload.newPostData);
		const res = yield axios.get("/relation");
		yield put({ type: "SET_RELATION", payload: res.data });
		const res2 = yield axios.get(`/relation/${action.payload.relationId}`);
		yield put({ type: "SET_RELATION", payload: res2.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "RELATION_SET_ERROR", payload: e.response.data });
	}
}

function* editRelationDate (action) {
	try {
		// yield put({ type: "LOADING_RELATION" });
		yield put({ type: "LOADING_UI" });
		yield axios.patch(`/relation/${action.payload.relationId}/date`, action.payload.newPostData);
		const res = yield axios.get("/relation");
		yield put({ type: "SET_RELATION", payload: res.data });
		const res2 = yield axios.get(`/relation/${action.payload.relationId}`);
		yield put({ type: "SET_RELATION", payload: res2.data });
		yield put({ type: "CLEAR_ERRORS" });
		yield put({ type: "CLOSE_FORM" });
	} catch (e) {
		yield put({ type: "RELATION_SET_ERROR", payload: e.response.data });
	}
}

function* createRelation (action) {
	try {
		yield put({ type: "LOADING_UI" });
		const res = yield axios.post(`/relation`, action.payload.newRelationData);
		yield put({ type: "CLEAR_ERRORS" });
		action.payload.history.push(`/plan/${res.data.id}`);
	} catch (e) {
		console.log(e);
		yield put({ type: "SET_ERROR", payload: e.response.data });
	}
}

function* deleteRelation (action) {
	try {
		yield put({ type: "LOADING_RELATION" });
		yield axios.delete(`/relation/${action.payload.relationId}`);
		const res = yield axios.get("/relation");
		yield put({ type: "SET_RELATION", payload: { ...res.data, relation: {} } });
	} catch (e) {
		yield put({ type: "RELATION_SET_ERROR", payload: e });
	}
}

function* relationSaga () {
	yield takeLatest("GET_RELATION_DATA", getRelationData);
	yield takeLatest("GET_RELATION", getRelation);
	yield takeLatest("EDIT_RELATION", editRelation);
	yield takeLatest("EDIT_RELATION_DATE", editRelationDate);
	yield takeLatest("CREATE_RELATION", createRelation);
	yield takeLatest("DELETE_RELATION", deleteRelation);
}

export default relationSaga;
