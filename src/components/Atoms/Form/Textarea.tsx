import '../../../styles/components/Atoms/Form/Input.scss';

import React, { useEffect, useState } from 'react';

import { InputProps } from '../../../types/props';

export default function Textarea<T>({
    placeholder = '',
    type,
    readonly = false,
    required = true,
    value = '',
    name,
    className = '',
    disabled = false,
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

    function handleOnChange(e: any) {
        setValue(e.target.value);
        if (handleChange && _value !== e.target.value)
            handleChange({ name, value: e.target.value, event: e });
    }

    return (
        <>
            <div className="field">
                <textarea
                    // placeholder={placeholder}
                    name={name}
                    disabled={disabled}
                    value={value}
                    spellCheck="true"
                    readOnly={readonly}
                    rows={3}
                    style={{ color: inputColor }}
                    autoComplete="off"
                    className={`${bgStyles ? 'bg-styles' : ''} ${className}`}
                    /* @ts-ignore */
                    onChange={handleOnChange}
                    required id={placeholder}
                    {...props}
                ></textarea>
                <label htmlFor={placeholder} title={placeholder} data-title={placeholder}></label>
            </div>
        </>
    );
}
