import {getPosts} from "./http/requests.js";

export const createTableHead = (posts, postsTableHead) => {
  const postsKeys = Object.keys(posts[0]);
  const postsTableHeadFields = document.createElement('tr');
  postsKeys.forEach((key) => {
    const postsTableHeadField = document.createElement('td');
    postsTableHeadField.textContent = key;
    postsTableHeadFields.appendChild(postsTableHeadField);
  });
  postsTableHead.appendChild(postsTableHeadFields);
};

export const createTableBody = (posts, postsTableBody) => {
  posts.forEach((post) => {
    const postsTableBodyFields = document.createElement('tr');
    Object.entries(post).forEach(([_, value]) => {
      const postsTableBodyField = document.createElement('td');
      postsTableBodyField.textContent = value;
      postsTableBodyFields.appendChild(postsTableBodyField);
    });
    postsTableBody.appendChild(postsTableBodyFields);
  });
};

export const buildPostsTable = async () => {
  try {
    const postsTable = document.createElement('table');
    const postsTableHead = document.createElement('thead');
    const postsTableBody = document.createElement('tbody');
    postsTable.appendChild(postsTableHead);
    postsTable.appendChild(postsTableBody);

    const posts = await getPosts();
    createTableHead(posts, postsTableHead);
    createTableBody(posts, postsTableBody);

    return postsTable;
  } catch (e) {
    console.error('Build posts table error:', e);
  }
};