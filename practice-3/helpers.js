export const createTableHead = (posts, postsTableHead) => {
  const postsKeys = Object.keys(posts[0]);
  const postsTableHeadField = document.createElement('tr');
  postsKeys.forEach((key) => {
    const postsTableHeadCell = document.createElement('th');
    postsTableHeadCell.textContent = key;
    postsTableHeadField.appendChild(postsTableHeadCell);
  });
  postsTableHead.appendChild(postsTableHeadField);
};

export const createTableBody = (posts, postsTableBody) => {
  posts.forEach((post) => {
    const postsTableBodyField = document.createElement('tr');
    Object.entries(post).forEach(([_, value]) => {
      const postsTableBodyCell = document.createElement('td');
      postsTableBodyCell.textContent = value;
      postsTableBodyField.appendChild(postsTableBodyCell);
    });
    postsTableBody.appendChild(postsTableBodyField);
  });
};

const sortTable = (postsTable, columnIndex, sortOrder) => {
  const tableBody = postsTable.querySelector('tbody');
  const rows = Array.from(tableBody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    const aValue = a.querySelectorAll('td')[columnIndex].textContent.trim();
    const bValue = b.querySelectorAll('td')[columnIndex].textContent.trim();

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  tableBody.innerHTML = '';

  rows.forEach(row => tableBody.appendChild(row));
}

const filterTable = (filterValue) => {
  const tableBody = document.querySelector('tbody');
  const rows = tableBody.querySelectorAll('tr');

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const rowMatchesFilter = Array.from(cells).some(cell =>
      cell.textContent.toLowerCase().includes(filterValue.toLowerCase())
    );

    rowMatchesFilter
      ? row.classList.remove('hidden')
      : row.classList.add('hidden');
  });
}

export const buildPostsTable = (posts) => {
  const postsTable = document.createElement('table');
  const postsTableHead = document.createElement('thead');
  const postsTableBody = document.createElement('tbody');
  postsTable.appendChild(postsTableHead);
  postsTable.appendChild(postsTableBody);

  createTableHead(posts, postsTableHead);
  createTableBody(posts, postsTableBody);

  postsTable.querySelectorAll('th').forEach((th, index) => {
    th.addEventListener('click', () => {
      const sortOrder = th.dataset.sort === 'asc' ? 'desc' : 'asc';
      th.dataset.sort = sortOrder;
      sortTable(postsTable, index, sortOrder);
    });
  });

  const postsFilterInputWrapper = document.createElement('div');
  postsFilterInputWrapper.classList.add('filter-input-wrapper');

  const postsFilterInput = document.createElement('input');
  postsFilterInput.classList.add('filter-input');
  postsFilterInput.placeholder = 'Введите от 3 символов для фильтрации';

  postsFilterInputWrapper.appendChild(postsFilterInput);

  postsFilterInput.addEventListener('input', (event) => {
    const filterValue = event.target.value;
    if (filterValue.length >= 3) {
      filterTable(filterValue);
    } else {
      filterTable('');
    }
  });

  return [postsTable, postsFilterInputWrapper];
};