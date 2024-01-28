
export function useTransform<T>(apiResponse: any, keys: (keyof T)[]): T {
	let transformedResponse = {} as T;
	keys.forEach((key) => {
		if (apiResponse.hasOwnProperty(key)) {
			transformedResponse[key] = apiResponse[key];
		}
	});
	return transformedResponse;
}


