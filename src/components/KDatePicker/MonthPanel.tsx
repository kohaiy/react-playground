import { useMemo } from "react";
import { DateItemType, DEFAULT_WEEK_FIRST_DAY, generateMonthTable, generateWeeks } from "./helper";

export interface Props {
    date?: Date;
    weekFirstDay?: number;
    year?: number;
    month?: number;
    onChange?: (d: Date) => void;
};

const getClassName = (item: DateItemType, curDate?: Date) => {
    const classList: string[] = ['date-item'];
    if (curDate && item.date.getTime() === new Date(curDate).setHours(0, 0, 0, 0)) {
        classList.push('is-selected');
    }
    if (item.isToday) { classList.push('is-today') }
    if (item.monthDelta < 0) { classList.push('is-prev-month') }
    if (item.monthDelta > 0) { classList.push('is-next-month') }
    return classList.join(' ');
};

const MonthPanel: React.FC<Props> = (props) => {
    console.log(props.date);

    const date = props.date ? new Date(props.date) : new Date();
    const weekFirstDay = props.weekFirstDay ?? DEFAULT_WEEK_FIRST_DAY;
    const weeks = generateWeeks(weekFirstDay);
    const [year, month] = [props.year ?? date.getFullYear(), props.month ?? date.getMonth()];
    const dateTable = useMemo(() => {
        return generateMonthTable(year, month, { weekFirstDay });
    }, [year, month, weekFirstDay]);

    const handleChange = (item: DateItemType) => {
        if (item.date && !item.monthDelta && props.onChange) {
            props.onChange(item.date);
        }
    };
    return <div className="month-panel">
        <table>
            <thead>
                <tr>
                    {
                        weeks.map(it => <th key={it.dayNum}>
                            <div className={`week-item ${it.isWeekEnd ? 'is-weekend' : ''}`}>{it.text}</div></th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    dateTable.map((row, i) => <tr key={i}>{
                        row.map((d, j) => <td key={j}>
                            <div className={getClassName(d, props.date)}
                                onClick={() => handleChange(d)}>{d.dateNum}</div>
                        </td>)
                    }</tr>)
                }
            </tbody>
        </table>
    </div>
};

export default MonthPanel;
