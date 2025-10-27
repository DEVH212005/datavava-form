import React, { useEffect, useState } from "react";
import { Input, Table, Form } from "antd";
import Media from "./CanvasViewer";
import { useFormStore } from "../store/useFormStore";
import UserViewer from "./UsersViewer";

interface ColumnConfig {
  key: string;
  title: string;
  rules?: any[];
}

interface CheckEntryScreenProps {
  inputConfig: ColumnConfig[];
  tableConfig: ColumnConfig[];
}

const user1 = {
  id: "user1",
  name: "Phạm Văn C",
  inputData: {
    col1: "A-101",
    col5: "Thùng giấy",
    col7: "Đã kiểm tra",
    col9: "2025-10-27",
    col10: "Phạm Văn C",
  },
  tableData: [
    { col2: "SP-001", col3: "Bánh quy", col4: "500g", col8: "Kho chính" },
    { col2: "SP-002", col3: "Sữa tươi", col4: "1L", col8: "Kho phụ" },
  ],
};

const user2 = {
  id: "user2",
  name: "Lê Thị D",
  inputData: {
    col1: "A-202",
    col5: "Thùng nhựa",
    col7: "Chưa kiểm tra",
    col9: "2025-10-27",
    col10: "Lê Thị D",
  },
  tableData: [
    { col2: "SP-010", col3: "Bánh mì", col4: "300g", col8: "Kho A" },
    { col2: "SP-011", col3: "Nước cam", col4: "500ml", col8: "Kho B" },
  ],
};

interface TableColumns {
  col2: string;
  col3: string;
  col4: string;
  col8: string;
}

export function CheckEntryScreen({
  inputConfig,
  tableConfig,
}: CheckEntryScreenProps) {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<TableColumns[]>([]);
  const [editedInputs, setEditedInputs] = useState<Set<string>>(new Set());
  const [editedCells, setEditedCells] = useState<Set<string>>(new Set());
  const [activeUser, setActiveUser] = useState<"user1" | "user2">("user1");
  const { setForm } = useFormStore();

  useEffect(() => {
    setForm(form);
    form.setFieldsValue({
      inputs: user1.inputData,
      table: user1.tableData,
    });
    setTableData(user1.tableData);
    return () => setForm(null);
  }, [form, setForm]);

  const handleAddRow = () => {
    setTableData((prev) => [
      ...prev,
      { col2: "", col3: "", col4: "", col8: "" },
    ]);
  };

  const handleInputChange = (key: string) => {
    setEditedInputs((prev) => new Set(prev).add(key));
  };

  const handleCellChange = (rowIndex: number, key: string) => {
    const cellKey = `${rowIndex}-${key}`;
    setEditedCells((prev) => new Set(prev).add(cellKey));
  };

  const handleRightClickOnInput = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (editedInputs.has(key)) return;

    const currentValue = form.getFieldValue(["inputs", key]);
    const newValue =
      currentValue === user1.inputData[key as keyof typeof user1.inputData]
        ? user2.inputData[key as keyof typeof user1.inputData]
        : user1.inputData[key as keyof typeof user1.inputData];

    form.setFieldValue(["inputs", key], newValue);
  };

  function getTableValue<T extends Record<string, any>>(
    source: T[],
    rowIndex: number,
    colKey: keyof T
  ): string {
    if (!source || source.length === 0) return "";
    return source[rowIndex]?.[colKey] ?? source[0]?.[colKey] ?? "";
  }

  const handleHeaderClick = (colKey: string, e: React.MouseEvent) => {
    e.preventDefault();

    const nextUser = activeUser === "user1" ? "user2" : "user1";
    const source = nextUser === "user1" ? user1 : user2;
    setTableData((prev) =>
      prev.map((row, rowIndex) => {
        const cellKey = `${rowIndex}-${colKey}`;
        if (editedCells.has(cellKey)) return row; // skip edited
        return {
          ...row,
          [colKey]: getTableValue(source.tableData, rowIndex, colKey as any),
        };
      })
    );

    setActiveUser(nextUser);
    form.setFieldValue(
      "table",
      form.getFieldValue("table").map((row: any, rowIndex: number) => {
        const cellKey = `${rowIndex}-${colKey}`;
        if (editedCells.has(cellKey)) return row;
        return {
          ...row,
          [colKey]: getTableValue(source.tableData, rowIndex, colKey as any),
        };
      })
    );
  };

  // --- keep your render logic ---
  const columns = tableConfig.map((col, colIndex) => ({
    title: (
      <div
        style={{ cursor: "pointer" }}
        onContextMenu={(e) => handleHeaderClick(col.key, e)}
      >
        {col.title}
      </div>
    ),
    dataIndex: col.key,
    render: (_: any, record: any, rowIndex: number) => {
      const isLastRow = rowIndex === tableData.length - 1;
      const isLastColumn = colIndex === tableConfig.length - 1;
      return (
        <Form.Item
          name={["table", rowIndex, col.key]}
          rules={col.rules}
          style={{ margin: 0 }}
          validateTrigger={false}
        >
          <Input
            size="middle"
            placeholder={`Nhập ${col.title}`}
            style={{ minWidth: 100 }}
            onChange={() => handleCellChange(rowIndex, col.key)}
            onKeyDown={(e) => {
              if (
                isLastRow &&
                isLastColumn &&
                (e.key === "Tab" || e.key === "Enter")
              ) {
                e.preventDefault();
                handleAddRow();
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
      <div className="screen-left">
        <div className="image-container">
          <div className="image-container__media">
            <Media src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop" />
          </div>
        </div>
      </div>

      <div className="screen-right">
        <UserViewer userName1={user1.name} userName2={user2.name} />

        <Form form={form} layout="vertical">
          <div className="input-grid">
            {inputConfig.map((input) => (
              <Form.Item
                key={input.key}
                name={["inputs", input.key]}
                rules={input.rules}
                validateTrigger={false}
              >
                <Input
                  placeholder={input.title}
                  size="middle"
                  onChange={() => handleInputChange(input.key)}
                  onContextMenu={(e) => handleRightClickOnInput(input.key, e)}
                />
              </Form.Item>
            ))}
          </div>

          <div className="table-container">
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              scroll={{ x: "max-content", y: "100%" }}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
