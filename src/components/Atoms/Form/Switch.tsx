import '../../../styles/components/Atoms/Form/Checkbox.scss';

import React, { useState } from 'react';
import { SwitchProps } from '../../../types/props';

export default function Checkbox<T>({
    title,
    checked = false,
    className = '',
    row,
    onChangeCheckedInput,
}: any) {

    // const [checked, setChecked] = useState(false);
    // const onChangeCheck = () => {
    //     setChecked(!checked);
    // }
    return (
        <div className="switch d-flex align-items-center mx-2">
            <label
                htmlFor="toggleInput"
            // onClick={onClick}
            >
                {title}
            </label>
            <span>
                <input
                    type="checkbox"
                    id="toggleInput"
                    checked={checked}
                    onChange={(e) => onChangeCheckedInput && onChangeCheckedInput(e, row)}
                />
                <button
                    className="slider"
                    type="button"
                    onClick={(e) => onChangeCheckedInput && onChangeCheckedInput(e, row)}
                >
                </button>
            </span>
        </div>
    );
}
