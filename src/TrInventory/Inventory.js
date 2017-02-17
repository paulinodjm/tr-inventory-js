
/** Provide a way to manage an inventory */
export default class Inventory {
  constructor(registry) {
    this.registry = registry;
    this.itemCounts = {}; // key: { count, def }
  }
  /** Returns the current inventory content as an array of
   * {
   *   key: <string>,
   *   count: <number>,
   *   properties: <object>,
   *   isCombination: <bool>,
   *   mayBeCombinable: <bool>
   * }
   */
  getContent() {
    return Object.entries(this.itemCounts).reduce((content, entry) => {
      const [key, count] = entry;
      if (count > 0) {
        const def = this.registry.itemDefinitions[key];
        content.push({
          key,
          count,
          properties: def.properties,
          isCombination: def.isCombination,
          mayBeCombinable: def.isCombinable,
        });
      }
      return content;
    }, []);
  }
  /** Iterates through the current inventory content;
   *  callback(entry: see Inventory.getContent(), inventory)
   * */
  forEachItem(callback) {
    if (typeof callback !== 'function') throw new Error("'callback' must be a function");
    Object.entries(this.itemCounts).forEach((entry) => {
      const [key, count] = entry;
      if (count > 0) {
        const def = this.registry.itemDefinitions[key];
        callback({
          key,
          count,
          properties: def.properties,
          isCombination: def.isCombination,
          mayBeCombinable: def.isCombinable,
        }, this);
      }
    });
  }
  /** Returns the properties for the given item, or null if not in the inventory */
  getItemProperties(key) {
    const def = this.registry.itemDefinitions[key];
    if (!def) throw new Error(`Unknown item '${key}'`);
    return (this.itemCounts[key]) ? def.properties : null;
  }
  /** Add the given item to the inventory */
  addItem(key, count = 1) {
    if (!this.registry.itemExists(key)) throw new Error(`Unknown item '${key}'`);
    if (count <= 0) throw new Error(`Invalid count: ${count}; must be greater than 0`);

    const itemCount = this.itemCounts[key] || 0;
    this.itemCounts[key] = itemCount + count;
    return this;
  }
  /** Removes the given item from the inventory */
  removeItem(key, count = 1) {
    if (!this.registry.itemExists(key)) throw new Error(`Unknown item '${key}'`);
    if (count <= 0) throw new Error(`Invalid count: ${count}; must be greater than 0`);

    const itemCount = this.itemCounts[key];
    if (itemCount) {
      const newCount = itemCount - count;
      this.itemCounts[key] = (newCount < 0) ? 0 : newCount;
    }
    return this;
  }
  /** Returns a value telling whether this item can be combined with another object in this inventory */
  isCombinable(key) {
    const item = this.registry.itemDefinitions[key];
    if (!item) throw new Error(`Unknown item '${key}'`);

    const itemCount = this.itemCounts[key] || 0;
    if (itemCount < 1) return false;

    for (const combination of item.materialFor) {
      const other = (combination.madeFrom[0] === item) ? combination.madeFrom[1] : combination.madeFrom[0];
      if (other === item) {
        if (itemCount >= 2) return true;
      } else {
        const otherCount = this.itemCounts[other.key] || 0;
        if (otherCount >= 1) return true;
      }
    }
    return false;
  }
  /** Returns the object that can be combined with this one */
  getCombinables(key) {
    const item = this.registry.itemDefinitions[key];
    if (!item) throw new Error(`Unknown item '${key}'`);

    if (item.materialFor.length === 0) throw new Error(`The item '${key}' is not combinable`);
    const itemCount = this.itemCounts[key] || 0;
    if (itemCount <= 0) throw new Error(`The item '${key}' is not in the inventory`);

    const result = [];
    for (const combination of item.materialFor) {
      const other = (combination.madeFrom[0] === item) ? combination.madeFrom[1] : combination.madeFrom[0];
      if (other === item) {
        if (itemCount >= 2) {
          result.push(other.key);
        }
      } else {
        const otherCount = this.itemCounts[other.key] || 0;
        if (otherCount >= 1) {
          result.push(other.key);
        }
      }
    }
    return result;
  }
  /** Combines two objects from the inventory and adds the result */
  combine(keyA, keyB) {
    const itemA = this.registry.itemDefinitions[keyA];
    const itemB = this.registry.itemDefinitions[keyB];
    if (!itemA) throw new Error(`Unknown item '${keyA}'`);
    if (!itemB) throw new Error(`Unknown item '${keyB}'`);

    for (const combination of itemA.materialFor) {
      if ((combination.madeFrom[0] === itemA && combination.madeFrom[1] === itemB)
        || (combination.madeFrom[0] === itemB && combination.madeFrom[1] === itemA)) {
        const countA = this.itemCounts[keyA] || 0;
        const countB = this.itemCounts[keyB] || 0;
        if (itemA === itemB && countA >= 2) {
          this.removeItem(keyA, 2);
        } else if (itemA !== itemB && countA > 0 && countB > 0) {
          this.removeItem(keyA, 1);
          this.removeItem(keyB, 1);
        } else {
          throw new Error(`Unable to combine '${keyA}' and '${keyB}': no enough item`);
        }
        this.addItem(combination.key, 1);
        return this;
      }
    }
    throw new Error(`The combination between '${keyA}' and '${keyB}' doesn't exists`);
  }
  /** Undo a combination; the two materials are added back to the inventory */
  uncombine(key) {
    const item = this.registry.itemDefinitions[key];
    if (!item) throw new Error(`Unknown item '${key}'`);

    const itemCount = this.itemCounts[key] || 0;
    if (itemCount === 0) throw new Error(`The item '${key}' is not in the inventory`);

    this.removeItem(key, 1);
    this.addItem(item.madeFrom[0].key);
    this.addItem(item.madeFrom[1].key);
    return this;
  }
  /** Returns the count of items in the inventory */
  getItemCount(key) {
    if (!this.registry.itemExists(key)) throw new Error(`Unknown item '${key}'`);
    return this.itemCounts[key] || 0;
  }
}
