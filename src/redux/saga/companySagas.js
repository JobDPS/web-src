import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getCompanyData (action) {
	try {
		yield put({ type: "LOADING_COMPANIES" });
		const res = yield axios.post("/company", action.payload.pageData);
		yield put({ type: "SET_COMPANIES", payload: res.data });
	} catch (e) {
		yield put({ type: "COMPANIES_SET_ERROR", payload: e });
	}
}

function* editUserStarredCompanies (action) {
	try {
		yield axios.post("/company/star", action.payload.id);
		const res = yield axios.post("/company", action.payload.pageData);
		yield put({ type: "SET_COMPANIES", payload: res.data });
		const res2 = yield axios.get("/user");
		yield put({ type: "SET_USER", payload: res2.data.userData });
	} catch (e) {
		yield put({ type: "COMPANIES_SET_ERROR", payload: e });
	}
}

function* searchCompanies (action) {
	try {
		yield put({ type: "LOADING_COMPANIES" });
		const res = yield axios.post("/company/search", action.payload.query);
		yield put({ type: "SET_COMPANIES", payload: res.data });
	} catch (e) {
		yield put({ type: "COMPANIES_SET_ERROR", payload: e });
	}
}

function* relationSaga () {
	yield takeLatest("GET_COMPANY_DATA", getCompanyData);
	yield takeLatest("EDIT_USER_COMPANY_STARRED", editUserStarredCompanies);
	yield takeLatest("SEARCH_COMPANY", searchCompanies);
}

export default relationSaga;
