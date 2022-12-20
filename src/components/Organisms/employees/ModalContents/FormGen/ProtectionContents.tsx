import React from 'react';

import Heading from '../../../../Atoms/Heading';
import Br from '../../../../Atoms/Form/Br';
import Table from '../../../tables/Table';


const ProtectionContent = ((subdata: any) => {
    let today = new Date();


    const testData = [
        {
            "header1": "Vardas",
            "header2": "Lytis",
        },
        {
            "header1": "Pavardė",
            "header2": "Ūgis",
        },
        {
            "header1": "Darbo laiko apskaitos žiniaraščio Nr.",
            "header2": "Dydžiai",
        },
        {
            "header1": "Padalinys",
            "header2": "Drabužio",
        },
        {
            "header1": "Darbo vieta",
            "header2": "Avalynės",
        },
        {
            "header1": "Pareigos",
            "header2": "Galvos apdangalo",
        },
        {
            "header1": "Priėmimo į darbą data",
            "header2": "Kitos",
        },
    ];

    const testData1 = [
        {
            'Working Tool': 'Working Tool1',
            'Pagrindas išduoti': 'sąrašas',
            'Kiekis': 1,
            'Mato vienetas': 'Vnt',
            'Tinkamumo naudoti terminas': '12 mėn.',
        },
        {
            'Working Tool': 'Working Tool2',
            'Pagrindas išduoti': 'sąrašas',
            'Kiekis': 1,
            'Mato vienetas': 'Vnt',
            'Tinkamumo naudoti terminas': '12 mėn.',
        },
        {
            'Working Tool': 'Working Tool3',
            'Pagrindas išduoti': 'sąrašas',
            'Kiekis': 1,
            'Mato vienetas': 'Vnt',
            'Tinkamumo naudoti terminas': '12 mėn.',
        },
    ]

    const testData2 = [
        {
            'Asmeninės apsaugos priemonės kodas': '',
            'Asmeninės apsaugos priemonės pavadinimas': '',
            'Mato vienetas': '',
            'Kiekis': '',
            'Parašas': '',
            'Pastaba': '',
        },
        {
            'Asmeninės apsaugos priemonės kodas': '',
            'Asmeninės apsaugos priemonės pavadinimas': '',
            'Mato vienetas': '',
            'Kiekis': '',
            'Parašas': '',
            'Pastaba': '',
        },
    ]

    const actions: any = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: any) => {
                console.log('add', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: any) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: any) => {
                console.log('delete', item);
                // alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: any) => {
        console.log('row data', row)
        // navigate(`/dashboard/warehouses/products/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div>
            <Heading fontWeight="bold" fontSize="xl">
                {"UAB “A.R.S.A. PROJECT”S"}
            </Heading>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"DARBUOTOJO ASMENINIŲ APSAUGOS"}
            </Heading>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"PRIEMONIŲ APSKAITOS"}
            </Heading>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"K O R T E L Ė  Nr. [number]"}
            </Heading>
            <div className="mb-5">
                <Table
                    data={testData || []}
                    uniqueCol="id"
                    hide={['id']}
                    showAddNewButton={false}
                    isFilter={false}
                    isTheader={false}
                    showNumbering={false}
                    isPagenation={false}
                    rowsPerPage={50}
                    actions={actions}
                    handleClickRow={handleClickRow}
                    onChangePage={onChangePage}
                />
            </div>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"ASMENINĖS APSAUGOS PRIEMONĖS"}
            </Heading>
            <Br />
            <div className="mb-2">
                <Table
                    data={testData1 || []}
                    uniqueCol="id"
                    hide={['id']}
                    showAddNewButton={false}
                    isFilter={false}
                    rowsPerPage={50}
                    isPagenation={false}
                    actions={actions}
                    handleClickRow={handleClickRow}
                    onChangePage={onChangePage}
                />
            </div>
            <Br />
            <div className='text-start mb-2'>
                {String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear()}
            </div>
            <div className='text-start mb-2'>
                {"Darbdavys ar jo įgaliotas asmuo  "}
            </div>
            <div className='text-start mb-4'>
                {"Vieną egzempliorių gavau	"}
            </div>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"ASMENINIŲ APSAUGOS PRIEMONIŲ IŠDAVIMO (GRĄŽINIMO) "}
            </Heading>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"ŽINIARAŠTIS Nr [number]"}
            </Heading>
            <Br />
            <div className="mb-2">
                <Table
                    data={testData2 || []}
                    uniqueCol="id"
                    hide={['id']}
                    showAddNewButton={false}
                    isFilter={false}
                    rowsPerPage={50}
                    isPagenation={false}
                    actions={actions}
                    handleClickRow={handleClickRow}
                    onChangePage={onChangePage}
                />
            </div>
            <Br />
            <div className='text-start mb-2'>
                {"Išdavė:_____________________________________________________________________ "}
            </div>
            <div className='text-start mb-4'>
                {"Gavo: ______________________________________________________________________ "}
            </div>
        </div>
    );
});

export default ProtectionContent;
