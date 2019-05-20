export const applyDrag = (arr, dragResult) => {
	const { removedIndex, addedIndex, payload } = dragResult
	if (removedIndex === null && addedIndex === null) return arr

	const result = [...arr]
	let itemToAdd = payload

	if (removedIndex !== null) {
		itemToAdd = result.splice(removedIndex, 1)[0]
	}

	if (addedIndex !== null) {
		result.splice(addedIndex, 0, itemToAdd)
	}

	return result
}

export const generateItems = (categories, count, creator) => {
	const result = [];
	for (let i = 0; i < count; i++) {
		if (categories) {
			if (categories === creator(i).data.categories) result.push(creator(i));
		} else {
			result.push(creator(i))
		}
	}
	return result
};