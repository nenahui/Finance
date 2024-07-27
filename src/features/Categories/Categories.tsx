import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Modal, Select, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CategoryItem } from '../../components/CategoryItem/CategoryItem';
import type { ApiCategory } from '../../types';
import { selectCategories, selectIsCreating, selectIsFetching } from './categoriesSlice';
import { createCategory, fetchCategories } from './categoriesThunks';

const { Text } = Typography;

export const Categories: React.FC = () => {
  const categories = useAppSelector(selectCategories);
  const isFetching = useAppSelector(selectIsFetching);
  const isCreating = useAppSelector(selectIsCreating);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<ApiCategory>();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onFinish = async (data: ApiCategory) => {
    await dispatch(createCategory(data));
    await dispatch(fetchCategories());
    closeModal();
  };

  const showModal = () => {
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
    form.resetFields();
  };

  const categoriesElements =
    categories.length <= 0 ? (
      <Text type={'secondary'}>The list of categories is empty</Text>
    ) : (
      categories.map((category) => <CategoryItem key={category.id} category={category} />).reverse()
    );

  return (
    <Flex vertical>
      <Flex justify={'space-between'} align={'center'}>
        <Text className={'fz-16'}>Categories</Text>
        <Button type={'primary'} icon={<PlusCircleOutlined />} onClick={showModal}>
          Add
        </Button>

        <Modal
          title='Add category'
          open={modalShow}
          onCancel={closeModal}
          confirmLoading={isCreating}
          okText={'Save'}
          onOk={form.submit}
          style={{ maxWidth: 350 }}
        >
          <Form form={form} layout={'vertical'} onFinish={onFinish}>
            <Form.Item<ApiCategory>
              layout={'vertical'}
              name={'type'}
              rules={[{ required: true, message: 'Please select a category type' }]}
            >
              <Select
                placeholder={'Category type'}
                options={[{ value: 'income' }, { value: 'expense' }]}
              />
            </Form.Item>

            <Form.Item<ApiCategory>
              name={'name'}
              label={'Category name'}
              layout={'vertical'}
              rules={[{ required: true, message: 'Please enter a category name' }]}
            >
              <Input placeholder='Enter category type…' />
            </Form.Item>
          </Form>
        </Modal>
      </Flex>

      <Flex gap={'middle'} style={{ marginTop: 20 }} vertical>
        {isFetching && <Spin className={'a-centered'} />}
        {!isFetching && categoriesElements}
      </Flex>
    </Flex>
  );
};
