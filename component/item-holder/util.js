export const deserializeListItem = (currentItem) => {
  const { is_completed, task_name, _id } = currentItem;
  return { name: task_name, isCompleted: is_completed, id: _id };
};

export const deserializeList = (currList) => {
  return currList.map((currentItem) => deserializeListItem(currentItem));
};
