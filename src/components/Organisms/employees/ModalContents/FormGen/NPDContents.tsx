import React from 'react';

import Heading from '../../../../Atoms/Heading';
import Br from '../../../../Atoms/Form/Br';
import { companyStore } from '../../../../../store/company.store';


const NPDContent = ((subdata: any) => {
    const subData = subdata.subdata;
    const { data: companyData } = companyStore.getAll();
    let propsData: any = [];
    if (companyData?.data) {
        propsData = companyData?.data?.result;
    }
    let today = new Date();

    return (
        <div className='mt-5'>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {`${propsData.name}, ĮM.KODAS ${propsData.number}, ${propsData.address},${propsData.city}`}
            </Heading>
            <Br />
            <div>
                <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                    {subData.firstName + " " + subData.lastName}
                </Heading>
            </div>
            <Br />
            <div>
                <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                    {subData.personalIdentificationNumber + " " + subData.address + " " + subData.city + " " + subData.country}
                </Heading>
            </div>
            <Br />
            <div>
                <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                    {subData.phone}
                </Heading>
            </div>
            <Br />
            <h5>{`Direktoriui:${propsData.managerId}`}</h5>
            <div>
                <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                    {"PRAŠYMAS"}
                </Heading>
            </div>
            <Br />
            <div className='text-center'>
                {String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear()}
            </div>
            <div className='text-center'>
                {"Mietas"}
            </div>
            <Br />
            <Br />
            <div className='text-center'>
                {`Prašau įmonėje ${propsData.name}` + " gaunamas su darbo santykiais susijusias pajamas nuo " + String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear() + ". apmokestinti taikant pagrindinį neapmokestinamąjį pajamų dydį (NPD)."}
            </div>
            <Br />
        </div>
    );
});

export default NPDContent;
