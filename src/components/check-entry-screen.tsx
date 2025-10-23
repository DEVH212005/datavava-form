import React, { useEffect, useRef, useState } from "react";

import { Input, Table, Card } from "antd";
import Media from "./CanvasViewer";

const mockTableData = [
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
  { id: 1, col2: "", col3: "", col4: "", col8: "" },
];

export function CheckEntryScreen() {
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
  const containerRef = useRef<HTMLDivElement>(null);

  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setTableHeight(containerRef.current.clientHeight - 50);
    }
  }, []);

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
        {/* User names display */}
        <Card size="small" className="user-info-card">
          <div className="flex items-center gap-4">
            <div className="flex gap-4 flex-1">
              <div className="flex gap-2">
                <span style={{ color: "var(--muted-foreground)" }}>
                  User 1:
                </span>
                <span>Phạm Văn C</span>
              </div>
              <div className="flex gap-2">
                <span style={{ color: "var(--muted-foreground)" }}>
                  User 2:
                </span>
                <span>Lê Thị D</span>
              </div>
            </div>
          </div>
        </Card>

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
              scroll={{ x: "max-content", y: '100%' }}
              sticky
            />
        </div>
      </div>
    </div>
  );
}
