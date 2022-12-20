import '../../../styles/components/Atoms/Form/Checkbox.scss';

import React from 'react';
import { CheckboxProps } from '../../../types/props';

export default function Checkbox<T>({
  title,
  className,
  checked,
  row,
  onChangeCheckedInput,
  onClick,
}: any) {
  return (
    <div className={`custom-control custom-checkbox ${className}`}>
      {/* <input type="checkbox" className="custom-control-input" id="remember-me"/>
            <label className="custom-control-label"
                for="remember-me">Remember me</label> */}

      <label className="customcheck d-flex">
        <span className="label">{title}</span>
        <input type="checkbox" checked={checked} onChange={(e) => onChangeCheckedInput && onChangeCheckedInput(e, row)} />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}
