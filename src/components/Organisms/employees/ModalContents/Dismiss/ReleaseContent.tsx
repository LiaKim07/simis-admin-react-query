import React from 'react';

import Heading from '../../../../Atoms/Heading';
import Br from '../../../../Atoms/Form/Br';


const ReleaseContent = ((subdata: any) => {
    const subData = subdata.subdata;
    let today = new Date();


    return (
        <div className='mt-5'>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {subData.name + ", " + "ĮM.KODAS " + subData.number + " " + subData.address + " " + subData.city}
            </Heading>
            <Br />
            <div>
                <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                    {subData.firstName + " " + subData.lastName}
                </Heading>
            </div>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"DARBO SUTARTIES " + subData.start + "Nr." + subData.contractNumber}
            </Heading>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"Priedas Nr. [attachmentNumber?]"}
            </Heading>
            <Br />
            <div className='text-center'>
                {String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear()}
            </div>
            <Br />
            <Br />
            <Br />
            <div className='text-center'>
                {"Darbo sutartis nutraukta: Remiantis LR DK 55 str.1 d. ir direktoriaus [date?]. įsakymu Nr. ATL-13, " + subData.end + "  atleidžiamas iš [emploeyeeRoleId] pareigų.    "}
            </div>
        </div>
    );
});

export default ReleaseContent;
