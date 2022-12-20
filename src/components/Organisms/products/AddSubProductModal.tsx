import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useParams, useLocation } from "react-router-dom";

import { queryClient } from '../../../plugins/react-query';
import { productType } from '../../../store/producttype.store';
import { productCategory } from '../../../store/productcategory.store';
import { productGroup } from '../../../store/productgroup.store';
import { productStore } from '../../../store/products.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { employeeStore } from '../../../store/employees.store';
import { warehouseAttachmentStore } from '../../../store/warehouseAttachement';

import { SelectData, ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import { ICreateProduct } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import Checkbox from '../../Atoms/Form/CheckboxWhite';
import CheckboxNormal from '../../Atoms/Form/Checkbox';
import CustomSelect from '../../Atoms/Form/Select';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import TableService from '../tables/TableProductSubAddModal';
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    productId?: string;
    isUpdating?: boolean;
    quantitiesInfo?: any;
    userId?: any;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "type": "purchases",
    "quantity": "",
    "note": "",
    "number": `purchases_number`,
    "warehouseProductId": "",
    "projectId": "",
    "projectOrderId": "",
    "basePrice": "",
    "discount": 0,
    "discountedPrice": 0,
    "rentFactor": 0,
    "isCustomRentPrice": false,
    "customUnitRentPriceForOneDay": 0,
    "customTotalRentPriceForOneDay": 0,
    "unitRentPriceForOneDay": 0,
    "totalRentPriceForOneDay": 0,
    "createdBy": tokenData,
    "repairCost": 0
};

export default function AddNewSubProductModal({
    setShow,
    productId,
    userId,
    isUpdating = false,
    quantitiesInfo,
    handleSuccess,
    ...props
}: IModalProps) {

    const { id } = useParams();
    const location: any = useLocation();
    let warehouseId = location.state.warehouseId;

    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<any>({ ...defaultState });
    const [productName, setProductName] = useState<string>('');
    const [warehouseName, setWarehouseName] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<any>();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [customValue, setCustomValue] = useState<any>({});

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeString = (e: any) => {
        setCustomValue({ ...values, [e.name]: e.value });
    };

    const onChangePage = (_page: number) => {
        return {};
    };

    const { data: producttypeData } = productType.getAll();
    let productTypeData: any = [];
    if (!producttypeData?.data) {
        productTypeData = [];
    } else {
        productTypeData = producttypeData.data.result;
    }

    const { data: productgroupData } = productGroup.getAll();
    let productGroupData: any = [];
    if (!productgroupData?.data) {
        productGroupData = [];
    } else {
        productGroupData = productgroupData.data;
    }

    const { data: productcategoryData } = productCategory.getAll();
    let productCategoryData: any = [];
    if (!productcategoryData?.data) {
        productCategoryData = [];
    } else {
        productCategoryData = productcategoryData.data;
    }

    const { mutateAsync } = warehouseStore.createWarehouseOrder();
    const { mutateAsync: updateMutation } = productStore.updateProduct();
    const { data: product } = productStore.getById(productId);
    const { data: warehouse } = warehouseStore.getById(warehouseId as string);
    const { data: employee } = employeeStore.getAll();
    const { data: attachments } = warehouseAttachmentStore.getAll();
    const { data: warehouseProduct } = warehouseStore.getAllWarehosueProducts();
    const { data: warehouseOrder } = warehouseStore.getAllWarehosueOrders();
    let empName = '';
    if (employee) {
        employee?.data?.result?.map((emp: any) => {
            if (emp?.id === warehouse?.data?.result.employeeId) {
                empName = emp.firstName + " " + emp.lastName;
            }
        })
    }
    let attachmentData: any = [];
    if (attachments) {
        attachments?.data?.result?.map((item: any) => {
            if (item.warehouseId === warehouseId) {
                attachmentData.push(item);
            }
        })
    }

    let warehouseProductId = '';
    let MockData: any = [];
    let saleQuantity: number = 0;
    let writeOffQuantity: number = 0;
    if (warehouseProduct) {
        for (const warehouseProductsData of warehouseProduct?.data?.result) {
            if (warehouseProductsData.productId === id && userId === warehouseProductsData.warehouseId) {
                warehouseOrder?.data?.result.map((item: any) => {
                    if (warehouseProductsData.id === item.warehouseProductId) {
                        if (item.type === 'sales') {
                            saleQuantity = saleQuantity + item.quantity;
                        }
                        if (item.type === 'writeoffs') {
                            writeOffQuantity = writeOffQuantity + item.quantity;
                        }
                    }
                })
            }
        }
    }

    if (warehouseProduct) {
        warehouseProduct?.data?.result?.map((item: any) => {
            if (item.productId === productId && item.warehouseId === warehouseId) {
                warehouseProductId = item.id;
                MockData.push({
                    'Sandėlys': warehouse?.data?.result?.name,
                    'Valdytojas': empName,
                    'Kiekis sandėlyje': item.quantity,
                    'Rezervuota': item.reservedQuantity,
                    'Nuomoje': item.loanedOutQuantity,
                    'Parduota': saleQuantity,
                    // 'Nurašyta': quantitiesInfo?.writeOffQuantity,
                    'Nurašyta': writeOffQuantity,
                    // 'Options': 'd',
                })
            }
        })
    }


    useEffect(() => {
        if (product) {
            setProductName(product?.data?.result.number + "-" + product?.data?.result.name)
        }
    }, [product?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        let sub_data = [{ ...values, "warehouseProductId": warehouseProductId }];
        mutateAsync(sub_data, {
            async onSuccess(_data) {
                if (_data) {

                    toast.success('Created successfully', { id: toastId });
                    queryClient.invalidateQueries(['warehouse-orders']);
                    queryClient.invalidateQueries(['warehouse-products']);
                    queryClient.invalidateQueries(['warehouses']);
                    queryClient.invalidateQueries(['products']);
                    closeModal();
                    // const formData = new FormData();
                    // formData.append("file", selectedFile);

                    // const token = localStorage.getItem('jwt_info');
                    // if (token) {
                    //     const toastId = toast.loading('Uploading ....');
                    //     const jwtInfo = JSON.parse(token);
                    //     let url: string = '';   //writeoff-attachments?warehouseProductId=test&customFileName=test&createdBy=test
                    //     url = `https://www.simis.itvs.lt/api/v1/warehouse-attachments?warehouseId=${warehouseId}&customFileName=${customValue.customFileName}&createdBy=${values.createdBy}`

                    //     fetch(url, {
                    //         method: "POST",
                    //         body: formData,
                    //         headers: {
                    //             'Authorization': `Bearer ${jwtInfo.result?.token}`
                    //         },
                    //     })
                    //         .then((response) => response.json())
                    //         .then((result) => {
                    //             if (result.statusCode === 201) {
                    //                 toast.success('Uploaded successfully', { id: toastId });
                    //                 queryClient.invalidateQueries(['warehouseWriteoffAttachment']);
                    //                 closeModal();
                    //                 resetForm();
                    //             } else {
                    //                 toast.error(result.message, {
                    //                     id: toastId,
                    //                 });
                    //                 closeModal();
                    //             }
                    //         })
                    //         .catch((error) => {
                    //             toast.error('error occurred please try again', {
                    //                 id: toastId,
                    //             });
                    //             closeModal();
                    //         });
                    // }
                }
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });

    };

    const resetForm = () => {
        setvalues({ ...defaultState });
    };

    const handleCancel = () => {
        setCustomValue({});
        resetForm();
        closeModal();
    };

    const [type1, setType1] = useState<string>('string');

    const onBlurtype1 = (e: any) => {
        if (e.target.value === "") {
            setType1('string')
        }
    }

    const onFocus1 = (e: any) => {
        setType1('date')
    }

    async function handleOnChange(event: any) {
        setSelectedFile(event.target.files[0]);
        event.target.files[0] && setIsFilePicked(true);
    }

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="sm">
                            {`${productName} - Sandelliavimas `}
                        </Heading>
                        <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
                            <span className="close-txt font-bold text-capitalize tracking-0">
                                Uždaryti
                            </span>
                            <img
                                src={'/icons/close-icon.svg'}
                                className="cursor-pointer"
                                width={30}
                                alt="close-icon"
                            />
                        </button>
                    </div>
                    <div className="body-content px-4 modal-border">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                            <div className='mb-3'>
                                <TableService
                                    data={MockData || []}
                                    uniqueCol="id"
                                    hide={['id', 'imageUrl']}
                                    actions={[]}
                                    handleClickRow={() => console.log('')}
                                    onChangePage={onChangePage}
                                />
                            </div>
                            <div className="border rounded">
                                <table className="table table-responsive my-0" id="myTable">
                                    <tbody>
                                        <tr className="rounded bg-light">
                                            <td
                                                className="text-capitalize font-bold px-2 text-sm headerclick"
                                                style={{ 'color': 'transparent' }}
                                            >
                                                data
                                            </td>
                                        </tr>
                                        {/* Table body */}
                                        <tr
                                            className="contentrows align-middle"
                                        >
                                            <td className="text-xs px-2">
                                                <div>
                                                    <div className='row mx-5 text-center'>
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                                            <Input
                                                                className="mr-3"
                                                                type="number"
                                                                name="basePrice"
                                                                handleChange={handleChange}
                                                                placeholder="Kaina"
                                                                value={values.basePrice}
                                                            />
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                                                            <Input
                                                                className="mr-3"
                                                                type="number"
                                                                name="quantity"
                                                                handleChange={handleChange}
                                                                placeholder="Kiekis"
                                                                value={values.quantity}
                                                            />
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-7 p-2" >
                                                            <CustomSelect
                                                                name="test"
                                                                handleChange={handleChange}
                                                                placeholder="Dokumentai"
                                                                value={'test'}
                                                                options={
                                                                    attachmentData.map((n: any) => ({
                                                                        value: n.id,
                                                                        label: n.originalFileName,
                                                                    })) as SelectData[]
                                                                }
                                                            />
                                                        </div>
                                                        {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                                                            <Input
                                                                className="mr-3"
                                                                type="string"
                                                                name="customFileName"
                                                                handleChange={handleChangeString}
                                                                placeholder="Dokumento pavadinimas"
                                                                value={customValue.customFileName}
                                                            />
                                                        </div> */}
                                                        {/* <div className="col-12 col-sm-12 col-md-6 col-lg-12 p-2" >
                                                            <div className="col-6">
                                                                <Button className="text-capitalize b-radius light" >
                                                                    <label
                                                                        style={{ 'width': '100%', 'color': '#9E41D6' }}
                                                                        htmlFor="profileUrl"
                                                                        className=" b-radius light cursor-pointer col-6 rounded-2 text-center">
                                                                        <span>+ Prideti dokumenta</span>
                                                                    </label>
                                                                </Button>
                                                            </div>
                                                            <input
                                                                onChange={handleOnChange}
                                                                type="file"
                                                                accept=".pdf, .txt"
                                                                name="profileUrl"
                                                                id="profileUrl"
                                                                hidden
                                                            />
                                                        </div> */}
                                                        {/* <div className="mx-5 float-end">
                                                        <button className="btn w-auto">
                                                            <Icon name={"add-btn"} styles={{ marginLeft: "5px" }} size={35} />
                                                        </button>
                                                    </div> */}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="body-modal-footer row px-4 my-4">
                        <div className="col-3 mr-2">
                            <Button className="text-capitalize b-radius d-flex align-items-center" onClick={() => handleSubmit()}>
                                <Icon name="save" />
                                <span>&nbsp;Išsaugoti</span>
                            </Button>
                        </div>
                        <div className="col-3">
                            <Button className="text-capitalize b-radius light" onClick={handleCancel}>
                                Atšaukti
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
