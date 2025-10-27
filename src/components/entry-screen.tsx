import React, { useEffect, useRef, useState } from "react";
import { Input, Table, Card, Form, Button, Flex } from "antd";
import Media from "./CanvasViewer";
import { useFormStore } from "../store/useFormStore";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { useShortcut } from "./useShortcut";

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
      return (
        <Form.Item
          name={["table", rowIndex, col.key]}
          rules={col.rules}
          style={{ margin: 0 }}
        >
          <Input
            className={`table_${rowIndex}_${colIndex}`}
            size="middle"
            placeholder={`Nhập ${col.title}`}
            style={{ minWidth: 100 }}
            onFocus={() => {
              focusRef.current = { row: rowIndex, col: colIndex };
            }}
          />
        </Form.Item>
      );
    },
  }));

  const focusRef = useRef({ row: 0, col: 0 });

  const numberOfColumns = tableConfig.length;
  const switchCol = (index: number, length: number) =>
    (index + length) % length;

  const focusInput = (row: number, col: number) => {
    const nextInput = document.querySelector(
      `input.table_${row}_${col}`
    ) as HTMLInputElement | null;
    if (nextInput) {
      nextInput.focus();
    }
  };

  const checkRowAvailable = (rowIndex: number): boolean => {
    const inputs = document.querySelectorAll(
      `input[class*="table_${rowIndex}_"]`
    ) as NodeListOf<HTMLInputElement>;

    return Array.from(inputs).some((input) => input.value.trim() !== "");
  };

  const deleteRows = (rows: number[]) => {
    setTableData((prev) => prev.filter((_, i) => !rows.includes(i)));

    form.setFieldValue(
      "table",
      form
        .getFieldValue("table")
        ?.filter((_: any, i: number) => !rows.includes(i))
    );
  };

  useShortcut([
    {
      title: "Delete",
      key: ["Delete"],
      callback: () => {
        console.log(focusRef.current);
        if (tableData.length <= 1) return;
        const { row } = focusRef.current;

        deleteRows([row]);

        const nextRow = Math.min(row, tableData.length - 2);
        const { col } = focusRef.current;

        focusInput(nextRow, col);
        focusRef.current = { row: nextRow, col };
      },
    },
    {
      title: "ArrowLeft",
      key: ["ArrowLeft"],
      callback: () => {
        console.log(focusRef.current);
        let { row, col } = focusRef.current;
        let rowsToDelete = [];

        const prevCol = switchCol(col - 1, numberOfColumns);

        if (prevCol === numberOfColumns - 1) {
          while (row >= 1 && !checkRowAvailable(row)) {
            rowsToDelete.push(row);
            row--;
          }

          if (rowsToDelete.length > 0) {
            deleteRows(rowsToDelete);
            row++;
          }
        }

        const newRow = prevCol === numberOfColumns - 1 ? row - 1 : row;
        if (newRow < 0) return;

        focusInput(newRow, prevCol);
      },
    },
    {
      title: "ArrowRight",
      key: ["ArrowRight"],
      callback: () => {
        console.log(focusRef.current);
        const { row, col } = focusRef.current;
        const nextCol = switchCol(col + 1, numberOfColumns);
        const nextRow = nextCol === 0 ? row + 1 : row;

        const nextInput = document.querySelector(
          `input.table_${nextRow}_${nextCol}`
        ) as HTMLInputElement | null;

        if (!nextInput) {
          handleAddRow();
          setTimeout(() => focusInput(tableData.length, 0), 0);
        } else {
          focusInput(nextRow, nextCol);
        }
      },
    },
    {
      title: "ArrowUp",
      key: ["ArrowUp"],
      callback: () => {
        const { row, col } = focusRef.current;
        if (row > 0) focusInput(row - 1, col);
      },
    },
    {
      title: "ArrowDown",
      key: ["ArrowDown"],
      callback: () => {
        const { row, col } = focusRef.current;
        const nextInput = document.querySelector(
          `input.table_${row + 1}_${col}`
        ) as HTMLInputElement | null;

        if (!nextInput) {
          handleAddRow();
          setTimeout(() => focusInput(tableData.length, col), 0);
        } else {
          focusInput(row + 1, col);
        }
      },
    },
  ]);

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
