/**
 * 数学算法的工具类
 * @type {{treeFilter(*=, *): *[], combination(*): any[]}}
 */
export const mathUtil = {
  /**
   * 二维数组穷尽组合游标算法函数
   * @param list  [ ['a1','a2'], ['b1','b2']]
   * @return {any[]}  [ [ 'a1', 'b1' ], [ 'a1', 'b2' ], [ 'a2', 'b1' ], [ 'a2', 'b2' ] ]
   * 1、计算出所有组合的长度length，初始化length长度的结果数组
   * 2、初始化游标数组，长度为list.length，每一项初始化为0，用于记录每一结果项的list来源项的下标
   * 3、开始循环结果数组（循环1），根据游标数组，获取要填入结果数组的list下标，从而获取list项，然后填入结果数组
   * 4、更新游标数组，更新为循环1下一次循环所要填入的下标
   * 5、直到循环1循环结束，算法结束
   */
  combination (list) {
    const pointList = []; // 游标列表
    const maxLengthList = []; // 二维列表每一项的长度数组列表
    let length = 1;
    // 构建游标列表和二维列表每一项的长度数组列表
    for (let groupIndex = 0; groupIndex < list.length; groupIndex++) {
      const group = list[groupIndex];
      maxLengthList.push(group.length);
      length = length * group.length;
      pointList.push(0);
    }
    console.log(`${length}种组合`);
    /**
   * 游标列表更新函数
   */
    function updatePointList () {
      for (let i = pointList.length - 1; i > -1; i--) {
        if (pointList[i] < maxLengthList[i] - 1) {
          pointList[i]++;
          break;
        }

        pointList[i] = 0;
      }
    }
    const result = [];// 结果队列
    for (let resultIndex = 0; resultIndex < length; resultIndex++) {
      result[resultIndex] = [];
      // 根据游标队列定位到各项item的位置
      for (let pointIndex = 0; pointIndex < pointList.length; pointIndex++) {
        const point = pointList[pointIndex];
        result[resultIndex].push(list[pointIndex][point]);
      }
      updatePointList();
    }
    return result;
  },
  /**
   * 树形筛选
   * @param tree
   * [
   {
            id: 1,
            children:[]
        }
   ]
   * @param filterCondition   要筛选出的id列表 [221, 121];
   * @returns {[]}
   */
  treeFilter (tree, filterCondition) {
    function throughFilter (treePart) {
      const result = [];
      for (const item of treePart) {
        if (filterCondition.indexOf(item.id) !== -1) {
          result.push(item);
          continue;
        }

        if (!item.children || !item.children.length) {
          continue;
        }

        const childrenResult = throughFilter(item.children);
        if (childrenResult.length > 0) {
          item.children = childrenResult;
          result.push(item);
        }
      }
      return result;
    }
    return throughFilter(tree);
  },
  toThousand (data) {
    let value = data.toString();
    let trans = '';
    while (value.length > 3) {
      trans = ',' + value.slice(-3) + trans;
      value = value.slice(0, value.length - 3);
    }
    if (value) {
      return value + trans;
    }
  }
};
