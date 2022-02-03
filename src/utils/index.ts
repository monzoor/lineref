import dayjs from 'dayjs';
import { CALCULATION_DEFAULT } from '@constants';

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

interface IPriceCalculation {
  hasDiscount: boolean;
  minimum_rent_period: number;
  price: number;
  startDate: Date;
  endDate: Date;
  usedMileage?: number;
}

export const totalDaysCalculator = (startDate: Date, endDate: Date) =>
  dayjs(endDate).diff(dayjs(startDate), 'day');

export const priceCalculation = ({
  hasDiscount,
  minimum_rent_period,
  price,
  startDate,
  endDate,
  usedMileage,
}: IPriceCalculation) => {
  const totalDays = usedMileage || totalDaysCalculator(startDate, endDate);
  const isDiscountApplicable =
    hasDiscount && minimum_rent_period < totalDays ? true : false;
  const priceValue = price * totalDays;
  const finalPrice = isDiscountApplicable
    ? priceValue - priceValue * 0.05
    : priceValue;

  return finalPrice;
};

export const processDataCalculation = (data: any) => {
  const { newDataRef, findIndex, isBook, totalDays, mileage } = data;

  newDataRef[findIndex].availability = !isBook;
  newDataRef[findIndex].bookedFor = isBook ? totalDays : 0;

  const durability = newDataRef[findIndex].durability;
  const type = newDataRef[findIndex].type;

  if (!isBook) {
    const currentMileage = newDataRef[findIndex].mileage
      ? newDataRef[findIndex].mileage
      : 0;
    newDataRef[findIndex].mileage = currentMileage + mileage;
  }

  if (type === 'plain' && !isBook) {
    newDataRef[findIndex].durability = durability - totalDays;
  }
  console.log('=====', type);

  if (type === 'meter' && !isBook) {
    newDataRef[findIndex].durability =
      durability -
      2 * totalDays -
      ((CALCULATION_DEFAULT.MILAGE_PER_DAY * totalDays) / 100) * 2;
  }

  return newDataRef;
};
