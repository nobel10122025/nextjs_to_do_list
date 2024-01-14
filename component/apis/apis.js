export const getSavedItems = async (payload) => {
  const res = await fetch(`api/user/${payload}`);
  return res;
};

export const createItems = async (payload) => {
  const res = await fetch("api/task/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res;
};

export const updatedCurrentItem = async (id, payload) => {
  const res = await fetch(`api/task/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res;
};

export const deleteItem = async (id) => {
  await fetch(`api/task/${id}`, {
    method: "DELETE"
  });
};