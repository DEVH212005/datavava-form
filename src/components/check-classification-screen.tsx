import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, Table, InputRef } from "antd";
import Media from "./CanvasViewer";
import UserViewer from "./UsersViewer";

const mockData = [
  { id: 1, code: "PL001", name: "Loại A", status: "Hoạt động" },
  { id: 2, code: "PL002", name: "Loại B", status: "Hoạt động" },
  { id: 3, code: "PL003", name: "Loại C", status: "Tạm dừng" },
  { id: 4, code: "PL004", name: "Loại D", status: "Hoạt động" },
  { id: 5, code: "PL005", name: "Loại E", status: "Hoạt động" },
];

const mockDataUser1 = { id: 2, code: "PL002", name: "Loại B", status: "Hoạt động" };
const mockDataUser2 = { id: 4, code: "PL004", name: "Loại D", status: "Hoạt động" };

export function CheckClassificationScreen() {
  const [activeUser, setActiveUser] = useState<"userLeft" | "userRight">("userLeft");
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const filteredData = useMemo(() => {
    if (!searchValue) return mockData;
    const lower = searchValue.toLowerCase();
    return mockData.filter((item) => item.code.toLowerCase().includes(lower));
  }, [searchValue]);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent browser context menu
    setActiveUser((prev) => (prev === "userLeft" ? "userRight" : "userLeft"));
  };

  const columns = [
    { title: "Mã", dataIndex: "code", key: "code", width: 200 },
    { title: "Tên", dataIndex: "name", key: "name", width: 200 },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
  ];

  return (
    <div className="screen-container" onContextMenu={handleRightClick}>
      {/* Left section */}
      <div className="screen-left">
        <div className="image-container">
          <div className="image-container__media">
            <Media src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop" />
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="screen-right">
        <UserViewer
          userName1="Phạm Văn C"
          userName2="Lê Thị D"
        />

        <div className="data-input">
          <Input
            placeholder="Nhập dữ liệu..."
            size="large"
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
            rowClassName={(record) => {
              if (selectedRow?.id === record.id) return "selected-row";
              if (activeUser==="userLeft" && record.id === mockDataUser1.id) return "selected-row__userleft";
              if (activeUser==="userRight" && record.id === mockDataUser2.id) return "selected-row__userright";
              return "";
            }}
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
