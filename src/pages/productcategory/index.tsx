import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewCategoryModal from '../../components/Organisms/productcategory.tsx/AddNewProductcategory';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import Table from '../../components/Organisms/tables/Table';
import { productCategory } from '../../store/productcategory.store';
import { productGroup } from '../../store/productgroup.store';
import { ProductCategoryTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ProductCategoryTableDto } from '../../types/services/productcategory.type';

export default function ProductCategory() {
  const navigate = useNavigate();
  const { data: productcategoryData } = productCategory.getAll();
  const { data: productgroupData } = productGroup.getAll();
  const productcategories = [];

  if (productcategoryData) {
    for (const productcategoriesData of productcategoryData.data.result) {
      productcategories.push({
        id: productcategoriesData.id,
        imageUrl: productcategoriesData.imageUrl,
        "Pavadinimas": productcategoriesData.name,
        "Pastaba": productcategoriesData.note,
        createdBy: productcategoriesData.createdBy,
      });
    }
  }

  const actions: TableActionsType<ProductCategoryTableDto>[] = [
    {
      name: 'View',
      icon: 'add',
      handleAction: (item: ProductCategoryTableDto) => {
        console.log('dsfadsfa', item);
      },
    },
    {
      name: 'Edit',
      icon: 'add',
      handleAction: (item: ProductCategoryTableDto) => {
        console.log(item);
      },
    },
    {
      name: 'delete',
      icon: 'add',
      handleAction: (item: ProductCategoryTableDto) => {
        alert('deleted ' + item['id']);
      },
    },
  ];

  const handleClickRow = (row: ProductCategoryTableDto) => {
    navigate(`/dashboard/warehouse-settings/productcategory/${row.id}`);
  };
  const onChangePage = (_page: number) => {
    return {};
  };

  return (
    <div className="mb-5">
      <ProductTypeTable
        data={productcategories || []}
        uniqueCol="id"
        hide={['id', 'imageUrl', 'createdBy']}
        actions={actions}
        handleClickRow={handleClickRow}
        onChangePage={onChangePage}
      />
    </div>
  );
}

const ProductTypeTable = (props: ProductCategoryTableProps) => {
  const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
  const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

  return (
    <div className="px-3">
      <div className="">
        <Breadcrump title="Prekių kategorijos" navigation={['Sandėlio valdymas', 'Nustatymai', 'Prekių kategorijos']} />
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
      <AddNewCategoryModal
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
