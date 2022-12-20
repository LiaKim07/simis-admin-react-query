import { useMutation, useQuery } from "react-query";
import { customerContactService } from "../services/customer/customer-contact.service";

class CustomerContacts {
    getAll() {
        return useQuery(["customer-contact"], () => customerContactService.fetchAll());
    }

    createCutomerContacts() {
        return useMutation(customerContactService.create);
    }

    updateCutomerContacts() {
        return useMutation(customerContactService.update);
    }

    getById(id?: string) {
        return useQuery(
            ["customer-contactById", id],
            () => customerContactService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    getByCustomerId(id?: string) {
        return useQuery(
            ["customer-contactByCustomerId", id],
            () => customerContactService.fetchByCustomerId(id || ""),
            {
                enabled: !!id,
            }
        );
    }
}

export const customerContacts = new CustomerContacts();
