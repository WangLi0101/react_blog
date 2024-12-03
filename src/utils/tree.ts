// 以为数组转换为多维数组 根据parentId转换
export type TreeNode<T extends { id: number; parentId: number | null }> = T & {
  children?: TreeNode<T>[];
};
export function buildTree<T extends { id: number; parentId: number | null }>(
  items: T[]
): TreeNode<T>[] {
  const itemMap: Map<number, TreeNode<T>> = new Map();
  const tree: TreeNode<T>[] = [];

  // 初始化哈希表
  items.forEach((item) => {
    itemMap.set(item.id, { ...item, children: [] });
  });

  // 构建树
  items.forEach((item) => {
    const treeNode = itemMap.get(item.id)!;
    if (treeNode.parentId === null || treeNode.parentId === undefined) {
      // 根节点
      tree.push(treeNode);
    } else {
      const parentNode = itemMap.get(treeNode.parentId);
      if (parentNode) {
        parentNode.children!.push(treeNode);
      } else {
        // 处理找不到父节点的情况（可选）
        console.warn(
          `父节点未找到：id=${treeNode.parentId}，当前节点id=${treeNode.id}`
        );
        tree.push(treeNode); // 或者选择其他处理方式
      }
    }
  });

  // 移除空的 children 数组
  const removeEmptyChildren = (nodes: TreeNode<T>[]) => {
    nodes.forEach((node) => {
      if (node.children && node.children.length === 0) {
        delete node.children;
      } else if (node.children) {
        removeEmptyChildren(node.children);
      }
    });
  };

  removeEmptyChildren(tree);

  return tree;
}
