import { useState } from "react";
import MonthPanel from "./MonthPanel";
import "./index.scss";

const KDatePicker: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState<'year' | 'month'>('month');
    const [displayDate, setDisplayDate] = useState(new Date(date));

    const handleUpdateDate = (delta: number) => {
        const d = new Date(displayDate);
        if (activeTab === 'month')
            d.setMonth(d.getMonth() + delta);
        if (activeTab === 'year')
            d.setFullYear(d.getFullYear() + delta);

        setDisplayDate(d);
    }

    return <div className="k-date-picker">
        {/* {date.toLocaleDateString()} */}
        <div className="header">
            <div className="header-btn" onClick={() => handleUpdateDate(-1)}>{'<<'}</div>
            <div className="header-title">
                <div className={`header-title-btn ${activeTab === 'year' ? 'is-selected' : ''}`}
                    onClick={() => setActiveTab('year')}>{displayDate.getFullYear()}年</div>
                <div className={`header-title-btn ${activeTab === 'month' ? 'is-selected' : ''}`}
                    onClick={() => setActiveTab('month')}>{displayDate.getMonth() + 1}月</div>
            </div>
            <div className="header-btn" onClick={() => handleUpdateDate(1)}>{'>>'}</div>
        </div>
        <MonthPanel year={displayDate.getFullYear()} month={displayDate.getMonth()}
            date={date} onChange={(d) => setDate(d)} />
    </div>
};

export default KDatePicker;
