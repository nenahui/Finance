import React from 'react';
import { Card, Flex, Statistic } from 'antd';
import { Outlet } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <Flex gap={'large'} vertical>
      <Flex justify={'space-between'} align={'center'}>
        <Card size={'small'}>
          <Statistic title='Total' value={630} valueStyle={{ color: '#52c41a' }} suffix='KGS' />
        </Card>
      </Flex>
      <Outlet />
    </Flex>
  );
};
