import { Overlay } from "@kohui/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
    content?: React.ReactNode | string;
    placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
};

const KPopover: React.FC<Props> = (props) => {
    const [visible, setVisible] = useState(false);
    const btnRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const placement = props.placement ?? 'bottom';

    const updatePlacement = useCallback(() => {
        const { current: btnEl } = btnRef;
        const { current: contentEl } = contentRef;
        if (btnEl && contentEl) {
            const { left, top, width, height } = btnEl.getBoundingClientRect();

            switch (placement) {
                case 'bottom':
                    Object.assign(contentEl.style, {
                        left: `${left + width / 2}px`,
                        top: `${top + height}px`,
                    });
                    break;
                case 'left':
                    Object.assign(contentEl.style, {
                        left: `${left}px`,
                        top: `${top + height / 2}px`,
                    });
                    break;
                case 'right':
                    Object.assign(contentEl.style, {
                        left: `${left + width}px`,
                        top: `${top + height / 2}px`,
                    });
                    break;
            }
        }
    }, [placement]);

    useEffect(() => {
        updatePlacement();
    }, [updatePlacement]);

    const handleClick = () => {
        setVisible(v => !v);
        if (!visible) {
            updatePlacement();
        }
    };
    return <div className="k-popover">
        <Overlay visible={visible} onClick={handleClick} />
        <div ref={btnRef} className={`k-popover-btn ${visible && 'is-active'}`}
            onClick={handleClick}>{props.children}</div>
        <div ref={contentRef}
            className={`k-popover-content ${visible || 'is-hidden'} placement-${placement}`}>
            <div className="k-popover-content-arrow"></div>
            <div className="k-popover-content__wrapper">
                <div className="k-popover-content__inner">
                    {props.content || ' '}
                </div>
            </div>
        </div>
    </div>
};

export default KPopover;
