import {
  Button,
  Col,
  Layout,
  Row,
  theme
} from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormState } from '../../store/useFormState';
import './styles.scss';

const { Footer } = Layout;
const { useToken } = theme;

interface FormFooterProps {
  onComplete?: () => void;
}

export function FormFooter({
  onComplete,
}: FormFooterProps) {
  const { t } = useTranslation();
  const { token } = useToken();
  const { disabled } = useFormState();

  return (
    <Footer
      className="form-footer"
      style={{ borderTop: `1px solid ${token.colorBorder}`}}
    >
      <Row
        className="form-row"
        justify="end"
        style={{
          background: token.colorBgBase,
        }}
      >
        <Col>
          <Button
            onClick={onComplete}
            type="primary"
            size="large"
            disabled={disabled}
            tabIndex={-1}
          >
            {t('action.completeTask')}
          </Button>
        </Col>
      </Row>
    </Footer>
  );
}
