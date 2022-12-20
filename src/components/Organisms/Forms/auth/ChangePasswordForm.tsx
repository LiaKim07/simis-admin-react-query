import React, { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { authStore } from '../../../../store/auth.store';
import { ValueType } from '../../../../types';
import { ResetPasswordDto } from '../../../../types/services/auth.types';
import Input from '../../../Atoms/Form/Input';
import Button from '../../../Molecules/Button/Button';

export default function ChangePasswordForm(props: { changePasswordData: any }) {
    const navigate = useNavigate();

    const [details, setDetails] = useState<ResetPasswordDto>({
        username: '',
        newpassword: '',
        confirmpassword: '',
    });

    const handleChange = (e: ValueType) => {
        setDetails((details) => ({
            ...details,
            [e.name]: e.value,
        }));
    };

    const { mutateAsync, isLoading } = authStore.resetPassword();
    const token_data: any = localStorage.getItem('compare_token');
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (details.newpassword !== details.confirmpassword) {
            alert('Naujas slaptažodis ir jo pakartojimas nesutampa');
        } else if (!details.newpassword || !details.confirmpassword) {
            alert('Please fill in the field');
        } else {
            let submitData = {
                // "username": props.changePasswordData.name,
                "newPassword": details.newpassword,
                "confirmNewPassword": details.confirmpassword,
                // "token": props.changePasswordData.token
            }
            await mutateAsync(submitData, {
                async onSuccess(data) {
                    toast.success('Slaptažodis sukurtas sėkmingai', { duration: 1200 });
                    navigate('/login');
                },
                onError(__error) {
                    toast.error('Įvyko klaida', { duration: 3000 });
                },
            });
        }


    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-control mb-3">
                <Input
                    placeholder={'Username'}
                    name={'username'}
                    handleChange={handleChange}
                    value={details.username}
                />
            </div>
            <div className="input-control mb-3">
                <Input
                    placeholder={'Naujas slaptažodis'}
                    name={'newpassword'}
                    type={'password'}
                    handleChange={handleChange}
                    value={details.newpassword}
                />
            </div>
            <div className="input-control mb-3">
                <Input
                    placeholder={'Naujo slaptažodžio pakartojimas'}
                    name={'confirmpassword'}
                    type={'password'}
                    handleChange={handleChange}
                    value={details.confirmpassword}
                />
            </div>
            <div className="mb-4">
                <Button type={'submit'} disabled={isLoading}>
                    Patvirtinti
                </Button>
            </div>
        </form>
    );
}
