import '../../../styles/components/Atoms/Form/Checkbox.scss';

import React, { useState } from 'react';
import { SwitchProps } from '../../../types/props';

export default function Switch<T>({
    title,
    checked = false,
    className = '',
    onClick,
}: SwitchProps<T>) {
    return (
        <div className="switch d-flex align-items-center mx-2">
            <label
                htmlFor="toggleInput"
                onClick={onClick}>
                {title}
            </label>
            <span>
                <input
                    type="checkbox"
                    id="toggleInput"
                    checked={checked}
                    onChange={onClick}
                />
                <button
                    className="slider"
                    type="button"
                    onClick={onClick}>
                </button>
            </span>
        </div>
    );
}