import {buildPostsTable} from "./helpers.js";

const body = document.querySelector('body');

const postsTable = await buildPostsTable();
body.appendChild(postsTable);
