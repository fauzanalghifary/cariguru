function formatDate(value) {
    const year = value.getFullYear();
    const month = value.toLocaleString('default', { month: 'long' });
    const day = value.getDate();

    return `${day} ${month} ${year}`;
}

// console.log(formatDate(new Date('27 May 2022')));

module.exports = formatDate;