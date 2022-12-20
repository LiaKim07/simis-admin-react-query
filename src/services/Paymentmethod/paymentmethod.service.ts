import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IPaymentmethodInfo } from '../../types/services/paymentmethod.type';

class PaymentmethodService {
    public async getAll(): Promise<AxiosResponse<IPaymentmethodInfo[]>> {
        return await customAxios.get('/payment-methods');
    }

    public async getById(id: string): Promise<AxiosResponse<IPaymentmethodInfo>> {
        return await customAxios.post(`/payment-methods/${id}`);
    }
}

export const paymentmethodService = new PaymentmethodService();
