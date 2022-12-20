import '../../../styles/components/Atoms/Form/Checkbox.scss';

import React from 'react';
import { CheckboxProps } from '../../../types/props';

export default function CheckboxWhite<T>({
    title,
    className = '',
    onClick,
}: CheckboxProps<T>) {
    return (
        <div className="custom-control custom-checkbox">
            {/* <input type="checkbox" className="custom-control-input" id="remember-me"/>
            <label className="custom-control-label"
                for="remember-me">Remember me</label> */}

            <label className="customcheck d-flex">
                <span className="label">{title}</span>
                <input type="checkbox" />
                <span className="checkmark checkboxwhite"></span>
            </label>
        </div>
    );
}
