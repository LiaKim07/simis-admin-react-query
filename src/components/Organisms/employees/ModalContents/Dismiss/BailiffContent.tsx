import React from 'react';

import Heading from '../../../../Atoms/Heading';
import Br from '../../../../Atoms/Form/Br';


const BailiffContent = ((subdata: any) => {
    const subData = subdata.subdata;
    let today = new Date();


    return (
        <div className='mt-5'>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {subData.name + ", " + "ĮM.KODAS " + subData.number + " " + subData.address + " " + subData.city}
            </Heading>
            <Br />
            <Br />
            <Heading fontWeight="bold" fontSize="sm">
                {"Antstolei: [bailiffName] ?"}
            </Heading>
            <Br />
            <div className='text-center'>
                {String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear()}
            </div>
            <Br />
            <Heading fontWeight="bold" fontSize="sm">
                {"[bailiffAdress]"}
            </Heading>
            <Br />
            <Br />
            <div>
                <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                    {"Dėl " + subData.firstName + " " + subData.lastName}
                </Heading>
            </div>
            <Br />
            <Br />
            <div >
                {"Informuojame, jog " + subData.firstName + " " + subData.lastName + ", " + " a/k " + subData.personalIdentificationNumber + ", " + " vykdomosios bylos numeris [proceedingNumber]?, darbo sutartis įmonėje UAB „A.R.S.A. project“ nutraukta [date]?."}
            </div>
        </div>
    );
});

export default BailiffContent;
