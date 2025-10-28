import { assignMenuApi, getMenuApi, getRoleMenuApi } from "@/api/system";
import { MenuItem } from "@/api/system/system";
import { buildTree, TreeNode } from "@/utils/tree";
import { message, Modal, Tree, TreeProps } from "antd";
import React, { useEffect, useRef, useState } from "react";
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
    const submitKeys = useRef<number[]>([]);
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
        setCheckedKeys(res.data.filter((el) => el.parentId).map((el) => el.id));
      }
    };

    useEffect(() => {
      getMenuList();
    }, []);

    useEffect(() => {
      if (dialogVisible) {
        getMyMenuList();
      }
    }, [dialogVisible]);

    const onCheck: TreeProps<TreeNode<MenuItem>>["onCheck"] = (
      checkedKeys,
      info
    ) => {
      if (!Array.isArray(checkedKeys)) return;

      setCheckedKeys(checkedKeys.map(Number));
      const set = new Set<number>();
      info.checkedNodes.forEach((el) => {
        set.add(el.id);
        if (el.parentId) {
          set.add(el.parentId);
        }
      });
      submitKeys.current = [...set];
    };

    const handleOk = async () => {
      if (!roleId) return;
      setLoading(true);
      const res = await assignMenuApi({
        roleId,
        menuIds: submitKeys.current,
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
        title="分配菜单权限"
        open={dialogVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        className="modern-modal"
        width={600}
        centered
      >
        <div className="content">
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
              💡 操作提示
            </p>
            <p className="text-xs text-blue-500 dark:text-blue-300">
              选择菜单项将自动包含其父级菜单，确保权限结构的完整性
            </p>
          </div>
          <Tree<TreeNode<MenuItem>>
            fieldNames={{ title: "title", key: "id", children: "children" }}
            checkable
            treeData={menuList}
            defaultExpandAll={true}
            checkedKeys={checkedKeys}
            onCheck={onCheck}
            className="custom-tree"
          />
        </div>
      </Modal>
    );
  }
);
