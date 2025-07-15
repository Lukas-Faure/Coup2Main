export function truncate(str: string, maxLength: number): string {
	let result: string;
	if (str.length <= maxLength) {
		result = str;
	} else {
		result = str.substring(0, maxLength) + '...';
	}
	return result;
} 