import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';

import { ServicesDto } from "../../../types/services/services.types";
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewServicesModal from "./AddNewServices";
import RemoveModal from "../Modals/RemoveConfirmModal";
import { servicesStore } from '../../../store/services.store';
// import { serviceCategory } from '../../../store/service-categories.store';
// import { serviceSubCategory } from '../../../store/service-subcategories.store';

export default function ServicesInfo(props: { services: ServicesDto }) {
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = servicesStore.removeById();
    // const { data: serviceCategoryData } = serviceCategory.getAll();
    // const { data: serviceSubCategoryData } = serviceSubCategory.getAll();

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.services.id, {
            async onSuccess(_data) {
                toast.success('Services was created successfully', { id: toastId });
                queryClient.invalidateQueries(['services']);
                navigate(`/dashboard/services`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };

    let serviceInfo = {};
    if (props.services) {
        // let serviceCategoriesData, serviceSubCategoriesData = '';
        // if (serviceCategoryData) {
        //     for (const serviceCategory of serviceCategoryData?.data?.result) {
        //         if (serviceCategory.id === props.services.serviceCategoryId) {
        //             serviceCategoriesData = serviceCategory.name;
        //         }
        //     }
        // }

        // if (serviceSubCategoryData) {
        //     for (const serviceSubCategory of serviceSubCategoryData?.data?.result) {
        //         if (serviceSubCategory.id === props.services.serviceSubCategoryId) {
        //             serviceSubCategoriesData = serviceSubCategory.name;
        //         }
        //     }
        // }
        serviceInfo = {
            "Pavadinimas:": props.services?.name,
            "Paslaugos Kodas:": props.services?.number,
            "Kaina": props.services?.basePrice,
            "Matavimo vienetai": props.services?.unit,
            // "Kategorija": serviceCategoriesData,
            // "Tipas": serviceSubCategoriesData,
        }
    }

    return (
        <React.Fragment>
            {props.services ? (
                <div className="py-4 px-5 bg-white">
                    <div className="action py-3 row">
                        <div className="col-3 mr-3">
                            <Button
                                onClick={() => setRightModalShow(true)}
                                className="text-capitalize b-radius"
                            >
                                Redaguoti
                            </Button>
                        </div>
                        <div className="col-3 ml-3">
                            <Button
                                className="text-capitalize b-radius light"
                                onClick={() => setIsRemoveModalOpen(true)}
                            >
                                Ištrinti
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Data" data={serviceInfo} />
                        </div>
                    </div>

                    <AddNewServicesModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        servicesId={props.services.id}
                        isUpdating={true}
                    />

                    <SuccessModal
                        isUpdate={true}
                        show={isSuccessModalOpen}
                        onHide={() => setisSuccessModalOpen(false)}
                        setShow={setisSuccessModalOpen}
                    />

                    <RemoveModal
                        handleClickConfirm={() => handleClickConfirm()}
                        show={isRemoveModalOpen}
                        onHide={() => setIsRemoveModalOpen(false)}
                        setShow={setIsRemoveModalOpen}
                    />
                </div>
            ) : null}
        </React.Fragment>
    );
}
