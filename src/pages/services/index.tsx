import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewServicesModal from '../../components/Organisms/services/AddNewServices';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import Table from '../../components/Organisms/tables/Table';
import { servicesStore } from '../../store/services.store';
// import { serviceCategory } from '../../store/service-categories.store';
// import { serviceSubCategory } from '../../store/service-subcategories.store';
import { ServicesTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ServicesTableDto } from '../../types/services/services.types';

export default function Services() {
    const navigate = useNavigate();
    const { data: servicesData } = servicesStore.getAll();
    // const { data: serviceCategoryData } = serviceCategory.getAll();
    // const { data: serviceSubCategoryData } = serviceSubCategory.getAll();
    let typeData: string = '';
    let continueTypeData: string = '';
    const services = [];
    if (servicesData) {
        for (const serviceData of servicesData?.data?.result) {
            // serviceCategoryData?.data?.result.map((item: any) => {
            //     if (item.id === serviceData.serviceCategoryId) {
            //         typeData = item.name;
            //     }
            // })
            // serviceSubCategoryData?.data?.result.map((item: any) => {
            //     if (item.id === serviceData.serviceSubCategoryId) {
            //         continueTypeData = item.name;
            //     }
            // })
            services.push({
                id: serviceData.id,
                "Pavadinimas": serviceData.name,
                "Paslaugos kodas": serviceData.number,
                "Matavimo vienetai": serviceData.unit,
                // "Kategorija": typeData,
                // "Tipas": continueTypeData,
            });
        }
    }

    const actions: TableActionsType<ServicesTableDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: ServicesTableDto) => {
                console.log('dsfadsfa', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: ServicesTableDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: ServicesTableDto) => {
                alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: ServicesTableDto) => {
        navigate(`/dashboard/services/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <ServicesTable
                data={services || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const ServicesTable = (props: any) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Paslaugos" navigation={['Paslaugos']} />
            </div>
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    actions={props.actions}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>
            <AddNewServicesModal
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
            />
            <SuccessModal
                isUpdate={false}
                show={isSuccessModalOpen}
                onHide={() => setisSuccessModalOpen(false)}
                setShow={setisSuccessModalOpen}
                handleClickAddAnother={() => {
                    setisSuccessModalOpen(false);
                    setisAddNewModalOpen(true);
                }}
            />
        </div>
    );
};
