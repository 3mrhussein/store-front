import { MythicalWeaponStore, Weapon } from '../mythical_weapons';

//Dummy Data Used to fill test Database

const mythicalWeaponsData: Weapon[] = [
  { name: 'Amr', weight: 25, type: 'Human' },
  { name: 'Rana', weight: 30, type: 'Girl' },
  { name: 'Ahmed', weight: 45, type: 'Man' },
  { name: 'Rehab', weight: 60, type: 'Woman' },
  { name: 'Mohamed', weight: 100, type: 'Man' },
];

export function fillDummy() {
  const mythicalWeaponTable = new MythicalWeaponStore();
  mythicalWeaponsData.map(
    async (row) => await mythicalWeaponTable.insert(row.name, row.type, row.weight)
  );
}
