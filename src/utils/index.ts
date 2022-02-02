export const getAssetUrl = (name: string) =>
  `${process.env.PUBLIC_URL}/assets/${name}`;

export const prepareSelectValues = (items: string[]) =>
  items.map((item: any) => ({
    name: item.name,
    value: item.name.toLowerCase().split(' ').join('_'),
  }));
