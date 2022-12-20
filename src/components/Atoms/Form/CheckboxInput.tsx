import '../../../styles/components/Atoms/Form/Checkbox.scss';
import React, { useState, useEffect } from 'react';
import { CheckboxProps } from '../../../types/props';
import Input from './Input';
import InputNormal from './InputNormal';


export default function CheckboxInput<T>({
    title,
    className = '',
    row,
    value,
    onChangeCheckedInput,
    onClick,
}: any) {
    const [values, setvalues] = useState<any>('');
    const [checked, setChecked] = useState(false);
    const handleChange = (e: any) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const onChangeCheck = () => {
        setChecked(!checked);
    }
    useEffect(() => {
        if (value > 0) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, []);

    return (
        <div className='d-flex align-items-center'>
            <div className="custom-control custom-checkbox">
                <label className="customcheck d-flex">
                    <input type="checkbox" checked={checked} onClick={() => { onChangeCheck() }} />
                    <span className="checkmark"></span>
                </label>
            </div>
            <input
                // placeholder={row[key]}
                defaultValue={value}
                type={'number'}
                disabled={!checked}
                spellCheck="true"
                style={{ color: '#212529' }}
                autoComplete="off"
                className={`bg-styles input-small`}
                onChange={(e) => onChangeCheckedInput && onChangeCheckedInput(e, row)}
            />
        </div>
    );
}
