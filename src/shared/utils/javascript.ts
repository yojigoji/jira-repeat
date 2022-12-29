export const moveItemWithinArray = (arr: any[], item: any, newIndex: number) => {
  const arrClone = [...arr];
  const oldIndex = arrClone.indexOf(item);
  arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
  return arrClone;
};

export const insertItemIntoArray = (arr: any[], item: any, index: number) => {
  const arrClone = [...arr];
  arrClone.splice(index, 0, item);
  return arrClone;
};

export const sortByNewest = (items: string[], sortField: any) =>
  items.sort((a, b) => -a[sortField].localeCompare(b[sortField]))
