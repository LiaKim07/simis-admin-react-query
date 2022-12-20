import '../../../styles/components/Atoms/Form/Input.scss';

import React, { useEffect, useState } from 'react';

import { InputProps } from '../../../types/props';
import Switch from "./Switch";

export default function InputSmall<T>({
    placeholder = '',
    type,
    readonly = false,
    required = true,
    value = '',
    name,
    className = '',
    min = 0,
    max,
    inputColor = '#212529',
    bgStyles = true,
    handleChange = () => { },
    ...props
}: // ...attrs
    InputProps<T>) {
    const [_value, setValue] = useState<string>('');

    useEffect(() => setValue(value?.toString()), [value]);
    const [checked, setChecked] = useState(false);

    function handleOnChange(e: any) {
        setValue(e.target.value);
        if (handleChange && _value !== e.target.value)
            handleChange({ name, value: e.target.value, event: e });
    }

    return (
        <div className='d-flex align-middle' style={{ 'background': "#EEF1F4", 'width': '60px' }}>
            <input
                // {...attrs} 
                placeholder={placeholder}
                name={name}
                type={type}
                value={value}
                spellCheck="true"
                readOnly={readonly}
                required={required}
                min={min}
                max={max}
                style={{ color: inputColor }}
                autoComplete="off"
                className={`${bgStyles ? 'bg-styles' : ''} ${className}`}
                /* @ts-ignore */
                onChange={handleOnChange}
                {...props}
            />
        </div>
    );
}
