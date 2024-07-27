import { Button, Flex, Form, InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories } from '../../features/Categories/categoriesSlice';
import { editTransaction, fetchTransaction } from '../../features/Home/homeThunks';
import { selectIsCreating } from '../../features/NewTransaction/newTransactionSlice';
import { createTransaction } from '../../features/NewTransaction/newTransactionThunks';
import type { ApiTransaction, Category, FullTransaction } from '../../types';

interface Props {
  formType: 'create' | 'edit';
  transaction?: FullTransaction;
}

export const TransactionForm: React.FC<Props> = ({ formType, transaction }) => {
  const categories = useAppSelector(selectCategories);
  const isCreating = useAppSelector(selectIsCreating);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<ApiTransaction>();
  const [type, setType] = useState<string | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<Category[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (formType === 'edit' && transaction) {
      form.setFieldsValue({
        category: transaction.id,
        createdAt: transaction.createdAt,
        amount: transaction.amount,
      });
      setType(transaction.type);
    }
  }, [form, formType, transaction]);

  const onChange = (type: string) => {
    form.setFieldValue('category', null);
    setType(type);

    const transactions = categories.filter((cat) => cat.type === type);
    setFilteredTransactions(transactions);
  };

  const onSubmit = async (data: ApiTransaction) => {
    const date = new Date();
    if (formType === 'create') {
      await dispatch(
        createTransaction({
          ...data,
          createdAt: date.toISOString(),
        })
      );
    }

    if (formType === 'edit' && transaction) {
      await dispatch(
        editTransaction({
          ...data,
          id: transaction.id,
        })
      );
    }

    dispatch(fetchTransaction());
    navigate('/');
  };

  return (
    <Form form={form} layout={'vertical'} onFinish={onSubmit}>
      <Form.Item<ApiTransaction>
        label={'Type'}
        layout={'vertical'}
        rules={[{ required: true, message: 'Please select transaction type' }]}
      >
        <Select
          value={type}
          onChange={(type) => onChange(type)}
          placeholder={'Select type transaction'}
          options={[
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expense' },
          ]}
        />
      </Form.Item>

      <Form.Item<ApiTransaction>
        name={'category'}
        label={'Category'}
        layout={'vertical'}
        rules={[{ required: true, message: 'Please select transaction category' }]}
      >
        <Select
          notFoundContent={'Select transaction type before selecting category'}
          placeholder={'Select category transaction'}
          options={filteredTransactions?.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
      </Form.Item>

      <Form.Item<ApiTransaction>
        name={'amount'}
        label={'Amount'}
        layout={'vertical'}
        rules={[{ required: true, message: 'Please enter amount', type: 'number' }]}
      >
        <InputNumber className={'w-100'} placeholder={'Enter amount'} />
      </Form.Item>

      <Flex gap={'small'} justify={'end'}>
        <Button onClick={() => navigate('/')}>Cancel</Button>
        <Button type={'primary'} htmlType={'submit'} loading={isCreating}>
          Save
        </Button>
      </Flex>
    </Form>
  );
};
