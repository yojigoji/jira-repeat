export const sortByNewest = (items: string[], sortField: any) =>
  items.sort((a, b) => -a[sortField].localeCompare(b[sortField]))
