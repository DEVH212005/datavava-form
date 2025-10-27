import React, { useState, useMemo } from "react";
import { Input, Table } from "antd";
import Media from "./CanvasViewer";

const mockData = [
  { id: 1, code: "PL001", name: "Loại A", status: "Hoạt động" },
  { id: 2, code: "PL002", name: "Loại B", status: "Hoạt động" },
  { id: 3, code: "PL003", name: "Loại C", status: "Tạm dừng" },
  { id: 4, code: "PL004", name: "Loại D", status: "Hoạt động" },
  { id: 5, code: "PL005", name: "Loại E", status: "Hoạt động" },
];

export default function ClassificationScreen() {
  const [searchValue, setSearchValue] = useState("");

  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const filteredData = useMemo(() => {
    if (!searchValue) return mockData;

    const lower = searchValue.toLowerCase();
    return mockData.filter((item) => item.name.toLowerCase().includes(lower));
  }, [searchValue]);

  const columns = [
    { title: "Mã", dataIndex: "code", key: "code" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
  ];

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

      {/* Right side */}
      <div className="screen-right">
        <div className="data-input">
          <Input
            placeholder="Nhập mã loại..."
            size="large"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

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
              onClick: () => {
                setSelectedRow(record);
                setSearchValue(record.name);
              },
            })}
            scroll={{ x: "max-content", y: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
