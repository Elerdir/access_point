import axios from "../api/Axios";

export const Signpost = () => {

	const checkStatus = response => {
		if (response.ok) {
			return response;
		}
		// convert non-2xx HTTP responses into errors:
		const error = new Error(response.statusText);
		error.response = response;
		return Promise.reject(error);
	}

	const getAllApps = () =>
		fetch( "http://localhost:8081/ap/api/app", {
			headers: {"Content-Type": "application/json"},
			method: "GET"
		}).then(checkStatus);

	// const handleSubmit = async () => {
	// 	try {
	// 		const response = await axios.get(REGISTER_URL,
	// 			JSON.stringify({  }),
	// 			{
	// 				headers: { 'Content-Type': 'application/json' },
	// 				withCredentials: false
	// 			}
	// 		);
	//
	// 	} catch (err) {
	// 		if (!err?.response) {
	// 		} else if (err.response?.status === 409) {
	// 		} else {
	// 		}
	// 	}
	// }

	return (
		<section>
			<h2>Vyber si službu</h2>
			{getAllApps.length}
		</section>
	);
};