import React from "react";
import "./styles.scss";

import { Tabs } from "antd";
import ClassificationScreen from "./classification-screen";
import { CheckClassificationScreen } from "./check-classification-screen";
import { CheckEntryScreen } from "./check-entry-screen";
import EntryScreen from "./entry-screen";
export default function App() {
  const tabItems = [
    {
      key: "classification",
      label: "Phân loại",
      children: <ClassificationScreen />,
    },
    {
      key: "check-classification",
      label: "Check PL",
      children: <CheckClassificationScreen />,
    },
    {
      key: "entry",
      label: "Entry",
      children: (
        <EntryScreen
          inputConfig={[
            {
              key: "col1",
              title: "Cột 1",
              rules: [{ required: true, message: "Cột 1 bắt buộc!" }],
            },
            {
              key: "col5",
              title: "Cột 5",
              rules: [{ required: true, message: "Cột 5 bắt buộc!" }],
            },
            {
              key: "col7",
              title: "Cột 7",
              rules: [{ required: true, message: "Cột 7 bắt buộc!" }],
            },
            {
              key: "col9",
              title: "Cột 9",
              rules: [{ required: true, message: "Cột 9 bắt buộc!" }],
            },
            {
              key: "col10",
              title: "Cột 10",
              rules: [{ required: true, message: "Cột 9 bắt buộc!" }],
            },
          ]}
          tableConfig={[
            {
              key: "col2",
              title: "Cột 2",
              rules: [{ required: true, message: "Cột 2 bắt buộc!" }],
            },
            {
              key: "col3",
              title: "Cột 3",
              rules: [{ required: true, message: "Cột 3 bắt buộc!" }],
            },
            {
              key: "col4",
              title: "Cột 4",
              rules: [{ required: true, message: "Cột 4 bắt buộc!" }],
            },
            {
              key: "col8",
              title: "Cột 8",
              rules: [{ required: true, message: "Cột 8 bắt buộc!" }],
            },
          ]}
        />
      ),
    },
    {
      key: "check-entry",
      label: "Check Entry",
      children: (
        <CheckEntryScreen
          inputConfig={[
            {
              key: "col1",
              title: "Cột 1",
              rules: [{ required: true, message: "Cột 1 bắt buộc!" }],
            },
            {
              key: "col5",
              title: "Cột 5",
              rules: [{ required: true, message: "Cột 5 bắt buộc!" }],
            },
            {
              key: "col7",
              title: "Cột 7",
              rules: [{ required: true, message: "Cột 7 bắt buộc!" }],
            },
            {
              key: "col9",
              title: "Cột 9",
              rules: [{ required: true, message: "Cột 9 bắt buộc!" }],
            },
            {
              key: "col10",
              title: "Cột 10",
              rules: [{ required: true, message: "Cột 9 bắt buộc!" }],
            },
          ]}
          tableConfig={[
            {
              key: "col2",
              title: "Cột 2",
              rules: [{ required: true, message: "Cột 2 bắt buộc!" }],
            },
            {
              key: "col3",
              title: "Cột 3",
              rules: [{ required: true, message: "Cột 3 bắt buộc!" }],
            },
            {
              key: "col4",
              title: "Cột 4",
              rules: [{ required: true, message: "Cột 4 bắt buộc!" }],
            },
            {
              key: "col8",
              title: "Cột 8",
              rules: [{ required: true, message: "Cột 8 bắt buộc!" }],
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="app-container">
      <div className="app-content">
        <Tabs
          defaultActiveKey="classification"
          items={tabItems}
          className="tabs-container"
          destroyInactiveTabPane
          tabBarStyle={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            margin: 0,
            background: "transparent",
          }}
          tabPosition="top"
          size="large"
        />
      </div>
    </div>
  );
}
