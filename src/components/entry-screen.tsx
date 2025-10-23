import React from "react";

import { Input, Table } from "antd";
import Media from "./CanvasViewer";

const mockTableData = [
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 2, col2: "", col3: "", col4: "", col8: "" },
  { id: 3, col2: "", col3: "", col4: "", col8: "" },
  { id: 4, col2: "", col3: "", col4: "", col8: "" },
  { id: 5, col2: "", col3: "", col4: "", col8: "" },
];

export function EntryScreen() {
  const columns = [
    {
      title: "Cột 2",
      dataIndex: "col2",
      key: "col2",
      render: (value: string, record: any) => (
        <Input
          placeholder="Nhập dữ liệu..."
          defaultValue={value}
          size="small"
          style={{ minWidth: "100px" }}
        />
      ),
    },
    {
      title: "Cột 3",
      dataIndex: "col3",
      key: "col3",
      render: (value: string, record: any) => (
        <Input
          placeholder="Nhập dữ liệu..."
          defaultValue={value}
          size="small"
          style={{ minWidth: "100px" }}
        />
      ),
    },
    {
      title: "Cột 4",
      dataIndex: "col4",
      key: "col4",
      render: (value: string, record: any) => (
        <Input
          placeholder="Nhập dữ liệu..."
          defaultValue={value}
          size="small"
          style={{ minWidth: "100px" }}
        />
      ),
    },
    {
      title: "Cột 8",
      dataIndex: "col8",
      key: "col8",
      render: (value: string, record: any) => (
        <Input
          placeholder="Nhập dữ liệu..."
          defaultValue={value}
          size="small"
          style={{ minWidth: "100px" }}
        />
      ),
    },
  ];

  return (
    <div className="screen-container">
      {/* Left side - Image and SOP button */}
      <div className="screen-left">
        <div className="image-container">
          <div className="image-container__media">
            <Media src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop" />
          </div>
        </div>
      </div>

      {/* Right side - Controls and Table */}
      <div className="screen-right">
        {/* Input fields */}
        <div className="input-grid">
          <Input placeholder="Cột 1" size="large" />
          <Input placeholder="Cột 5" size="large" />
          <Input placeholder="Cột 7" size="large" />
          <Input
            placeholder="Cột 9"
            size="large"
            style={{ gridColumn: "span 2" }}
          />
          <Input placeholder="Cột 10" size="large" />
        </div>

        {/* Table with columns 2-3-4-8 and input fields */}
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={mockTableData}
            rowKey="id"
            pagination={false}
            scroll={{ x: "max-content", y: "100%" }}
            sticky
          />
        </div>
      </div>
    </div>
  );
}
