/**
 * A utility function that converts a string to title case
 * @param {string} str string to be converted to title case
 * @returns {string} Converted string
 */
export const titleCase = (str: string) =>
	str.replace(
		/\w\S*/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	)
