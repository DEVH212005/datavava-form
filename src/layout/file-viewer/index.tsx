import { Flex, Image, Typography, theme } from 'antd';
import React, { useCallback } from 'react';
import { FileType } from '../../constants';
import { useTranslation } from 'react-i18next';

interface FileViewerProps {
  src: string;
  extension?: string;
}

const { useToken } = theme;
const { Text } = Typography;

export default function FileViewer({
  src,
  extension = FileType.PDF,
}: FileViewerProps) {
  const { token } = useToken();
  const { t } = useTranslation();

  const handleIframeError = useCallback((err: any) => {
    console.log('[FileViewer] Error', err);
  }, []);

  if (!src) {
    return (
      <Flex align="center" justify="center" style={{ height: '100%' }}>
        <Text>{t('description.noPdfForPreview')}</Text>
      </Flex>
    );
  }

  if (extension === FileType.PDF) {
    return (
      <iframe
        src={src}
        title="PDF Preview"
        width="100%"
        height="100%"
        onError={handleIframeError}
      />
    );
  }

  return (
    <Image
      width="100%"
      height="100%"
      src={src}
      style={{ border: `1px ${token.colorBorder} solid` }}
    />
  );
}
