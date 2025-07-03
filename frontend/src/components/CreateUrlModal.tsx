import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { UrlItem } from '../services/types';
import { createUrl } from '../services/services';

type CreateUrlModalProps = {
    open: boolean;
    onClose: () => void;
    onCreated: (url: UrlItem) => void;
};

type FormValues = {
    originalUrl: string;
};

export const CreateUrlModal: React.FC<CreateUrlModalProps> = ({
    open,
    onClose,
    onCreated,
}) => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        try {
            const newUrl = await createUrl(data.originalUrl);
            onCreated(newUrl);
            // to save the user if he's a guest
            if (newUrl.guestId) {
                localStorage.setItem('x-guest-id', newUrl.guestId);
              }
            reset();
            onClose();
        } catch (error) {
            console.error('Failed to create URL:', error);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={() => {
                reset();
                onClose();
            }}
            footer={null}
            title="Create Short URL"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="originalUrl"
                    control={control}
                    rules={{
                        required: 'URL is required',
                        pattern: {
                            value: /^(https?:\/\/)/,
                            message: 'Must start with http:// or https://',
                        },
                    }}
                    render={({ field }) => (
                        <Form.Item
                            validateStatus={errors.originalUrl ? 'error' : ''}
                            help={errors.originalUrl?.message}
                        >
                            <Input placeholder="Enter the original URL" {...field} />
                        </Form.Item>
                    )}
                />
                <Button type="primary" htmlType="submit" block>
                    Shorten URL
                </Button>
            </form>
        </Modal>
    );
};
