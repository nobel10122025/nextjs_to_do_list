export const getSavedItems = async (payload) => {
    const res =  await fetch(`api/task/${payload}`)
    return res
}

export const createItems = async (payload) => {
    const res = await fetch('api/task/create', { method: "POST", body: JSON.stringify(payload) })
    return res
}