interface MonthTableOptions {
    weekFirstDay: number;
};

export const DEFAULT_WEEK_FIRST_DAY = 0;

const fillNum = (num: number | string, n = 2) => {
    // return '0'.repeat(n - `${num}`.length) + num;
    return `0${num}`.slice(-n);
};

const generateDateItem = (date: Date, curMonth: number) => {
    return {
        dateNum: fillNum(date.getDate()),
        date: date,
        monthDelta: date.getMonth() - curMonth,
        isToday: date.getTime() === new Date().setHours(0, 0, 0, 0),
    };
};

export type DateItemType = ReturnType<typeof generateDateItem>;

export const generateMonthTable = (year: number, month: number, options?: MonthTableOptions) => {
    const weekFirstDay = options?.weekFirstDay ?? DEFAULT_WEEK_FIRST_DAY;
    const table: DateItemType[][] = [];
    const date = new Date(year, month);
    const firstDay = date.getDay();
    const preFillDayTotal = (firstDay + 7 - weekFirstDay) % 7;
    let curRow = new Array(preFillDayTotal).fill(1).map((_, index) => {
        const d = new Date(year, month, index - preFillDayTotal + 1);
        return generateDateItem(d, month);
    });
    let curDate = new Date(date);
    do {
        const dateNum = curDate.getDate();
        curRow.push(generateDateItem(curDate, month));
        if (curRow.length >= 7) {
            table.push(curRow);
            curRow = [];
        }
        curDate = new Date(curDate);
        curDate.setDate(dateNum + 1);
    } while (curDate.getMonth() === month);
    if (curRow.length) {
        curRow.push(...new Array(7 - curRow.length).fill(1).map((_, index) => {
            const d = new Date(year, month + 1, index + 1);
            return generateDateItem(d, month);
        }));
        table.push(curRow);
    }
    if (table.length < 6) {
        // TODO
    }

    return table;
};

export const generateWeeks = (firstDay = DEFAULT_WEEK_FIRST_DAY) => {
    return Array.from({ length: 7 }).map((_, index) => {
        const dayNum = (index + firstDay) % 7;
        return {
            dayNum,
            text: '日一二三四五六'[dayNum],
            isWeekEnd: [0, 6].includes(dayNum),
        };
    });
};
