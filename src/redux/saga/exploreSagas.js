import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getUserData (action) {
	try {
		yield put({ type: "EXPLORE_LOADING_USER" });
		const res = yield axios.get(`/recommend/user`);
		yield put({ type: "EXPLORE_SET_USER", payload: res.data });
	} catch (e) {
		yield put({ type: "EXPLORE_SET_ERROR", payload: e });
	}
}

function* getDiscussData (action) {
	try {
		yield put({ type: "EXPLORE_LOADING_DISCUSS" });
		const res = yield axios.get(`/recommend/discuss`);
		yield put({ type: "EXPLORE_SET_DISCUSS", payload: res.data });
	} catch (e) {
		yield put({ type: "EXPLORE_SET_ERROR", payload: e });
	}
}

function* getSocialData (action) {
	try {
		yield put({ type: "EXPLORE_LOADING_SOCIAL" });
		const res = yield axios.get(`/recommend/social`);
		yield put({ type: "EXPLORE_SET_SOCIAL", payload: res.data });
	} catch (e) {
		yield put({ type: "EXPLORE_SET_ERROR", payload: e });
	}
}

function* getCompanyData (action) {
	try {
		yield put({ type: "EXPLORE_LOADING_COMPANIES" });
		const res = yield axios.get(`/recommend/company`);
		yield put({ type: "EXPLORE_SET_COMPANIES", payload: res.data });
	} catch (e) {
		yield put({ type: "EXPLORE_SET_ERROR", payload: e });
	}
}

function* exploreSaga () {
	yield takeLatest("EXPLORE_GET_USER_DATA", getUserData);
	yield takeLatest("EXPLORE_GET_DISCUSS_DATA", getDiscussData);
	yield takeLatest("EXPLORE_GET_SOCIAL_DATA", getSocialData);
	yield takeLatest("EXPLORE_GET_COMPANY_DATA", getCompanyData);
}

export default exploreSaga;