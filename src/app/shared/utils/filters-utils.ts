export function filterByString(input, search): boolean {
  if (!search) {
    return true;
  }
  const itemName = input.toLowerCase();
  const filterName = search.toLowerCase().trim();
  return itemName.indexOf(filterName) > -1;
}
