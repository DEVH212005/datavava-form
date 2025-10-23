import { Layout } from 'antd';
import React from 'react';

const { Content } = Layout;

export function FormContent({ children }: any) {
  return (
    <Content
      style={{
        padding: '0px 16px',
      }}
    >
      {children}
    </Content>
  );
}
