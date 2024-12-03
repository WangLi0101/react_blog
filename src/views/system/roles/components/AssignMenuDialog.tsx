import { assignMenuApi, getMenuApi, getRoleMenuApi } from "@/api/system";
import { MenuItem } from "@/api/system/system";
import { buildTree, TreeNode } from "@/utils/tree";
import { message, Modal, Tree, TreeProps } from "antd";
import React, { useEffect, useState } from "react";
interface Props {
  dialogVisible: boolean;
  setDialogVisible: (visible: boolean) => void;
  roleId: number | undefined;
}

export const AssignMenuDialog: React.FC<Props> = React.memo(
  ({ dialogVisible, setDialogVisible, roleId }) => {
    const [loading, setLoading] = useState(false);
    const [menuList, setMenuList] = useState<TreeNode<MenuItem>[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
    const getMenuList = async () => {
      setLoading(true);
      const res = await getMenuApi();
      setLoading(false);
      if (res.code === 0) {
        const tree = buildTree(res.data);
        setMenuList(tree);
      }
    };

    const getMyMenuList = async () => {
      if (!roleId) return;
      const res = await getRoleMenuApi(roleId);
      if (res.code === 0) {
        const tree = buildTree(res.data);
        setCheckedKeys(tree.map((item) => item.id));
      }
    };

    useEffect(() => {
      getMenuList();
    }, []);

    useEffect(() => {
      getMyMenuList();
    }, [roleId]);

    const onCheck: TreeProps<TreeNode<MenuItem>>["onCheck"] = (checkedKeys) => {
      setCheckedKeys(checkedKeys as number[]);
    };

    const handleOk = async () => {
      if (!roleId) return;
      setLoading(true);
      const res = await assignMenuApi({
        roleId,
        menuIds: checkedKeys,
      });
      setLoading(false);
      if (res.code === 0) {
        message.success("分配成功");
        setDialogVisible(false);
      }
    };
    const handleCancel = () => {
      setDialogVisible(false);
    };

    return (
      <Modal
        title="分配菜单"
        open={dialogVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <div className="content">
          <Tree<TreeNode<MenuItem>>
            fieldNames={{ title: "title", key: "id", children: "children" }}
            checkable
            treeData={menuList}
            defaultExpandAll={true}
            checkedKeys={checkedKeys}
            onCheck={onCheck}
          />
        </div>
      </Modal>
    );
  }
);
