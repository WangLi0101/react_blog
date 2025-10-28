import { deleteMenuApi, getMenuApi } from "@/api/system";
import { MenuItem } from "@/api/system/system";
import { Button, message, Modal, Table, Tag, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { AddMenuDialog } from "./components/AddMenuDialog";
import { Icon } from "@iconify/react";
import { buildTree, TreeNode } from "@/utils/tree";
import { MenuOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const MenuPage: React.FC = () => {
  const [menuList, setMenuList] = useState<TreeNode<MenuItem>[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [parentId, setParentId] = useState<number | null>(null);
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);

  const columns: ColumnsType<TreeNode<MenuItem>> = [
    {
      title: "菜单名称",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "路径",
      dataIndex: "path",
      key: "path",
      width: 200,
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
      width: 80,
      align: "center",
    },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon",
      width: 80,
      align: "center",
      render: (icon: string) => {
        return icon ? (
          <Icon icon={icon} width={20} height={20} />
        ) : (
          <span>-</span>
        );
      },
    },
    {
      title: "显示",
      dataIndex: "isHidden",
      key: "isHidden",
      width: 80,
      align: "center",
      render: (isHidden: boolean) => {
        return (
          <Tag color={!isHidden ? "green" : "red"}>
            {!isHidden ? "显示" : "隐藏"}
          </Tag>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      align: "center",
      render: (record: TreeNode<MenuItem>) => {
        return (
          <Space size="small">
            <Button
              type="link"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => add(record)}
            >
              新增
            </Button>
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => edit(record)}
            >
              编辑
            </Button>
            <Button
              type="link"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => del(record)}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const getMenuList = async () => {
    setLoading(true);
    const res = await getMenuApi();
    setLoading(false);
    if (res.code === 0) {
      const tree = buildTree(res.data);
      setMenuList(tree);
    }
  };

  const add = (record: TreeNode<MenuItem>) => {
    setParentId(record.id);
    setMenuItem(null);
    setVisible(true);
  };

  const edit = (record: TreeNode<MenuItem>) => {
    setParentId(null);
    setMenuItem(record);
    setVisible(true);
  };

  const del = (record: TreeNode<MenuItem>) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除菜单 "${record.title}" 吗？`,
      onOk: async () => {
        const res = await deleteMenuApi(record.id);
        if (res.code === 0) {
          message.success("删除成功");
          getMenuList();
        }
      },
    });
  };

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <div className="p-6 bg-theme-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* 操作区域 */}
        <div className="flex justify-end mb-6">
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => {
              setParentId(null);
              setMenuItem(null);
              setVisible(true);
            }}
          >
            新增
          </Button>
        </div>

        {/* 表格区域 */}
        <div className="bg-theme-bg border border-theme-border rounded-xl overflow-hidden">
          <Table
            rowKey={(record) => record.id}
            dataSource={menuList}
            columns={columns}
            loading={loading}
            pagination={false}
          />
        </div>

        <AddMenuDialog
          visible={visible}
          setVisible={setVisible}
          getMenuList={getMenuList}
          parentId={parentId}
          menuItem={menuItem}
        />
      </div>
    </div>
  );
};

export default MenuPage;
