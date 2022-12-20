import React, {
  AllHTMLAttributes,
  ButtonHTMLAttributes,
  DOMAttributes,
  ReactNode,
} from 'react';

export interface CommonProps<T> extends AllHTMLAttributes<DOMAttributes<T>> { }

import { Color, SelectData, ValueType } from '.';
import { IModal, ModalSubItem } from './services/modal.types';
import { ISidebar, NestedItem, SubItem } from './services/sidebar.types';

/**
 * input props that will be shared to all input components
 */
export interface CommonInputProps<T> extends CommonProps<T> {
  handleChange: (_e: ValueType) => void;
  name: string;
  value?: string | number;
  options?: SelectData[];
}

export interface HeadingProps {
  text: string;
  color?: string;
  className?: string;
  weight?: string;
}

export interface InputProps<T> extends CommonInputProps<T> {
  defaultValue?: string;
  type?: string;
  readonly?: boolean;
  // handleChange?: (_e: ValueType) => void;
  value?: string | number;
  name: string;
  full?: boolean;
  padding?: string;
  fcolor?: Color;
  bcolor?: Color;
  pcolor?: Color;
  width?: string | number;
  className?: string;
  bgStyles?: boolean;
  inputColor?: string;
  required?: boolean;
  reference?: React.LegacyRef<HTMLInputElement>;
}

export interface ButtonProps<T> extends ButtonHTMLAttributes<DOMAttributes<T>> {
  children: ReactNode;
  disabled?: boolean;
  full?: boolean;
  icon?: IconNames;
  color?: Color;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

export interface TableActionsType<T> {
  name: string;
  icon: IconNames;
  handleAction: (_data: T) => void;
}

export interface SwitchProps<T> {
  checked: boolean;
  title: string;
  className?: string;
  onClick?: () => void;
}

export interface CheckboxProps<T> {
  title: string;
  className?: string;
  checked?: boolean;
  onClick?: () => void;
}

export type IconNames =
  | 'print'
  | 'add'
  | 'add-deactive'
  | 'home'
  | 'arrow-right'
  | 'arrow-right2'
  | 'arrow-left'
  | 'filter'
  | 'more'
  | 'arrow-up-black'
  | 'arrow-down-dark'
  | 'menu'
  | 'plus'
  | 'message'
  | 'setting'
  | 'notification'
  | 'add-small'
  | 'doc'
  | 'add-btn'
  | 'minus'
  | 'copy'
  | 'sub-plus'
  | 'save';

export interface ListItemProps {
  item: ISidebar;
  toogleDropper: (listId: number) => void;
  open: boolean;
}

export interface ListSubItemProps {
  items: SubItem[];
}

export interface ListSubNestedItemProps {
  item: NestedItem;
}

export interface NavProps {
  collapse: boolean;
  setCollapse: (_x: boolean) => void;
}

export interface ContentItemProps {
  item: IModal;
  handChange: (_e: ValueType) => void;
}

export interface ContentSubHolderProps {
  items: ModalSubItem[];
  handleChange: (_e: ValueType) => void;
}

export interface ModalProps {
  show?: boolean;
  isShow?: boolean;
  className?: string;
  setShow: (_val: boolean) => void;
  setPrintShow?: (_val: boolean) => void;
  onHide: () => void;
}


export interface PrintModalProps {
  show?: boolean;
  isShow?: boolean;
  className?: string;
  setShow: (_val: boolean) => void;
  setPrintShow: (_val: boolean) => void;
  onHide: () => void;
}
//common input props that will be used on all reusable input components
export interface commonInputProps {
  required?: boolean;
  handleChange: (_e: ValueType) => any;
  name: string;
  options: SelectData[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface SelectProps extends commonInputProps {
  isMulti?: boolean;
  getOptionLabel?: (_option: Object) => string;
  getOptionValue?: (_option: Object) => string;
  noOptionsMessage?: string;
  width?: string;
  searchable?: boolean;
  defaultValue?: SelectData;
  styles?: Object;
  hasError?: boolean;
  height?: number | string;
  padding?: number | string;
  bgColor?: string;
  loading?: boolean;
  value?: string | string[] | null;
}

export interface IFilterType<T> {
  column: keyof T;
  filter: string;
  filterType:
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'lessThan'
  | 'greaterThan';
}

export type filterType =
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'lessThan'
  | 'greaterThan';
