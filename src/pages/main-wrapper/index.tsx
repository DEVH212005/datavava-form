import { Layout, theme } from "antd";
import React from "react";
import { useForm } from "../../hooks/useForm";
import { FormContent, FormFooter } from "../../layout";
import "./styles.scss";
import Form from "../../components/FormTable";
import { useFormStore } from "../../store/useFormStore";

const { Content } = Layout;
const { useToken } = theme;

export function MainWrapper() {
  const { onFinish } = useForm();
  const { getForm } = useFormStore();

  const { token } = useToken();

  const handleSubmit = async () => {
    const form = getForm();
    if (!form) return console.warn("Form not ready yet");

    try {
      const values = await form.validateFields();
      console.log("Submitted:", values);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Layout className="main-wrapper">
      <Content>
        <Layout style={{ height: "100%", background: `${token.colorBgBase}` }}>
          <FormContent>
            <Form />
          </FormContent>
        </Layout>
      </Content>

      <FormFooter onComplete={handleSubmit} />
    </Layout>
  );
}
