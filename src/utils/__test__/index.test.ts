import { render, screen } from '@testing-library/react';
import {
  prepareSelectValues,
  priceCalculation,
  processNewData,
  totalDaysCalculator,
  IPriceCalculation,
  processDataCalculation,
} from '@utils';

import mockData from '../../data/data.json';

describe('Test index utils', () => {
  it('should return data for select items', () => {
    const data = [
      {
        name: 'name1',
        code: 'code1',
      },
      {
        name: 'name2',
        code: 'code2',
      },
    ];
    const selectOptions = prepareSelectValues(data);
    expect(selectOptions[0].name).toBe('name1 - code1');
  });

  it('Should manipulate given data', () => {
    const data = [
      {
        code: 'p1',
        name: 'Air Compressor 12 GAS',
        type: 'plain',
        availability: false,
        needing_repair: false,
        durability: 3000,
        max_durability: 3000,
        mileage: null,
        price: 4500,
        minimum_rent_period: 1,
      },
      {
        code: 'p2',
        name: 'Air Compressor 5 Electric',
        type: 'plain',
        availability: true,
        needing_repair: false,
        durability: 1500,
        max_durability: 2000,
        mileage: null,
        price: 6500,
        minimum_rent_period: 1,
      },
    ];
    const newData = processNewData(data);
    expect(newData[1].bookedFor).toBe(0);
  });

  it('Should calculate total days', () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-03');

    const totalDays = totalDaysCalculator(startDate, endDate);
    expect(totalDays).toBe(2);
  });

  it('Should calculate price', () => {
    const data: IPriceCalculation = {
      hasDiscount: true,
      minimum_rent_period: 1,
      price: 4500,
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-01-03'),
      usedMileage: 0,
    };
    const price = priceCalculation(data);

    expect(price).toBe(8550);
  });

  it('Should process final output', () => {
    const data = [
      {
        availability: false,
        bookedFor: 4,
        code: 'p1',
        durability: 3000,
        hasDiscount: true,
        max_durability: 3000,
        mileage: null,
        minimum_rent_period: 1,
        name: 'Air Compressor 12 GAS',
        needing_repair: false,
        price: 4500,
        type: 'meter',
      },
    ];
    const newData = processDataCalculation({
      newDataRef: data,
      findIndex: 0,
      isBook: false,
      totalDays: 4,
      mileage: 0,
    });
    expect(newData[0].availability).toBe(true);
    expect(newData[0].bookedFor).toBe(0);
    expect(newData[0].durability).toBe(2991.2);
  });
});
