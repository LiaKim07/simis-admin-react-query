import '../../../styles/components/Atoms/Form/Input.scss';

import React, { useEffect, useState } from 'react';

import { InputProps } from '../../../types/props';
import Switch from "./SwitchSimple";

export default function SwitchInputCheck<T>({
    placeholder = '',
    type,
    readonly = false,
    required = true,
    value = '',
    name,
    disabled = false,
    className = '',
    min = 0,
    max,
    inputColor = '#212529',
    bgStyles = true,
    handleChange = () => { },
    handleChangeSwitch = () => { },
    ...props
}: // ...attrs
    any) {
    const [_value, setValue] = useState<string>('');

    useEffect(() => {
        setValue(value?.toString());
        if (value > 0) {
            setChecked(true);
        }
    }, [value]);
    const [checked, setChecked] = useState(false);

    function handleOnChange(e: any) {
        setValue(e.target.value);
        if (handleChange && _value !== e.target.value)
            handleChange({ name, value: e.target.value, event: e });
    }

    const onChangeCheck = () => {
        handleChangeSwitch(!checked, value)
        if (!disabled) {
            setChecked(!checked);
        }
    }

    return (
        <div className='d-flex align-middle' style={{ 'background': "#EEF1F4" }}>
            <input
                // {...attrs} 
                disabled={disabled ? true : checked ? false : true}
                placeholder={placeholder}
                name={name}
                type={type}
                value={value === 0 ? '' : value}
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
            <Switch checked={checked} onClick={() => { onChangeCheck() }} title="" />
        </div>
    );
}
