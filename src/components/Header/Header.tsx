import { HomeOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Flex, Menu, type MenuProps, Typography } from 'antd';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: (
      <Link style={{ fontSize: 12 }} to={'/'}>
        Home
      </Link>
    ),
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link style={{ fontSize: 12 }} to={'/categories'}>
        Categories
      </Link>
    ),
    key: 'categories',
    icon: <OrderedListOutlined />,
  },
];

export const Header = () => {
  const { pathname: location } = useLocation();
  const [current, setCurrent] = useState(location === '/' ? 'home' : location.slice(1));

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Flex justify={'space-between'} align={'center'}>
      <Text className={'fz-18'}>Finance Tracker</Text>
      <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
    </Flex>
  );
};
