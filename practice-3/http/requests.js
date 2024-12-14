export const getPosts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.error('Request error:', e);
  }
};