module.exports = (timestamp) => {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    return year;
}