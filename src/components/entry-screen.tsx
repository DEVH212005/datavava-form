import React, { useEffect, useState } from "react";
import { Input, Table, Card, Form, Button, Flex } from "antd";
import Media from "./CanvasViewer";
import { useFormStore } from "../store/useFormStore";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

interface ColumnConfig {
  key: string;
  title: string;
  rules?: any[]; // antd-style validation rules
}

interface CheckEntryScreenProps {
  inputConfig: ColumnConfig[]; // 1,5,6,7,9,10
  tableConfig: ColumnConfig[]; // 2,3,4,8
}

export default function EntryScreen({
  inputConfig,
  tableConfig,
}: CheckEntryScreenProps) {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([{ id: 1 }]);

  const { setForm } = useFormStore();

  useEffect(() => {
    setForm(form);
    return () => setForm(null); // cleanup on unmount
  }, [form, setForm]);

  const handleAddRow = () => {
    setTableData((prev) => [...prev, { id: prev.length + 1 }]);
  };

  // --- Dynamic table columns ---
  const columns = tableConfig.map((col, colIndex) => ({
    title: col.title,
    dataIndex: col.key,
    key: col.key,
    render: (_: any, record: any, rowIndex: number) => {
      const isLastRow = rowIndex === tableData.length - 1;
      const isLastColumn = colIndex === tableConfig.length - 1;

      return (
        <Form.Item
          name={["table", rowIndex, col.key]}
          rules={col.rules}
          style={{ margin: 0 }}
        >
          <Input
            size="middle"
            placeholder={`Nhập ${col.title}`}
            style={{ minWidth: 100 }}
            onKeyDown={(e) => {
              if (
                isLastRow &&
                isLastColumn &&
                (e.key === "Tab" || e.key === "Enter")
              ) {
                e.preventDefault(); // prevent default tab out of table
                handleAddRow();
                // small delay to let DOM update, then focus next cell
                setTimeout(() => {
                  const nextInput = document.querySelector(
                    `input[id=table_${tableData.length}_${tableConfig[0].key}]`
                  ) as HTMLInputElement;
                  nextInput?.focus();
                }, 50);
              }
            }}
          />
        </Form.Item>
      );
    },
  }));

  return (
    <div className="screen-container">
      {/* Left side */}
      <div className="screen-left">
        <div className="image-container">
          <div className="image-container__media">
            <Media src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop" />
          </div>
        </div>
      </div>

      {/* Right side (form only here) */}
      <div className="screen-right">
        {/* Wrap only the right section inside Form */}
        <Form form={form} layout="vertical">
          {/* Inputs (1,5,6,7,9,10) */}
          <div className="input-grid">
            {inputConfig.map((input) => (
              <Form.Item
                key={input.key}
                name={["inputs", input.key]}
                rules={input.rules}
              >
                <Input placeholder={input.title} size="middle" />
              </Form.Item>
            ))}
          </div>

          {/* Table (2,3,4,8) */}
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={tableData}
              rowKey="id"
              pagination={false}
              scroll={{ x: "max-content", y: "100%" }}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
