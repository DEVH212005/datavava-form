import React from "react";
import "./styles.scss";

import { Tabs } from "antd";
import ClassificationScreen from "./classification-screen";
import { CheckClassificationScreen } from "./check-classification-screen";
import { EntryScreen } from "./entry-screen";
import { CheckEntryScreen } from "./check-entry-screen";
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
      children: <EntryScreen />,
    },
    {
      key: "check-entry",
      label: "Check Entry",
      children: <CheckEntryScreen />,
    },
  ];

  return (
    <div className="app-container">
      <div className="app-content">
        <Tabs
          defaultActiveKey="classification"
          items={tabItems}
          className="tabs-container"
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
