export const getAssetUrl = (name: string) =>
  `${process.env.PUBLIC_URL}/assets/${name}`;

export const prepareSelectValues = (items: string[]) =>
  items.map((item: any) => ({
    name: item.name,
    value: item.code,
  }));

export const processNewData = (data: string[]) =>
  data.map((item: any) => ({
    ...item,
    hasDiscount: Math.random() < 0.5,
    bookedFor: item.availability ? 0 : Math.floor(Math.random() * 10),
  }));
