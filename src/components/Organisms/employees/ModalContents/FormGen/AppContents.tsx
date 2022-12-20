import React from 'react';

import Heading from '../../../../Atoms/Heading';
import Br from '../../../../Atoms/Form/Br';
import { companyStore } from '../../../../../store/company.store';


const AppContents = ((subdata: any, comapnyData: any) => {
    const subData = subdata.subdata;
    const { data: companyData } = companyStore.getAll();
    let propsData: any = [];
    if (companyData?.data) {
        propsData = companyData?.data?.result;
    }
    let today = new Date();

    return (
        <div style={{ 'marginTop': '6rem' }}>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {`${propsData.name}, ĮM.KODAS ${propsData.number}, ${propsData.address},${propsData.city}`}
            </Heading>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {subData.firstName + " " + subData.lastName}
            </Heading>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {subData.personalIdentificationNumber + " " + subData.address + " " + subData.city + " " + subData.country}
            </Heading>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {subData.phone}
            </Heading>
            <Br />
            <h5>{`Direktoriui:${propsData.managerId}`}</h5>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"PRAŠYMAS"}
            </Heading>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"DĖL PRIĖMIMO Į DARBĄ"}
            </Heading>
            <Br />
            <div className='text-center'>
                {String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear()}
            </div>
            <div className='text-center'>
                {propsData.city}
            </div>
            <Br />
            <Br />
            <div className='mb-5'>
                {"Prašau priimti mane "}<span>{" " + subData.firstName + " " + subData.lastName + " "}</span>{`dirbti, įmonės UAB ${propsData.name} , ${subData.employeeRoleId} nuo`}  <span style={{ 'color': 'red' }}>{subData.start}</span>
            </div>
            <Br />
            <div className='text-end mt-5'>
                {"___________________________________"}
            </div>
        </div>
    );
});

export default AppContents;
