import { Layout, theme } from "antd";
import React from "react";
import { useForm } from "../../hooks/useForm";
import { FormContent, FormFooter } from "../../layout";
import "./styles.scss";
import Form from "../../components/FormTable";

const { Content } = Layout;
const { useToken } = theme;

export function MainWrapper() {
  const { onCompleteTask, dataTable, onChange, disabled } = useForm();
  const { token } = useToken();

  return (
    <Layout className="main-wrapper">
      <Content >
        <Layout style={{ height: "100%", background: `${token.colorBgBase}` }}>
          <FormContent>
            <Form />
          </FormContent>
        </Layout>
      </Content>

      <FormFooter onComplete={onCompleteTask} />
    </Layout>
  );
}
