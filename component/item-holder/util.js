export const deserializeListItem = (currentItem) => {
  const { is_completed, task_name, _id } = currentItem;
  return { name: task_name, isCompleted: is_completed, id: _id };
};

export const deserializeList = (currList) => {
  return currList.map((currentItem) => deserializeListItem(currentItem));
};

export const getCurrentItemList = (updatedItemJSON, previousList) => {
  const deserializeJSON = deserializeListItem(updatedItemJSON)
        const updatedList = previousList.reduce((reqArray, currentItem) => {
            if (currentItem.id == deserializeJSON.id) {
                reqArray.push(deserializeJSON)
            }
            else reqArray.push(currentItem)
            return reqArray
        }, [])
  return updatedList
}
