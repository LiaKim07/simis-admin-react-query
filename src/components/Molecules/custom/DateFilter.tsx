import React, { useEffect, useState } from 'react';

import { SelectData, ValueType } from '../../../types';
import Input from '../../Atoms/Form/Input';
import CustomSelect from '../../Atoms/Form/Select';
import Icon from '../../Atoms/Icon';
import { productGroup } from '../../../store/productgroup.store';
import { productType } from '../../../store/producttype.store';
interface IProps<T> {
    data?: any;
    handleFilter: (_val: any) => void;
}
const defaultState: any = {
    type: '',
    group: '',
    name: '',
    search: '',
};

export default function DateFilter<T>({ data, handleFilter }: IProps<T>) {
    const [filter, setfilter] = useState<any>({});
    const [values, setvalues] = useState<any>({ ...defaultState });
    const [typeValue, setTypeValue] = useState<any>([]);
    const [groupValue, setGroupValue] = useState<any>([]);
    const [nameValue, setNameValue] = useState<any>([]);

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value, search: e.name });
    };
    let types: any = [], groups: any = [], names: any = [];
    useEffect(() => {
        if (data) {
            data.map((item: any) => {
                console.log('filter', item)
                types.push(item.Tipas);
                groups.push(item.Grupė);
                names.push(item.Pavadinimas);
            })
        }
        let arrTypeData = [...new Set(types)];
        let arrGroupData = [...new Set(groups)];
        let arrnameData = [...new Set(names)];
        setTypeValue(arrTypeData);
        setGroupValue(arrGroupData);
        setNameValue(arrnameData);
    }, [data]);

    useEffect(() => {
        handleFilter(filter);
    }, [filter]);

    // reset filter
    const handleResetFilter = () => {
        setfilter(values);
    };

    return (
        <div className="py-4">
            <div className="col-12 col-lg-12">
                <div className="border row py-2 bg-almost-white">
                    <div className="col-6 col-md-3">
                        <CustomSelect
                            name="name"
                            handleChange={handleChange}
                            placeholder="Kodas"
                            value={values.name}
                            options={
                                nameValue?.map((n: any) => ({
                                    value: n,
                                    label: n,
                                })) as SelectData[]
                            }
                        />
                    </div>
                    <div className="col-6 col-md-3">
                        <CustomSelect
                            name="type"
                            handleChange={handleChange}
                            placeholder="Tipas"
                            value={values.type}
                            options={
                                typeValue?.map((n: any) => ({
                                    value: n,
                                    label: n,
                                })) as SelectData[]
                            }
                        />
                    </div>
                    <div className="col-6 col-md-3">
                        <CustomSelect
                            name="group"
                            handleChange={handleChange}
                            placeholder="Grupė"
                            value={values.group}
                            options={
                                groupValue?.map((n: any) => ({
                                    value: n,
                                    label: n,
                                })) as SelectData[]
                            }
                        />
                    </div>
                    {/* <div className="col-6 col-md-3">
                        <Input
                            className="mr-3"
                            type={'text'}
                            name="search"
                            handleChange={handleChange}
                            placeholder="Search by name"
                            value={values.search}
                        />
                    </div> */}
                    <div className="col-6 col-md-3">
                        <button
                            className="w-auto btn text-xs text-capitalize reset-btn"
                            onClick={handleResetFilter}>
                            Set &nbsp;
                            <span className="ml-1 bg-light-gray rounded-circle">
                                <Icon name="setting" size={26} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
