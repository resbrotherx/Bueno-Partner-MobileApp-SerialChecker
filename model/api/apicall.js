import client from "../api/client";

export const getsinglePost = async (id) => {
  try{
    const { data } = await client(`/details/${id}`);
    return data;
    console.log(data)
    alert(data)
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.massage || error };
  }
};