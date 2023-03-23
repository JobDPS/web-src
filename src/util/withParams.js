import { useParams } from "react-router-dom";

const withParams = (Component) => {
	const Wrapper = (props) => {
		const params = { params: useParams() };
		return <Component {...props} match={params} />;
	};
	return Wrapper;
};

export default withParams;
