import {buildPostsTable} from "./helpers.js";
import {getPosts} from "./http/requests.js";

const body = document.querySelector('body');

const posts = await getPosts();

const [postsTable, filterInput] = buildPostsTable(posts);
body.appendChild(filterInput);
body.appendChild(postsTable);
