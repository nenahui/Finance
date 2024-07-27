import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Form, Input, Modal, Popconfirm, Select, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCategoryValues,
  selectIsDeleting,
  selectIsEditing,
  selectIsOneFetching,
} from '../../features/Categories/categoriesSlice';
import {
  deleteCategory,
  editCategory,
  fetchCategories,
  fetchOneCategory,
} from '../../features/Categories/categoriesThunks';
import type { ApiCategory, Category } from '../../types';

const { Text } = Typography;

interface Props {
  category: Category;
}

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const [form] = Form.useForm();
  const [modalShow, setModalShow] = useState(false);
  const [loadingCategoryId, setLoadingCategoryId] = useState<string | null>(null);
  const isDeleting = useAppSelector(selectIsDeleting);
  const isEditing = useAppSelector(selectIsEditing);
  const categoryValues = useAppSelector(selectCategoryValues);
  const isOneFetching = useAppSelector(selectIsOneFetching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOneFetching && modalShow && loadingCategoryId === category.id) {
      form.setFieldsValue(categoryValues);
    }
  }, [category.id, categoryValues, form, isOneFetching, loadingCategoryId, modalShow]);

  const onDelete = async () => {
    setLoadingCategoryId(category.id);
    await dispatch(deleteCategory(category.id));
    setLoadingCategoryId(null);
    dispatch(fetchCategories());
  };

  const onEdit = async (data: ApiCategory) => {
    await dispatch(
      editCategory({
        ...data,
        id: category.id,
      })
    );
    await dispatch(fetchCategories());
    closeModal();
  };

  const showModal = async () => {
    setLoadingCategoryId(category.id);
    setModalShow(true);
    await dispatch(fetchOneCategory(category.id));
    setLoadingCategoryId(null);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <Card>
      <Flex justify={'space-between'} align={'center'}>
        <Text>{category.name}</Text>
        <Text type={category.type === 'expense' ? 'danger' : 'success'}>
          {category.type.charAt(0).toUpperCase() + category.type.slice(1)}
        </Text>

        <Flex gap={'large'}>
          <Button
            type={'link'}
            icon={<EditOutlined />}
            loading={loadingCategoryId === category.id && isOneFetching}
            disabled={isDeleting}
            onClick={showModal}
          />

          <Modal
            title='Edit category'
            open={modalShow}
            onCancel={closeModal}
            confirmLoading={isEditing}
            okText={'Save'}
            onOk={form.submit}
            style={{ maxWidth: 350 }}
          >
            <Form form={form} layout={'vertical'} onFinish={onEdit}>
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
                <Input placeholder='Enter category name…' />
              </Form.Item>
            </Form>
          </Modal>

          <Popconfirm
            onConfirm={onDelete}
            title='Delete the category'
            description='Are you sure to delete this category?'
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button type={'text'} danger icon={<DeleteOutlined />} disabled={isDeleting} />
          </Popconfirm>
        </Flex>
      </Flex>
    </Card>
  );
};
