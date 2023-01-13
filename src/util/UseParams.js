import { useParams } from "react-router-dom";

const UseParams = ({ element: Component, ...rest }) => {
	const params = { params: useParams() };
	return <Component {...rest} match={params} />;
};

export default UseParams;
