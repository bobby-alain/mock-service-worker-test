export const fetchUser = async userId => {
  try {
    // const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    const url = `http://localhost:8080/api/user`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
