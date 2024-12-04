import { deleteMenuApi, getMenuApi } from "@/api/system";
import { MenuItem } from "@/api/system/system";
import { Button, message, Modal, Table, Tag } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import AddMenuDialog from "./components/AddMenuDialog";
import { buildTree, TreeNode } from "@/utils/tree";
import { Icon } from "@iconify/react";
import { ColumnType } from "antd/es/table";
export const MenuPage: React.FC = () => {
  const [menuList, setMenuList] = useState<TreeNode<MenuItem>[]>([]);
  const [loading, setLoading] = useState(false);
  const [addMenuDialogVisible, setAddMenuDialogVisible] = useState(false);
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);

  const getMenuList = useCallback(async () => {
    setLoading(true);
    const res = await getMenuApi();
    setLoading(false);
    if (res.code === 0) {
      const tree = buildTree(res.data);
      setMenuList(tree);
    }
  }, []);

  useEffect(() => {
    getMenuList();
  }, [getMenuList]);

  const columns: ColumnType<TreeNode<MenuItem>>[] = [
    {
      title: "名称",
      dataIndex: "title",
    },
    {
      title: "路径",
      dataIndex: "path",
    },
    {
      title: "排序",
      dataIndex: "sort",
    },
    {
      title: "图标",
      dataIndex: "icon",
      render: (_: string, record: MenuItem) => (
        <Icon icon={record.icon} style={{ fontSize: "24px" }} />
      ),
    },
    {
      title: "隐藏",
      dataIndex: "isHidden",
      render: (_: string, record: MenuItem) => (
        <Tag color={record.isHidden ? "red" : "green"}>
          {record.isHidden ? "隐藏" : "显示"}
        </Tag>
      ),
    },
    {
      title: "操作",
      dataIndex: "action",
      align: "center",
      width: 250,
      render: (_: string, record: MenuItem) => (
        <>
          <Button onClick={() => add(record)} type="link">
            新增
          </Button>
          <Button onClick={() => edit(record)} type="link">
            编辑
          </Button>
          <Button onClick={() => del(record)} type="link">
            删除
          </Button>
        </>
      ),
    },
  ];

  const add = (item?: MenuItem) => {
    if (item) {
      setParentId(item.id);
    }
    setMenuItem(null);
    setAddMenuDialogVisible(true);
  };

  const edit = (item: MenuItem) => {
    setMenuItem(item);
    setAddMenuDialogVisible(true);
  };

  const del = (item: MenuItem) => {
    Modal.confirm({
      title: "确定删除吗？",
      onOk: async () => {
        const res = await deleteMenuApi(item.id);
        if (res.code === 0) {
          message.success("删除成功");
          getMenuList();
        }
      },
    });
  };
  return (
    <div>
      <div className="menu-page">
        <div className="operator mb-5 flex flex-row-reverse">
          <Button type="primary" onClick={() => add()}>
            新增
          </Button>
        </div>
        <Table<TreeNode<MenuItem>>
          rowKey={(record) => record.id}
          dataSource={menuList}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </div>

      <AddMenuDialog
        visible={addMenuDialogVisible}
        setVisible={setAddMenuDialogVisible}
        getMenuList={getMenuList}
        parentId={parentId}
        menuItem={menuItem}
      />
    </div>
  );
};
export default MenuPage;
