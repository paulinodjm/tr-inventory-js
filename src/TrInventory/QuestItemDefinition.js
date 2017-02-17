
/** Describe one item type in the registry */
export default class QuestItemDefinition {
  /** Tell wether this item type is a combination of two others */
  get isCombination() {
    return (this.madeFrom !== undefined);
  }
  /** Tell whether some combiations exits with this item type */
  get isCombinable() {
    return (this.materialFor.length > 0);
  }
  /** Creates a new item type with the given key and properties */
  constructor(key, properties = null) {
    this.key = key;
    this.properties = properties;
    this.materialFor = [];
    this.madeFrom = undefined;
  }
  /** Register a combination of two objects making this one */
  registerCombination(itemA, itemB) {
    this.madeFrom = [itemA, itemB];
    itemA.materialFor.push(this);
    if (itemA !== itemB) {
      itemB.materialFor.push(this);
    }
    return this;
  }
}
