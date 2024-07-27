import { OrderedListOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Flex, Menu, type MenuProps, Typography } from 'antd';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: (
      <Link style={{ fontSize: 12 }} to={'/categories'}>
        Categories
      </Link>
    ),
    key: 'categories',
    icon: <OrderedListOutlined />,
  },
  {
    label: (
      <Link style={{ fontSize: 12 }} to={'/add'}>
        Add
      </Link>
    ),
    key: 'add',
    icon: <PlusCircleOutlined />,
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const { pathname: location } = useLocation();
  const [current, setCurrent] = useState(location.slice(1));

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const navigateHome = () => {
    setCurrent('');
    navigate('/');
  };

  return (
    <Flex justify={'space-between'} align={'center'}>
      <Text className={'fz-22 logo'} onClick={navigateHome}>
        Finance Tracker
      </Text>
      <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
    </Flex>
  );
};
