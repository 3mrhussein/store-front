import { MythicalWeaponStore } from '../mythical_weapons';
import dotenv from 'dotenv';
import { fillDummy } from './fillDummy';

dotenv.config();

//tests for postgres models

describe('Database Tests', () => {
  const weaponsStore = new MythicalWeaponStore();

  it('Should have index method', () => {
    expect(weaponsStore.index).toBeDefined();
  });

  it('mythical_weapons table should be empty', async () => {
    const result = await weaponsStore.index();
    expect(result).toEqual([]);
  });

  it('Test Mythical_weapons Insert should be defined', () => {
    expect(weaponsStore.insert).toBeDefined();
  });
  it('Test mythical_weapon table to be fill with dummy data', async () => {
    await fillDummy();
    const result = await weaponsStore.index();
    expect(result.length).toBeGreaterThan(1);
  });
});
