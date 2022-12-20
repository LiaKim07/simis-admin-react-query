import React, { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { authStore } from '../../../../store/auth.store';
import { ValueType } from '../../../../types';
import { ChangePasswordDto } from '../../../../types/services/auth.types';
import Input from '../../../Atoms/Form/Input';
import Button from '../../../Molecules/Button/Button';

export default function ChangingPasswordForm() {
    const navigate = useNavigate();

    const [details, setDetails] = useState<ChangePasswordDto>({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleChange = (e: ValueType) => {
        setDetails((details) => ({
            ...details,
            [e.name]: e.value,
        }));
    };

    const { mutateAsync, isLoading } = authStore.passwordChange();
    const token_data: any = localStorage.getItem('compare_token');
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (details.newPassword !== details.confirmNewPassword) {
            alert('Naujas slaptažodis ir jo pakartojimas nesutampa');
        } else {
            await mutateAsync(details, {
                async onSuccess(data) {
                    toast.success('Slaptažodis pakeistas sėkmingai', { duration: 1200 });
                    navigate('/login');
                },
                onError(__error) {
                    console.log('erro data', __error)
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
                    placeholder={'Current Password'}
                    name={'currentPassword'}
                    type={'password'}
                    handleChange={handleChange}
                    value={details.currentPassword}
                />
            </div>
            <div className="input-control mb-3">
                <Input
                    placeholder={'New Password'}
                    name={'newPassword'}
                    type={'password'}
                    handleChange={handleChange}
                    value={details.newPassword}
                />
            </div>
            <div className="input-control mb-3">
                <Input
                    placeholder={'Confirm Password'}
                    name={'confirmNewPassword'}
                    type={'password'}
                    handleChange={handleChange}
                    value={details.confirmNewPassword}
                />
            </div>
            <div className="text-center mb-3">
                <Link to={'/dashboard/employees'}>
                    <span className="f-password">Persigalvojote?</span>
                </Link>
            </div>
            <div className="mb-4">
                <Button type={'submit'} disabled={isLoading}>
                    Change password
                </Button>
            </div>
        </form>
    );
}
