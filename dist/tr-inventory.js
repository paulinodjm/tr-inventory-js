(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TR"] = factory();
	else
		root["TR"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Provide a rough way to manage an inventory */
var Inventory = function () {
  function Inventory(registry) {
    _classCallCheck(this, Inventory);

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


  _createClass(Inventory, [{
    key: "getContent",
    value: function getContent() {
      var _this = this;

      return Object.entries(this.itemCounts).reduce(function (content, entry) {
        var _entry = _slicedToArray(entry, 2),
            key = _entry[0],
            count = _entry[1];

        if (count > 0) {
          var def = _this.registry.itemDefinitions[key];
          content.push({
            key: key,
            count: count,
            properties: def.properties,
            isCombination: def.isCombination,
            mayBeCombinable: def.isCombinable
          });
        }
        return content;
      }, []);
    }
    /** Iterates through the current inventory content; 
     *  callback(entry: see Inventory.getContent(), inventory)
     * */

  }, {
    key: "forEachItem",
    value: function forEachItem(callback) {
      var _this2 = this;

      if (typeof callback !== 'function') throw new Error("'callback' must be a function");
      Object.entries(this.itemCounts).forEach(function (entry) {
        var _entry2 = _slicedToArray(entry, 2),
            key = _entry2[0],
            count = _entry2[1];

        if (count > 0) {
          var def = _this2.registry.itemDefinitions[key];
          callback({
            key: key,
            count: count,
            properties: def.properties,
            isCombination: def.isCombination,
            mayBeCombinable: def.isCombinable
          }, _this2);
        }
      });
    }
    /** Returns the properties for the given item, or null if not in the inventory */

  }, {
    key: "getItemProperties",
    value: function getItemProperties(key) {
      var def = this.registry.itemDefinitions[key];
      if (!def) throw new Error("Unknown item '" + key + "'");
      return this.itemCounts[key] ? def.properties : null;
    }
    /** Add the given item to the inventory */

  }, {
    key: "addItem",
    value: function addItem(key) {
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (!this.registry.itemExists(key)) throw new Error("Unknown item '" + key + "'");
      if (count <= 0) throw new Error("Invalid count: " + count + "; must be greater than 0");

      var itemCount = this.itemCounts[key] || 0;
      this.itemCounts[key] = itemCount + count;
      return this;
    }
    /** Removes the given item from the inventory */

  }, {
    key: "removeItem",
    value: function removeItem(key) {
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (!this.registry.itemExists(key)) throw new Error("Unknown item '" + key + "'");
      if (count <= 0) throw new Error("Invalid count: " + count + "; must be greater than 0");

      var itemCount = this.itemCounts[key];
      if (itemCount) {
        var newCount = itemCount - count;
        this.itemCounts[key] = newCount < 0 ? 0 : newCount;
      }
      return this;
    }
    /** Returns a value telling whether this item can be combined with another object in this inventory */

  }, {
    key: "isCombinable",
    value: function isCombinable(key) {
      var item = this.registry.itemDefinitions[key];
      if (!item) throw new Error("Unknown item '" + key + "'");

      var itemCount = this.itemCounts[key] || 0;
      if (itemCount < 1) return false;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = item.materialFor[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var combination = _step.value;

          var other = combination.madeFrom[0] === item ? combination.madeFrom[1] : combination.madeFrom[0];
          if (other === item) {
            if (itemCount >= 2) return true;
          } else {
            var otherCount = this.itemCounts[other.key] || 0;
            if (otherCount >= 1) return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
    /** Returns the object that can be combined with this one */

  }, {
    key: "getCombinables",
    value: function getCombinables(key) {
      var item = this.registry.itemDefinitions[key];
      if (!item) throw new Error("Unknown item '" + key + "'");

      if (item.materialFor.length === 0) throw new Error("The item '" + key + "' is not combinable");
      var itemCount = this.itemCounts[key] || 0;
      if (itemCount <= 0) throw new Error("The item '" + key + "' is not in the inventory");

      var result = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = item.materialFor[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var combination = _step2.value;

          var other = combination.madeFrom[0] === item ? combination.madeFrom[1] : combination.madeFrom[0];
          if (other === item) {
            if (itemCount >= 2) {
              result.push(other.key);
            }
          } else {
            var otherCount = this.itemCounts[other.key] || 0;
            if (otherCount >= 1) {
              result.push(other.key);
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    }
    /** Combines two objects from the inventory and adds the result */

  }, {
    key: "combine",
    value: function combine(keyA, keyB) {
      var itemA = this.registry.itemDefinitions[keyA];
      var itemB = this.registry.itemDefinitions[keyB];
      if (!itemA) throw new Error("Unknown item '" + keyA + "'");
      if (!itemB) throw new Error("Unknown item '" + keyB + "'");

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = itemA.materialFor[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var combination = _step3.value;

          if (combination.madeFrom[0] === itemA && combination.madeFrom[1] === itemB || combination.madeFrom[0] === itemB && combination.madeFrom[1] === itemA) {
            var countA = this.itemCounts[keyA] || 0;
            var countB = this.itemCounts[keyB] || 0;
            if (itemA === itemB && countA >= 2) {
              this.removeItem(keyA, 2);
            } else if (itemA !== itemB && countA > 0 && countB > 0) {
              this.removeItem(keyA, 1);
              this.removeItem(keyB, 1);
            } else {
              throw new Error("Unable to combine '" + keyA + "' and '" + keyB + "': no enough item");
            }
            this.addItem(combination.key, 1);
            return this;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      throw new Error("The combination between '" + keyA + "' and '" + keyB + "' doesn't exists");
    }
    /** Undo a combination; the two materials are added back to the inventory */

  }, {
    key: "uncombine",
    value: function uncombine(key) {
      var item = this.registry.itemDefinitions[key];
      if (!item) throw new Error("Unknown item '" + key + "'");

      var itemCount = this.itemCounts[key] || 0;
      if (itemCount === 0) throw new Error("The item '" + key + "' is not in the inventory");

      this.removeItem(key, 1);
      this.addItem(item.madeFrom[0].key);
      this.addItem(item.madeFrom[1].key);
      return this;
    }
    /** Returns the count of items in the inventory */

  }, {
    key: "getItemCount",
    value: function getItemCount(key) {
      if (!this.registry.itemExists(key)) throw new Error("Unknown item '" + key + "'");
      return this.itemCounts[key] || 0;
    }
  }]);

  return Inventory;
}();

exports.default = Inventory;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _QuestItemDefinition = __webpack_require__(2);

var _QuestItemDefinition2 = _interopRequireDefault(_QuestItemDefinition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Defines all the available items and combinaisons for a given world
 */
var QuestItemRegistry = function () {
  _createClass(QuestItemRegistry, [{
    key: 'items',

    /** Returns the existing item keys */
    get: function get() {
      return Object.keys(this.itemDefinitions);
    }
  }]);

  function QuestItemRegistry() {
    _classCallCheck(this, QuestItemRegistry);

    this.itemDefinitions = {}; // key-collection of QuestItemDefinition
    this.itemCombinations = []; // array of { defA: QuestItemDefinition, defB: QuestItemDefinition, defResult: QuestItemDefinition }
  }
  /** Creates the definition of an object identified by key.
   * The properties are data shared between all instances of the given item (ie: labels, mesh, textures, ...)
   */


  _createClass(QuestItemRegistry, [{
    key: 'createDefinition',
    value: function createDefinition(key) {
      var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.itemDefinitions[key]) throw new Error('The item definition \'' + key + '\' already exists');
      this.itemDefinitions[key] = new _QuestItemDefinition2.default(key, properties);
      return this;
    }
    /** Makes possible the combination of two objects to build a third one */

  }, {
    key: 'createCombination',
    value: function createCombination(keyA, keyB, keyResult) {
      var defA = this.itemDefinitions[keyA];
      var defB = this.itemDefinitions[keyB];
      var defResult = this.itemDefinitions[keyResult];
      // item validation
      if (!defA) throw new Error('Unknown item \'' + keyA + '\'');
      if (!defB) throw new Error('Unknown item \'' + keyB + '\'');
      if (!defResult) throw new Error('Unknown item \'' + keyResult + '\'');
      // check the pre-existents combinations
      if (this.getCombination(keyA, keyB)) throw new Error('The combination between \'' + keyA + '\' and \'' + keyB + '\' already exist');
      defResult.registerCombination(defA, defB);
      this.itemCombinations.push({ defA: defA, defB: defB, defResult: defResult });
      return this;
    }
    /** Returns the combination between two objects, or undefined */

  }, {
    key: 'getCombination',
    value: function getCombination(keyA, keyB) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.itemCombinations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var combi = _step.value;

          if (keyA === combi.defA.key && keyB === combi.defB.key || keyA === combi.defB.key && keyB === combi.defA.key) {
            return combi.defResult.key;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return undefined;
    }
    /** Returns all objects whom the given object can be combined with */

  }, {
    key: 'getCombinations',
    value: function getCombinations(key) {
      return this.itemCombinations.reduce(function (search, current) {
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

  }, {
    key: 'areCombinable',
    value: function areCombinable(keyA, keyB) {
      return this.getCombination(keyA, keyB) !== undefined;
    }
    /** Tell whether an object is combinable with another */

  }, {
    key: 'isCombinable',
    value: function isCombinable(key) {
      var item = this.itemDefinitions[key];
      if (!item) throw new Error('Unknown item \'' + key + '\'');
      return item.isCombinable;
    }
    /** Tell whether this object is made by tow objects */

  }, {
    key: 'isCombination',
    value: function isCombination(key) {
      var item = this.itemDefinitions[key];
      if (!item) throw new Error('Unknown item \'' + key + '\'');
      return item.isCombination;
    }
    /** Returns a value indicating whether an item exists */

  }, {
    key: 'itemExists',
    value: function itemExists(key) {
      return this.itemDefinitions.hasOwnProperty(key);
    }
    /** Returns the materials needed to build an item */

  }, {
    key: 'getMaterials',
    value: function getMaterials(key) {
      var materials = this.itemDefinitions[key].madeFrom;
      return materials ? [materials[0].key, materials[1].key] : null;
    }
    /** Returns the properties registered for the given item type */

  }, {
    key: 'getProperties',
    value: function getProperties(key) {
      var item = this.itemDefinitions[key];
      if (!item) throw new Error('Unknown item \'' + key + '\'');
      return item.properties;
    }
  }]);

  return QuestItemRegistry;
}();

exports.default = QuestItemRegistry;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Describe one item type in the registry */
var QuestItemDefinition = function () {
  _createClass(QuestItemDefinition, [{
    key: "isCombination",

    /** Tell wether this item type is a combination of two others */
    get: function get() {
      return this.madeFrom !== undefined;
    }
    /** Tell whether some combiations exits with this item type */

  }, {
    key: "isCombinable",
    get: function get() {
      return this.materialFor.length > 0;
    }
    /** Creates a new item type with the given key and properties */

  }]);

  function QuestItemDefinition(key) {
    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, QuestItemDefinition);

    this.key = key;
    this.properties = properties;
    this.materialFor = [];
    this.madeFrom = undefined;
  }
  /** Register a combination of two objects making this one */


  _createClass(QuestItemDefinition, [{
    key: "registerCombination",
    value: function registerCombination(itemA, itemB) {
      this.madeFrom = [itemA, itemB];
      itemA.materialFor.push(this);
      if (itemA !== itemB) {
        itemB.materialFor.push(this);
      }
      return this;
    }
  }]);

  return QuestItemDefinition;
}();

exports.default = QuestItemDefinition;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Inventory = __webpack_require__(0);

Object.defineProperty(exports, 'Inventory', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Inventory).default;
  }
});

var _QuestItemRegistry = __webpack_require__(1);

Object.defineProperty(exports, 'QuestItemRegistry', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_QuestItemRegistry).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);
});