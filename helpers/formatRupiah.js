function formatRupiah(value) {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
}

// console.log(formatRupiah(100000000));

module.exports = formatRupiah;