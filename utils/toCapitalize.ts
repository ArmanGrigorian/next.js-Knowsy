export default function toCapitalize(str: string): string {
	const newStr = str[0].toUpperCase() + str.slice(1);
	return newStr;
}
