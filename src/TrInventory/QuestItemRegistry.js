import QuestItemDefinition from './QuestItemDefinition';

/**
 * Defines all the available items and combinaisons for a given world
 */
export default class QuestItemRegistry {
  /** Returns the existing item keys */
  get items() {
    return Object.keys(this.itemDefinitions);
  }
  constructor() {
    this.itemDefinitions = {}; // key-collection of QuestItemDefinition
    this.itemCombinations = []; // array of { defA: QuestItemDefinition, defB: QuestItemDefinition, defResult: QuestItemDefinition }
  }
  /** Creates the definition of an object identified by key.
   * The properties are data shared between all instances of the given item (ie: labels, mesh, textures, ...)
   */
  createDefinition(key, properties = {}) {
    if (this.itemDefinitions[key]) throw new Error(`The item definition '${key}' already exists`);
    this.itemDefinitions[key] = new QuestItemDefinition(key, properties);
    return this;
  }
  /** Makes possible the combination of two objects to build a third one */
  createCombination(keyA, keyB, keyResult) {
    const defA = this.itemDefinitions[keyA];
    const defB = this.itemDefinitions[keyB];
    const defResult = this.itemDefinitions[keyResult];
    // item validation
    if (!defA) throw new Error(`Unknown item '${keyA}'`);
    if (!defB) throw new Error(`Unknown item '${keyB}'`);
    if (!defResult) throw new Error(`Unknown item '${keyResult}'`);
    // check the pre-existents combinations
    if (this.getCombination(keyA, keyB)) throw new Error(`The combination between '${keyA}' and '${keyB}' already exist`);
    defResult.registerCombination(defA, defB);
    this.itemCombinations.push({ defA, defB, defResult})
    return this;
  }
  /** Returns the combination between two objects, or undefined */
  getCombination(keyA, keyB) {
    for (const combi of this.itemCombinations) {
      if ((keyA === combi.defA.key && keyB === combi.defB.key)
       || (keyA === combi.defB.key && keyB === combi.defA.key)) {
         return combi.defResult.key;
       }
    }
    return undefined;
  }
  /** Returns all objects whom the given object can be combined with */
  getCombinations(key) {
    return this.itemCombinations.reduce((search, current) => {
      if (key === current.defA.key || key === current.defB.key) {
        search.push({
          other: key === current.defA.key ? current.defB.key : current.defA.key,
          result: current.defResult.key
        });
      }
      return search;
    }, []);
  }
  /** Return a value telling whether a combiation exist between two objects */
  areCombinable(keyA, keyB) {
    return this.getCombination(keyA, keyB) !== undefined;
  }
  /** Tell whether an object is combinable with another */
  isCombinable(key) {
    const item = this.itemDefinitions[key];
    if (!item) throw new Error(`Unknown item '${key}'`);
    return item.isCombinable;
  }
  /** Tell whether this object is made by tow objects */
  isCombination(key) {
    const item = this.itemDefinitions[key];
    if (!item) throw new Error(`Unknown item '${key}'`);
    return item.isCombination;
  }
  /** Returns a value indicating whether an item exists */
  itemExists(key) {
    return this.itemDefinitions.hasOwnProperty(key);
  }
  /** Returns the materials needed to build an item */
  getMaterials(key) {
    const materials = this.itemDefinitions[key].madeFrom;
    return materials ? [ materials[0].key, materials[1].key ] : null;
  }
  /** Returns the properties registered for the given item type */
  getProperties(key) {
    const item = this.itemDefinitions[key];
    if (!item) throw new Error(`Unknown item '${key}'`);
    return item.properties;
  }
}
