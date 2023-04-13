const getTimeConverted = (tempDate: Date = new Date()) => {
    const tempHours = tempDate.getHours().toString().padStart(2, "0"),
        tempMinutes = tempDate.getMinutes().toString().padStart(2, "0");
    return `${tempHours}:${tempMinutes}`;
};

const formatCompactNumber = (input: string) => {
    const number = Number(input);
    if (isNaN(number)) { return 0; }
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(number);
}

export { getTimeConverted, formatCompactNumber };