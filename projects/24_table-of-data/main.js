const mockData = [
    {
        id: 1,
        name: 'Cameron Williamson',
        email: 'cameron.wiliamson@example.com',
        title: 'Software Developer'
    },
    {
        id: 2,
        name: 'Jenny Wilson',
        email: 'jenny.wilson@example.com',
        title: 'Project Manager'
    },
    {
        id: 3,
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        title: 'Marketing Coordinator'
    },
    {
        id: 4,
        name: 'Wade Warren',
        email: 'wade.warren@example.com',
        title: 'Software Tester'
    },
    {
        id: 5,
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        title: 'Web Designer'
    },
    {
        id: 6,
        name: 'Kristin Watson',
        email: 'kristin.watson@example.com',
        title: 'Marketing Coordinator'
    },
    {
        id: 7,
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        title: 'Web Designer'
    },
    {
        id: 8,
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        title: 'UI/UX Designer'
    },
    {
        id: 9,
        name: 'Ralph Edwards',
        email: 'ralph.edwards@example.com',
        title: 'Software Tester'
    },
    {
        id: 10,
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 11,
        name: 'Willie Jennings',
        email: 'willie.jennings@example.com',
        title: 'Team Leader'
    },
    {
        id: 12,
        name: 'Neveah Simmons',
        email: 'neveah.simmons@example.com',
        title: 'Team Leader'
    },
    {
        id: 13,
        name: 'Theresa Webb',
        email: 'theresa.webb@example.com',
        title: 'Software Tester'
    },
    {
        id: 14,
        name: 'Debbe Baker',
        email: 'debbe.baker@example.com',
        title: 'Software Developer'
    },
    {
        id: 15,
        name: 'Ronald Richards',
        email: 'ronald.richards@example.com',
        title: 'Software Developer'
    },
    {
        id: 16,
        name: 'Deanna Curtis',
        email: 'deanna.curtis@example.com',
        title: 'Scrum Master'
    },
    {
        id: 17,
        name: 'Felicia Reid',
        email: 'felicia.reed@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 18,
        name: 'Jessie Alexander',
        email: 'jessie.alexander@example.com',
        title: 'Project Manager'
    },
    {
        id: 19,
        name: 'Sam Smith',
        email: 'sam.smith@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 20,
        name: 'Eleanor Rigby',
        email: 'eleanor.rigby@example.com',
        title: 'UI/UX Designer'
    },
    {
        id: 21,
        name: 'Devon Lane',
        email: 'devon.lane@example.com',
        title: 'Team Leader'
    },
    {
        id: 22,
        name: 'Guy Hawkins',
        email: 'guy.hawkins@example.com',
        title: 'Team Leader'
    },
    {
        id: 23,
        name: 'Jim Parks',
        email: 'jim.parks@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 24,
        name: 'Susanne Ford',
        email: 'susanne.ford@example.com',
        title: 'Software Developer Manager'
    },
    {
        id: 25,
        name: 'Kathryn Murphy',
        email: 'kathryn.murphy@example.com',
        title: 'Project Manager'
    },
    {
        id: 26,
        name: 'Cody Fisher',
        email: 'cody.fisher@example.com',
        title: 'Software Developer'
    },
    {
        id: 27,
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        title: 'Software Tester'
    },
    {
        id: 28,
        name: 'Karen MacAfee',
        email: 'karen.macafee@example.com',
        title: 'UI/UX Designer'
    },
    {
        id: 29,
        name: 'Dianne Russell',
        email: 'dianne.russell@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 30,
        name: 'Bessie Cooper',
        email: 'bessie.cooper@example.com',
        title: 'Scrum Master'
    },
];

const ROW_SHOW_AMOUNT = 10;
const TABLE_START_PAGE = 1;

const table = document.querySelector('table');
const tableHeader = table.querySelector('thead');
const tableHeaderButtons = Array.from(tableHeader.querySelectorAll('button'));
const tableBody = table.querySelector('tbody');
const tableFooter = table.querySelector('tfoot');
const contentRowTemplate = document.querySelector('#content-row-template');
const itemAmountTemplate = document.querySelector('#item-amount-template');
const paginationTemplate = document.querySelector('#pagination-template');

const tableData = mockData.slice();
const tablePageAmount = Math.ceil(tableData.length / ROW_SHOW_AMOUNT);
let currentTablePage = TABLE_START_PAGE;

init();

function init() {
    updateTableView();

    tableHeader.addEventListener('click', onTableHeaderClick);
}

function updateTableView() {
    updateTableContentView();
    updateTableFooterView();
}

function updateTableContentView() {
    const fragment = document.createDocumentFragment();

    const firstRowIndex = (currentTablePage - 1) * ROW_SHOW_AMOUNT;
    const lastRowIndex = firstRowIndex + ROW_SHOW_AMOUNT;
    const slicedTableData = tableData.slice(firstRowIndex, lastRowIndex);

    for (let i = 0; i < slicedTableData.length; i++) {
        fragment.appendChild(createContentRow(slicedTableData[i]));
    }

    tableBody.innerHTML = '';
    tableBody.appendChild(fragment);
}

function updateTableFooterView() {
    const fragment = document.createDocumentFragment();
    const row = fragment.appendChild(document.createElement('tr'));

    row.appendChild(createItemAmount(tableData));
    row.appendChild(createPagination(tableData));

    tableFooter.innerHTML = '';
    tableFooter.appendChild(fragment);
}

function updateTableItem(id, name, email, title) {
    const tableItem = tableData.find((tableItem) => tableItem.id === id);

    tableItem.name = name;
    tableItem.email = email;
    tableItem.title = title;
}

function sortTableData(property, type) {
    if (type === 'ascending') {
        tableData.sort((a, b) => typeof a[property] === 'number' ? a[property] - b[property] : a[property].localeCompare(b[property]));
    } else {
        tableData.sort((a, b) => typeof a[property] === 'number' ? b[property] - a[property] : b[property].localeCompare(a[property]));
    }
}

function createContentRow(row) {
    const contentRow = contentRowTemplate.content.cloneNode(true);
    const contentRowRoot = contentRow.querySelector('tr');
    const contentRowFirstCell = contentRow.querySelector('td:first-child');
    const contentRowSecondCellInput = contentRow.querySelector('td:nth-child(2) input');
    const contentRowThirdCellInput = contentRow.querySelector('td:nth-child(3) input');
    const contentRowFourthCellInput = contentRow.querySelector('td:nth-child(4) input');
    const contentRowEditButton = contentRow.querySelector('.edit');
    const contentRowUpdateButton = contentRow.querySelector('.update');

    contentRowFirstCell.textContent = row.id;
    contentRowSecondCellInput.value = row.name;
    contentRowThirdCellInput.value = row.email;
    contentRowFourthCellInput.value = row.title;

    contentRowEditButton.addEventListener('click', onContentRowEditButtonClick);
    contentRowUpdateButton.addEventListener('click', onContentRowUpdateButtonClick);

    function onContentRowEditButtonClick() {
        contentRowRoot.classList.add('edit');

        contentRowSecondCellInput.disabled = false;
        contentRowThirdCellInput.disabled = false;
        contentRowFourthCellInput.disabled = false;
    }

    function onContentRowUpdateButtonClick() {
        contentRowRoot.classList.remove('edit');

        contentRowSecondCellInput.disabled = true;
        contentRowThirdCellInput.disabled = true;
        contentRowFourthCellInput.disabled = true;

        updateTableItem(row.id, contentRowSecondCellInput.value, contentRowThirdCellInput.value, contentRowFourthCellInput.value)
    }

    return contentRow;
}

function createItemAmount(tableData) {
    const itemAmount = itemAmountTemplate.content.cloneNode(true);
    const amount = itemAmount.querySelector('span');

    amount.textContent = tableData.length;

    return itemAmount;
}

function createPagination() {
    const pagination = paginationTemplate.content.cloneNode(true);
    const paginationNextButton = pagination.querySelector('.next');
    const paginationPreviousButton = pagination.querySelector('.previous');
    const paginationInput = pagination.querySelector('input');
    const paginationPageAmount = pagination.querySelector('.page-amount');

    paginationInput.min = 1;
    paginationInput.max = tablePageAmount;
    paginationInput.value = TABLE_START_PAGE;
    paginationPageAmount.textContent = tablePageAmount;

    paginationNextButton.addEventListener('click', onPaginationNextButtonClick);
    paginationPreviousButton.addEventListener('click', onPaginationPreviousButtonClick);
    paginationInput.addEventListener('input', onPaginationInputChange);
    paginationInput.addEventListener('blur', onPaginationInputBlur);

    function onPaginationInputChange(evt) {
        const value = Number(evt.target.value);

        if (!value || value > tablePageAmount || value < 1) {
            return;
        }

        currentTablePage = value;

        updateTableContentView();
    }

    function onPaginationInputBlur(evt) {
        const value = Number(evt.target.value);

        if (value === currentTablePage) {
            return;
        }

        evt.target.value = currentTablePage;
    }

    function onPaginationNextButtonClick() {
        if (currentTablePage >= tablePageAmount) {
            return;
        }

        currentTablePage += 1;

        paginationInput.value = currentTablePage;
        updateTableContentView();
    }

    function onPaginationPreviousButtonClick() {
        if (currentTablePage <= 1) {
            return;
        }

        currentTablePage -= 1;

        paginationInput.value = currentTablePage;
        updateTableContentView();
    }

    return pagination;
}

function onTableHeaderClick(evt) {
    const button = evt.target.closest('button');

    if (!button) {
        return;
    }

    const sortProperty = button.dataset.sortProperty;
    let sortType;

    if (button.classList.contains('ascending')) {
        sortType = 'descending';
    } else if (button.classList.contains('descending')) {
        sortType = 'ascending';
    } else {
        sortType = 'ascending';
    }

    tableHeaderButtons.forEach((tableHeaderButton) => {
        tableHeaderButton.classList.remove('ascending');
        tableHeaderButton.classList.remove('descending');
    });

    button.classList.add(sortType);

    sortTableData(sortProperty, sortType);
    updateTableContentView();
}
