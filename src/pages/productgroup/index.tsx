import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewProductgroupModal from '../../components/Organisms/productgroup/AddNewProductgroup';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import Table from '../../components/Organisms/tables/Table';
import { productGroup } from '../../store/productgroup.store';
import { productCategory } from '../../store/productcategory.store';
import { ProductGroupTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ProductGroupTableDto } from '../../types/services/productgroup.type';

export default function ProductGroup() {
  const navigate = useNavigate();
  const { data: productgroupData } = productGroup.getAll();
  const { data: productcategoryData } = productCategory.getAll();
  const productgroups = [];

  if (productgroupData) {
    for (const productgroupsData of productgroupData.data.result) {
      if (productcategoryData) {
        for (const productcategoriesData of productcategoryData.data.result) {
          if (productcategoriesData.id === productgroupsData.productCategoryId) {
            productgroups.push({
              id: productgroupsData.id,
              imageUrl: productgroupsData.imageUrl,
              "Pavadinimas": productgroupsData.name,
              "Aprašymas": productgroupsData.note,
              "Prekių tipas": productcategoriesData.name,
            });
          }
        }
      }
    }
  }

  const actions: TableActionsType<ProductGroupTableDto>[] = [
    {
      name: 'View',
      icon: 'add',
      handleAction: (item: ProductGroupTableDto) => {
        console.log('dsfadsfa', item);
      },
    },
    {
      name: 'Edit',
      icon: 'add',
      handleAction: (item: ProductGroupTableDto) => {
        console.log(item);
      },
    },
    {
      name: 'delete',
      icon: 'add',
      handleAction: (item: ProductGroupTableDto) => {
        alert('deleted ' + item['id']);
      },
    },
  ];

  const handleClickRow = (row: ProductGroupTableDto) => {
    navigate(`/dashboard/warehouse-settings/productgroup/${row.id}`);
  };
  const onChangePage = (_page: number) => {
    return {};
  };

  return (
    <div className="mb-5">
      <ProductTypeTable
        data={productgroups || []}
        uniqueCol="id"
        hide={['id', 'imageUrl']}
        actions={actions}
        handleClickRow={handleClickRow}
        onChangePage={onChangePage}
      />
    </div>
  );
}

const ProductTypeTable = (props: ProductGroupTableProps) => {
  const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
  const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

  return (
    <div className="px-3">
      <div className="">
        <Breadcrump title="Prekių grupės" navigation={['Sandėlio valdymas', 'Nustatymai', 'Prekių grupės']} />
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
      <AddNewProductgroupModal
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
