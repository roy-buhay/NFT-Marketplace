export function sortItems<T>(data: Array<T>, keyword: keyof T) {
  if (data === null) return []

  const sortedData = [...data].sort((a, b) => {
    if (a[keyword] > b[keyword]) {
      return 1;
    }
    if (a[keyword] < b[keyword]) {
      return -1;
    }
    return 0;
  });
  
  return sortedData;
}
