const dataSet = ['data'];

export const DIALOG = {
  OPEN: 'DIALOG.OPEN_DIALOG',
  CLOSE: 'DIALOG.CLOSE_DIALOG',
  CLOSE_ALL: 'DIALOG.CLOSE_ALL_DIALOGS',
};

export const fetchData = async () => {
  const data = await Promise.all(
    dataSet.map(async (item: string) => {
      const content = await import(`../data/${item}.json`);
      return content.default;
    }),
  ).catch((err) => {
    throw new Error(err.message);
  });

  return data;
};
