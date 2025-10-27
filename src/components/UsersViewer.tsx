import React from "react";
import { Flex } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

interface Props {
  userName1: string;
  userName2: string;
}

export default function UserViewer({ userName1, userName2 }: Readonly<Props>) {
  return (
    <Flex gap={16} align="center" className="user-viewer">
      <div className="user-viewer__left">
        <UserOutlined /> User 1: <b>{userName1}</b>
      </div>
      <div className="user-viewer__right">
        <TeamOutlined /> User 2: <b>{userName2}</b>
      </div>
    </Flex>
  );
}
