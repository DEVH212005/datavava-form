import { Layout, theme } from 'antd';
import React from 'react';
import { FileType } from '../../constants';
import FileViewer from '../file-viewer';

const { Sider } = Layout;

interface LeftSideProps {
  fileUrl?: string;
  fileExtension?: string;
}

const { useToken } = theme;

export function LeftSide({
  fileUrl = '',
  fileExtension = FileType.PDF,
}: LeftSideProps) {
  const { token } = useToken();

  return (
    <Sider width="50%" style={{ background: token.colorBgLayout, borderRight: `1px solid ${token.colorBorder}` }}>
      <FileViewer src={fileUrl} extension={fileExtension} />
    </Sider>
  );
}
