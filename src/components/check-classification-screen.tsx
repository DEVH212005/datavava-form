import React, { useEffect, useMemo, useRef, useState } from "react";

import { Input, Table, Card, InputRef } from "antd";
import Media from "./CanvasViewer";

const mockData = [
  { id: 1, code: "PL001", name: "Loại A", status: "Hoạt động" },
  { id: 2, code: "PL002", name: "Loại B", status: "Hoạt động" },
  { id: 3, code: "PL003", name: "Loại C", status: "Tạm dừng" },
  { id: 4, code: "PL004", name: "Loại D", status: "Hoạt động" },
  { id: 5, code: "PL005", name: "Loại E", status: "Hoạt động" },
];

export function CheckClassificationScreen() {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const filteredData = useMemo(() => {
    if (!searchValue) return mockData;

    const lower = searchValue.toLowerCase();
    return mockData.filter((item) => item.code.toLowerCase().includes(lower));
  }, [searchValue]);

  useEffect(() => {
    inputRef.current?.input?.addEventListener("keyup", console.log);
  }, []);

  const columns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 200,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
        {/* User names display */}
        <Card size="small" className="user-info-card">
          <div className="flex items-center gap-4">
            <div className="flex gap-4 flex-1">
              <div className="flex gap-2">
                <span style={{ color: "var(--muted-foreground)" }}>
                  User 1:
                </span>
                <span>Nguyễn Văn A</span>
              </div>
              <div className="flex gap-2">
                <span style={{ color: "var(--muted-foreground)" }}>
                  User 2:
                </span>
                <span>Trần Thị B</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Input field */}
        <div className="data-input">
          <Input ref={inputRef} placeholder="Nhập dữ liệu..." size="large" />
        </div>

        {/* Table */}
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={false}
            size="middle"
            rowClassName={(record) =>
              record.id === selectedRow?.id ? "selected-row" : ""
            }
            onRow={(record) => ({
              onClick: () => setSelectedRow(record),
            })}
            scroll={{ x: "max-content", y: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
