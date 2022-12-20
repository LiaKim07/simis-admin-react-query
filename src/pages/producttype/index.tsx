import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewProducttypeModal from '../../components/Organisms/producttype/AddNewProducttypeModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import Table from '../../components/Organisms/tables/Table';
import { productType } from '../../store/producttype.store';
import { productGroup } from '../../store/productgroup.store';
import { ProductTypeTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ProductTypeTableDto } from '../../types/services/producttype.type';

export default function ProductType() {
  const navigate = useNavigate();
  const { data: producttypeData } = productType.getAll();
  const { data: productgroupData } = productGroup.getAll();
  const producttypes: ProductTypeTableDto[] = [];

  if (producttypeData) {
    for (const producttypesData of producttypeData.data.result) {
      if (productgroupData) {
        for (const productgroupsData of productgroupData.data.result) {
          if (productgroupsData.id === producttypesData.productGroupId) {
            producttypes.push({
              id: producttypesData.id,
              imageUrl: producttypesData.imageUrl,
              "Pavadinimas": producttypesData.name,
              "Pastaba": producttypesData.note,
              "Grupė": productgroupsData.name,
              createdBy: producttypesData.createdBy
            });
          }
        }
      }
    }
  }

  const actions: TableActionsType<ProductTypeTableDto>[] = [
    {
      name: 'View',
      icon: 'add',
      handleAction: (item: ProductTypeTableDto) => {
        console.log('dsfadsfa', item);
      },
    },
    {
      name: 'Edit',
      icon: 'add',
      handleAction: (item: ProductTypeTableDto) => {
        console.log(item);
      },
    },
    {
      name: 'delete',
      icon: 'add',
      handleAction: (item: ProductTypeTableDto) => {
        alert('deleted ' + item['id']);
      },
    },
  ];

  const handleClickRow = (row: ProductTypeTableDto) => {
    navigate(`/dashboard/warehouse-settings/producttype/${row.id}`);
  };
  const onChangePage = (_page: number) => {
    return {};
  };

  return (
    <div className="mb-5">
      <ProductTypeTable
        data={producttypes || []}
        uniqueCol="id"
        hide={['id', 'imageUrl', 'createdBy']}
        actions={actions}
        handleClickRow={handleClickRow}
        onChangePage={onChangePage}
      />
    </div>
  );
}

const ProductTypeTable = (props: ProductTypeTableProps) => {
  const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
  const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

  return (
    <div className="px-3">
      <div className="">
        <Breadcrump title="Prekių tipai" navigation={['Sandėlio valdymas', 'Nustatymai', 'Prekių tipai']} />
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
      <AddNewProducttypeModal
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
