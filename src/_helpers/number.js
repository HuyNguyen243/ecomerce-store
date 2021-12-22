var NumberHelper = {
    formatCurrency: (number) => {
        let format = new Intl.NumberFormat('vi-VN').format(number) + ' đ';
        return format
    }
}

export default NumberHelper;