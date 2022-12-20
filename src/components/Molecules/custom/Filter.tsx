import React, { useEffect, useState } from 'react';

import { SelectData, ValueType } from '../../../types';
import { filterType, IFilterType } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import CustomSelect from '../../Atoms/Form/Select';
import Icon from '../../Atoms/Icon';
import Collapsible from '../Modal/Collapsible';
interface IProps<T> {
  tableType?: string;
  data?: T;
  handleFilter: (_column: keyof T, _filterType: filterType, _filter: string) => void;
}

const filterOperations: SelectData[] = [
  { value: 'contains', label: 'Contains' },
];

export default function Filter<T>({ data, handleFilter, tableType }: IProps<T>) {
  const [filter, setfilter] = useState<IFilterType<T>>({
    // @ts-ignore
    column: 'name',
    filterType: 'contains',
    filter: '',
  });

  const handleChange = (e: ValueType) => {
    setfilter((filter) => ({
      ...filter,
      [e.name]: e.value,
    }));
  };

  //automaticall call handleFilter when filter is changed
  useEffect(() => {
    handleFilter(filter.column, filter.filterType, filter.filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.filter, filter.filterType, filter.column]);

  const colOptions = React.useMemo(() => {
    if (data) {
      return Object.keys(data).map((key) => ({
        value: key,
        label: key,
      })) as SelectData[];
    } else return [];
  }, [data]);

  if (data && colOptions.length === Object.keys(data).length) {
    colOptions.shift();
  }

  if (tableType === 'order') {
    // console.log('data test', colOptions)
    colOptions.forEach(function (item, i) {
      if (item.value === "Adresas") {
        colOptions.splice(i, 1);
        colOptions.unshift(item);
      }
    });
  }
  // reset filter
  const handleResetFilter = () => {
    setfilter({
      // @ts-ignore
      column: 'id',
      filterType: 'contains',
      filter: '',
    });
  };

  return (
    <div className="py-4">
      <Collapsible
        addBorder={false}
        showIcon={false}
        title={
          <div className="col-4 col-md-3 col-lg-2 d-flex align-items-center justify-content-between bg-white py-2 px-3">
            <span className="pr-5 text-xs">Filtras</span>
            <Icon name="filter" size={20} />
          </div>
        }>
        <div className="col-12 col-lg-12">
          <div className="border row py-2 bg-almost-white">
            <div className="col-6 col-md-3">
              <CustomSelect
                name="column"
                placeholder="Col"
                handleChange={handleChange}
                bgColor="white"
                className="text-xs"
                defaultValue={colOptions[0]}
                options={colOptions}
                value={filter.column?.toString()}
              />
            </div>
            {/* <div className="col-6 col-md-3">
              <CustomSelect
                bgColor="white"
                placeholder="Filter"
                handleChange={handleChange}
                name="filterType"
                className="text-xs"
                options={filterOperations}
                value={filter.filterType}
              />
            </div> */}
            <div className="col-6 col-md-3">
              <Input
                handleChange={handleChange}
                name="filter"
                value={filter.filter}
                placeholder="Type here"
                className="bg-white"
              />
            </div>
            <div className="col-6 col-md-3">
              <button
                className="w-auto btn text-xs text-capitalize reset-btn"
                onClick={handleResetFilter}>
                Išvalyti &nbsp;
                <span className="ml-1 bg-light-gray rounded-circle">
                  <img
                    src={'/icons/close-icon.svg'}
                    className="cursor-pointer"
                    width={30}
                    alt="close-icon"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}
