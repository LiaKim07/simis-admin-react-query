import React from 'react';

import Heading from '../../../../Atoms/Heading';
import Br from '../../../../Atoms/Form/Br';


const ReqContent = ((subdata: any) => {
    const subData = subdata.subdata;
    let today = new Date();


    return (
        <div className='mt-5'>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {subData.name + ", " + "ĮM.KODAS " + subData.number + " " + subData.address + " " + subData.city}
            </Heading>
            <Br />
            <Heading fontSize="xl" className='text-center'>
                {"[employeeRoleId]"}
            </Heading>
            <Br />
            <Heading fontSize="xl" className='text-center'>
                {"firstName" + " " + "lastName"}
            </Heading>
            <Br />
            <div>
                <h6>
                    {"Direktoriui: " + subData.managerId}
                </h6>
            </div>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"PRAŠYMAS"}
            </Heading>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"DĖL ATLEDIMO IŠ DARBO"}
            </Heading>
            <div className='text-center'>
                {String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear()}
            </div>
            <div className='text-center'>
                {subData.city}
            </div>
            <Br />
            <div className='text-center'>
                {"Prašau mane, " + "firstName" + " " + "lastName" + ", " + " atleisti iš įmonės UAB „A.R.S.A. project“ " + "employeeRoleId" + " pareigų nuo " + "endDate" + " pagal LR DK 55 str. 1 dalį (savo noru)."}
            </div>
        </div>
    );
});

export default ReqContent;
