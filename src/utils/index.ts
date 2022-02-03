import dayjs from 'dayjs';

export const getAssetUrl = (name: string) =>
  `${process.env.PUBLIC_URL}/assets/${name}`;

export const prepareSelectValues = (items: string[]) =>
  items.map((item: any) => ({
    name: `${item.name} - ${item.code}`,
    value: item.code,
  }));

export const processNewData = (data: string[]) =>
  data.map((item: any) => ({
    ...item,
    hasDiscount: Math.random() < 0.5,
    bookedFor: item.availability ? 0 : Math.floor(Math.random() * 10),
  }));

interface ITest {
  hasDiscount: boolean;
  minimum_rent_period: number;
  price: number;
  startDate: Date;
  endDate: Date;
}

export const totalDaysCalculator = (startDate: Date, endDate: Date) =>
  dayjs(endDate).diff(dayjs(startDate), 'day');

export const priceCalculation = ({
  hasDiscount,
  minimum_rent_period,
  price,
  startDate,
  endDate,
}: ITest) => {
  const totalDays = totalDaysCalculator(startDate, endDate);
  const isDiscountApplicable =
    hasDiscount && minimum_rent_period < totalDays ? true : false;
  const priceValue = price * totalDays;
  const finalPrice = isDiscountApplicable ? priceValue - priceValue * 0.05 : 0;

  return finalPrice;
};
