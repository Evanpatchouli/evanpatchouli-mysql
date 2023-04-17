"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mysql = _interopRequireDefault(require("mysql"));
var _this2 = void 0;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// const mysql = require('mysql');
// let conn = mysql.createConnection();

var use = function use(conn, dbname) {
  var sql = 'USE ' + dbname;
  conn.query(sql);
};
var doUpdate = function doUpdate(conn, sql, type) {
  return new Promise(function (resolve, reject) {
    conn.query(sql, function (err, sqlres) {
      if (db.mode != "debug" && db.mode != "non-debug") {
        reject("unknown mode");
      }
      if (type == "once") {
        conn.destroy();
        if (db.mode == "debug") {
          console.log('Ok, this conn has been destroyed');
        }
      } else if (type == "lasting" || type == undefined || type == null || type == "") {
        // do nothing
      } else {
        reject("unkonwn conn type");
      }
      if (err) {
        db["throw"](err);
        reject(err.message);
      } else {
        sqlres = JSON.parse(JSON.stringify(sqlres));
        var data;
        // let affectedRows = sqlres.affectedRows;
        // let changedRows = sqlres.changedRows;
        if (db.mode == "debug") {
          data = {
            sql: sql,
            res: sqlres
          };
          console.log('sql:', sql);
        } else {
          data = sqlres.affectedRows + sqlres.changedRows - 1;
        }
        resolve(data);
      }
    });
  });
};
var doInsert = function doInsert(conn, sql, type, hope) {
  return new Promise(function (resolve, reject) {
    conn.query(sql, function (err, sqlres) {
      if (db.mode != "debug" && db.mode != "non-debug") {
        reject("unknown mode");
      }
      if (type == "once") {
        conn.destroy();
        if (db.mode == "debug") {
          console.log('Ok, this conn has been destroyed');
        }
      } else if (type == "lasting" || type == undefined || type == null || type == "") {
        // do nothing
      } else {
        reject("unkonwn conn type");
      }
      if (err) {
        db["throw"](err);
        reject(err.message);
      } else {
        sqlres = JSON.parse(JSON.stringify(sqlres));
        var data;
        if (db.mode == "debug") {
          data = {
            sql: sql,
            res: sqlres
          };
          console.log('sql:', sql);
        } else {
          if (hope == "autoid") {
            var sql2 = "SELECT LAST_INSERT_ID() as lastid";
            conn.query(sql2, function (err2, sqlres2) {
              if (err2) {
                reject(err2.message);
              } else {
                data = {
                  autoid: sqlres2.lastid,
                  affectedRows: sqlres.affectedRows
                };
              }
            });
          } else if (hope == "all") {
            data = sqlres;
          } else if (hope == "default" || hope == undefined || hope == null || hope == "") {
            data = sqlres.affectedRows;
          }
        }
        resolve(data);
      }
    });
  });
};
var doDelete = function doDelete(conn, sql, type) {
  return new Promise(function (resolve, reject) {
    conn.query(sql, function (err, sqlres) {
      if (db.mode != "debug" && db.mode != "non-debug") {
        reject("unknown mode");
      }
      if (type == "once") {
        conn.destroy();
        if (db.mode == "debug") {
          console.log('Ok, this conn has been destroyed');
        }
      } else if (type == "lasting" || type == undefined || type == null || type == "") {
        // do nothing
      } else {
        reject("unkonwn conn type");
      }
      if (err) {
        db["throw"](err);
        reject(err.message);
      } else {
        sqlres = JSON.parse(JSON.stringify(sqlres));
        var data;
        if (db.mode == "debug") {
          data = {
            sql: sql,
            res: sqlres
          };
          console.log('sql:', sql);
        } else {
          data = sqlres.affectedRows;
        }
        resolve(data);
      }
    });
  });
};
var doSelect = function doSelect(conn, sql, type) {
  return new Promise(function (resolve, reject) {
    conn.query(sql, function (err, sqlres) {
      if (db.mode != "debug" && db.mode != "non-debug") {
        reject("unknown mode");
      }
      if (type == "once") {
        conn.destroy();
        if (db.mode == "debug") {
          console.log('Ok, this conn has been destroyed');
        }
      } else if (type == "lasting" || type == undefined || type == null || type == "") {
        // do nothing
      } else {
        reject("unkonwn conn type");
      }
      if (err) {
        db["throw"](err);
        reject(err.message);
      } else {
        sqlres = JSON.parse(JSON.stringify(sqlres));
        var data;
        if (db.mode == "debug") {
          data = {
            sql: sql,
            res: sqlres
          };
          console.log('sql:', sql);
        } else {
          data = sqlres;
        }
        resolve(data);
      }
    });
  });
};
var doFreeSql = doSelect;
var showTbStruct = function showTbStruct(conn, tbname, type) {
  var sql = "show full columns from ??";
  return new Promise(function (resolve, reject) {
    conn.query(sql, tbname, function (err, sqlres) {
      if (db.mode != "debug" && db.mode != "non-debug") {
        reject("unknown mode");
      }
      if (type == "once") {
        conn.destroy();
        if (db.mode == "debug") {
          console.log('Ok, this conn has been destroyed');
        }
      } else if (type == "lasting" || type == undefined || type == null || type == "") {
        // do nothing
      } else {
        reject("unkonwn conn type");
      }
      if (err) {
        db["throw"](err);
        reject(err.message);
      } else {
        sqlres = JSON.parse(JSON.stringify(sqlres));
        var data;
        if (db.mode == "debug") {
          data = {
            sql: sql,
            res: sqlres
          };
          console.log('sql:', sql);
        } else {
          data = sqlres;
        }
        resolve(data);
      }
    });
  });
};
var getConnFromPool = function getConnFromPool() {
  return new Promise(function (resolve, reject) {
    pool.sqlpool.getConnection(function (err, conn) {
      if (err) {
        db["throw"](err);
        reject(err.message);
      }
      resolve(conn);
    });
  });
};
var poolDirectAction = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(actionfx, sql) {
    var conn;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getConnFromPool();
        case 2:
          conn = _context.sent;
          return _context.abrupt("return", actionfx(conn, sql, "once"));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function poolDirectAction(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * an Object packaged with a poolConnection and some methods
 * @typedef {Pool}
 * @property {PoolConfig} config
 * @property {} sqlpool
 * @property {method} init
 * @property {method} switch
 * @property {method} sel       - async
 * @property {method} upd       - async
 * @property {method} ins       - async
 * @property {method} del       - async
 * @property {method} getDbs    - async
 * @property {method} getTbs    - async
 * @property {method} getTbStruct   - async
 * @property {method} close     - async
 * @property {method} conn      - async, get a lasting conn
 */
var pool = {
  /**
   * the config of pool conn
   * @type {PoolConfig}
   */
  config: {
    host: undefined,
    port: undefined,
    user: undefined,
    password: undefined,
    database: undefined,
    /**
     * @type {number}
     * @default
     */
    connlimit: 10
  },
  /**
   * @type {import("mysql").PoolConnection}
   */
  sqlpool: undefined,
  /**
   * to create a poolConnection
   * @param {!string} host 
   * @param {!number} port 
   * @param {!string} user 
   * @param {!string} pwd 
   * @param {string} database 
   * @param {number} connlimit 
   */
  init: function init(host, port, user, pwd, database, connlimit) {
    this.config.host = host;
    this.config.port = port;
    this.config.user = user;
    this.config.password = pwd;
    this.config.database = database != null && database != '' ? database : undefined;
    this.config.connlimit = connlimit != null && connlimit != undefined ? database : 10;
    var p = _mysql["default"].createPool({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
      connectionLimit: this.config.connlimit
    });
    this.sqlpool = p;
  },
  /**
   * switch poolconn to use another database
   * @function
   * @param {!string} dbname - the database's name you want switch to use
   */
  "switch": function _switch(dbname) {
    this.sqlpool.config.connectionConfig.database = dbname;
    this.config.database = dbname;
  },
  /**
   * do select with a one-off conn in pool
   * @async
   * @function
   * @param {!string} sql  - select sql
   * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
   */
  sel: function () {
    var _sel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(sql) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return poolDirectAction(doSelect, sql);
          case 2:
            return _context2.abrupt("return", _context2.sent);
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function sel(_x3) {
      return _sel.apply(this, arguments);
    }
    return sel;
  }(),
  /**
   * do update with a one-off conn in pool
   * @async
   * @function
   * @param {!string} sql - update sql
   * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
   */
  upd: function () {
    var _upd = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(sql) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return poolDirectAction(doUpdate, sql);
          case 2:
            return _context3.abrupt("return", _context3.sent);
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function upd(_x4) {
      return _upd.apply(this, arguments);
    }
    return upd;
  }(),
  /**
   * do insert with a one-off conn in pool
   * @async
   * @function
   * @param {!string} sql - insert sql
   * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
   */
  ins: function () {
    var _ins = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(sql) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return poolDirectAction(doInsert, sql);
          case 2:
            return _context4.abrupt("return", _context4.sent);
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    function ins(_x5) {
      return _ins.apply(this, arguments);
    }
    return ins;
  }(),
  /**
   * do delete with a one-off conn in pool
   * @async
   * @function
   * @param {!string} sql - delete sql
   * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
   */
  del: function () {
    var _del = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(sql) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return poolDirectAction(doDelete, sql);
          case 2:
            return _context5.abrupt("return", _context5.sent);
          case 3:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    function del(_x6) {
      return _del.apply(this, arguments);
    }
    return del;
  }(),
  newDb: function newDb(name, character, collation) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var sql;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            sql = "create database if not exists " + name;
            if (character != null) {
              sql = sql + " default character set " + character;
            }
            if (collation != null) {
              sql = sql + " default collate " + collation;
            }
            _context6.next = 5;
            return poolDirectAction(doFreeSql, sql);
          case 5:
            return _context6.abrupt("return", _context6.sent);
          case 6:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  },
  delDb: function delDb(name) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var sql;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            sql = "drop database if exists " + name;
            _context7.next = 3;
            return poolDirectAction(doFreeSql, sql);
          case 3:
            return _context7.abrupt("return", _context7.sent);
          case 4:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  },
  /**
   * get all db's name with a one-off conn in pool
   * @async
   * @function
   * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of db names and the key is "dbname"
   */
  getDbs: function getDbs() {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var sql;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            sql = "select schema_name as dbname from information_schema.schemata";
            _context8.next = 3;
            return poolDirectAction(doSelect, sql);
          case 3:
            return _context8.abrupt("return", _context8.sent);
          case 4:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }))();
  },
  /**
   * get all tb's name from a db with a one-off conn in pool.
   * if dbname is not assigned clearly, it would be this conn default database
   * @async
   * @function
   * @param {string|undefined|null|""} dbname 
   * @returns {Promise<Array<Map<tbname,string>>} a promise, if success, it would be a list of table names and the key is "tbname", like [{ tbname: "user" }]
   */
  getTbs: function getTbs(dbname) {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var sql;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            if (dbname == undefined || dbname == "" || dbname == null) {
              sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + _this.config.database + '\'';
            } else {
              sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
            }
            _context9.next = 3;
            return poolDirectAction(doSelect, sql);
          case 3:
            return _context9.abrupt("return", _context9.sent);
          case 4:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }))();
  },
  /**
   * get struct of a table with a one-off conn
   * @async
   * @function
   * @param string tbname 
   * @returns {Promise<Array<Map<any,string>>} construction of a table
   */
  getTbStruct: function () {
    var _getTbStruct = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(tbname) {
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return showTbStruct(_this2.sqlpool, tbname, "once");
          case 2:
            return _context10.abrupt("return", _context10.sent);
          case 3:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }));
    function getTbStruct(_x7) {
      return _getTbStruct.apply(this, arguments);
    }
    return getTbStruct;
  }(),
  /**
   * end this poolconn
   * @function
   */
  close: function close() {
    this.sqlpool.end();
    console.log('Ok, this pool has been closed');
  },
  /**
   * get a lasting from this poolConnection
   * @returns {connInPool} an Object packaged with a conn in pool and some functions
   */
  conn: function () {
    var _conn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
      var newconn, conn;
      return _regeneratorRuntime().wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return getConnFromPool();
          case 2:
            newconn = _context20.sent;
            /**
             * @type {ConnInPool}
             * @property {import("mysql").Connection} conn  - mysql connection
             * @property {object} config                    - config of this mysql conn and it is changable
             * @property {function} sel                     - do select
             * @property {function} upd                     - do update
             * @property {function} ins                     - do insert
             * @property {function} del                     - do delete
             * @property {function} getDbs                  - select all databases' name
             * @property {function} getTbs                  - select all tables' name from a database
             * @property {function} getTbStruct             - get construction of one table
             * @property {function} switch                  - switch this conn to use another database
             * @property {function} free                    - release this conn
             * @property {function} close                   - destroy this conn
             */
            conn = {
              /**
               * @type {import("mysql").Connection}
               */
              conn: newconn,
              /**
               * @type {ConnConfig}
               */
              config: {
                host: newconn.config.host,
                port: newconn.config.port,
                user: newconn.config.user,
                password: newconn.config.password,
                database: newconn.config.database
              },
              /**
               * do select
               * @async
               * @function
               * @param {!string} sql  - select sql
               * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
               */
              sel: function sel(sql) {
                var _this3 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
                  return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                    while (1) switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.next = 2;
                        return doSelect(_this3.conn, sql);
                      case 2:
                        return _context11.abrupt("return", _context11.sent);
                      case 3:
                      case "end":
                        return _context11.stop();
                    }
                  }, _callee11);
                }))();
              },
              /**
               * do update
               * @async
               * @function
               * @param {!string} sql - update sql
               * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
               */
              upd: function upd(sql) {
                var _this4 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
                  return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                    while (1) switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return doUpdate(_this4.conn, sql);
                      case 2:
                        return _context12.abrupt("return", _context12.sent);
                      case 3:
                      case "end":
                        return _context12.stop();
                    }
                  }, _callee12);
                }))();
              },
              /**
               * do insert
               * @async
               * @function
               * @param {!string} sql - insert sql
               * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
               */
              ins: function ins(sql) {
                var _this5 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
                  return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                    while (1) switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.next = 2;
                        return doInsert(_this5.conn, sql);
                      case 2:
                        return _context13.abrupt("return", _context13.sent);
                      case 3:
                      case "end":
                        return _context13.stop();
                    }
                  }, _callee13);
                }))();
              },
              /**
               * de delete
               * @async
               * @function
               * @param {!string} sql - delete sql
               * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
               */
              del: function del(sql) {
                var _this6 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
                  return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                    while (1) switch (_context14.prev = _context14.next) {
                      case 0:
                        _context14.next = 2;
                        return doDelete(_this6.conn, sql);
                      case 2:
                        return _context14.abrupt("return", _context14.sent);
                      case 3:
                      case "end":
                        return _context14.stop();
                    }
                  }, _callee14);
                }))();
              },
              newDb: function newDb(name, character, collation) {
                var _this7 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
                  var sql;
                  return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                    while (1) switch (_context15.prev = _context15.next) {
                      case 0:
                        sql = "create database if not exists " + name;
                        if (character != null) {
                          sql = sql + " default character set " + character;
                        }
                        if (collation != null) {
                          sql = sql + " default collate " + collation;
                        }
                        _context15.next = 5;
                        return doFreeSql(_this7.conn, sql);
                      case 5:
                        return _context15.abrupt("return", _context15.sent);
                      case 6:
                      case "end":
                        return _context15.stop();
                    }
                  }, _callee15);
                }))();
              },
              delDb: function delDb(name) {
                var _this8 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
                  var sql, newconn;
                  return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                    while (1) switch (_context16.prev = _context16.next) {
                      case 0:
                        sql = "drop database if exists " + name;
                        newconn = _this8.newconn();
                        _context16.next = 4;
                        return doFreeSql(_this8.conn, sql);
                      case 4:
                        return _context16.abrupt("return", _context16.sent);
                      case 5:
                      case "end":
                        return _context16.stop();
                    }
                  }, _callee16);
                }))();
              },
              /**
               * get all db's name
               * @async
               * @function
               * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of db names and the key is "dbname"
               */
              getDbs: function getDbs() {
                var _this9 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
                  var sql;
                  return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                    while (1) switch (_context17.prev = _context17.next) {
                      case 0:
                        sql = "select schema_name as dbname from information_schema.schemata";
                        _context17.next = 3;
                        return doSelect(_this9.conn, sql);
                      case 3:
                        return _context17.abrupt("return", _context17.sent);
                      case 4:
                      case "end":
                        return _context17.stop();
                    }
                  }, _callee17);
                }))();
              },
              /**
               * get tables' name from a db.
               * if dbname is not assigned clearly, it would be this conn default database
               * @async
               * @function
               * @param {string|undefined|null|""} dbname 
               * @returns {Promise<Array<Map<tbname,string>>} a promise, if success, it would be a list of table names and the key is "tbname", like [{ tbname: "user" }]
               */
              getTbs: function getTbs(dbname) {
                var _this10 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
                  var sql;
                  return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                    while (1) switch (_context18.prev = _context18.next) {
                      case 0:
                        if (dbname == undefined || dbname == "" || dbname == null) {
                          sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + _this10.config.database + '\'';
                        } else {
                          sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
                        }
                        _context18.next = 3;
                        return doSelect(_this10.conn, sql);
                      case 3:
                        return _context18.abrupt("return", _context18.sent);
                      case 4:
                      case "end":
                        return _context18.stop();
                    }
                  }, _callee18);
                }))();
              },
              /**
               * get a tables' struct
               * @async
               * @function
               * @param string tbname 
               * @returns {Promise<Array<Map<any,string>>} construction of a table
               */
              getTbStruct: function getTbStruct(tbname) {
                var _this11 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
                  return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                    while (1) switch (_context19.prev = _context19.next) {
                      case 0:
                        _context19.next = 2;
                        return showTbStruct(_this11.conn, tbname);
                      case 2:
                        return _context19.abrupt("return", _context19.sent);
                      case 3:
                      case "end":
                        return _context19.stop();
                    }
                  }, _callee19);
                }))();
              },
              /**
               * switch this conn to use another database
               * @function
               * @param {!string} dbname - the database's name you want switch to use
               */
              siwtch: function siwtch(dbname) {
                use(this.conn, dbname);
                this.config.database = dbname;
              },
              /**
               * release this conn
               * @method
               */
              free: function free() {
                this.conn.release();
                console.log('Ok, this conn has been released');
              },
              /**
               * destroy this conn
               * @function
               */
              close: function close() {
                this.conn.destroy();
                console.log('Ok, this conn has been destroyed');
              }
            };
            return _context20.abrupt("return", conn);
          case 5:
          case "end":
            return _context20.stop();
        }
      }, _callee20);
    }));
    function conn() {
      return _conn.apply(this, arguments);
    }
    return conn;
  }()
};

/** 
 * @namespace db
 * @type {Db}
 * @property {string} name                  - this object's default name is "db"
 * @property {string} type                  - db's type
 * @property {string} mode                  - db's running mode
 * @property {Object} quickConnConfig       - db's config of quick one connection
 * @property {Object} pool                  - db's connection pool tool
 * @property {function} throw
 * @property {function} newconn             - [warning: you shoundn't use] get a raw conn from mysql.js with quickConnConfig
 * @property {function} conn                - get a Object packaged a lasting conn and some methods
 * @property {function} sel                 - do select one-off
 * @property {function} upd                 - do update one-off
 * @property {function} ins                 - do insert one-off
 * @property {function} del                 - do delete one-off
 * @property {function} sql                 - do any sql one-off
 * @property {function} getDbs              - get all db's name
 * @property {function} getTbs              - get all tables' name from a db one-off
 * @property {function} getTbStruct         - get the struct of a table one-off
 * 
 */
var db = {
  name: 'db',
  type: 'Object',
  /**
   * db running mode, it's value must be "non-debug" or "debug", and default is "non-debug", under "debug" mode, the result will be complete and sql will be printed out. 
   * db 运行模式，它的值必须是"non-debug"或者"debug"，前者是初始默认值，在"debug"模式下，返回的结果将变得完整，并且sql语句将被打印出来
   * @type {string} "non-debug" | "debug"
   */
  mode: 'non-debug',
  /** 
   * @type {Object} default connection config
   * @property {string} host
   * @property {number} port
   * @property {string} user
   * @property {string} password
   * @property {string|undefined|null} database
   */
  quickConnConfig: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    /**
     * @type {string|undefined|null}
     */
    database: undefined
  },
  /** 
   * @type {Pool}
   */
  pool: pool,
  /**
   * a function to print the sql error in console
   * @function
   * @param {error} err 
   */
  "throw": function _throw(err) {
    console.log('【SQL ERROR】: ', err.message);
  },
  /**
   * this is a method to get a raw conn from mysql.js with db's quickConnConfig
   * @method
   * @returns {import("mysql").Connection}
   */
  newconn: function newconn() {
    return _mysql["default"].createConnection({
      host: this.quickConnConfig.host,
      port: this.quickConnConfig.port,
      user: this.quickConnConfig.user,
      password: this.quickConnConfig.password,
      database: this.quickConnConfig.database != null || this.quickConnConfig.database != '' ? this.quickConnConfig.database : undefined
    });
  },
  /**
   * @function conn
   * @param {string} host 
   * @param {number} port 
   * @param {string} user 
   * @param {string} pwd 
   * @param {string} database 
   * @returns {connOutPool} connOutPool    - an object contains a lasting connection and some packaged functions
   */
  conn: function () {
    var _conn2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(host, port, user, pwd, database) {
      var newconn, conntmp;
      return _regeneratorRuntime().wrap(function _callee30$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
          case 0:
            newconn = _mysql["default"].createConnection({
              host: host,
              port: port,
              user: user,
              password: pwd,
              database: database
            });
            /**
             * @type {ConnOutPool}
             * @property {import("mysql").Connection} conn  - mysql connection
             * @property {object} config                    - config of this mysql conn and it is changable
             * @property {function} sel                     - do select
             * @property {function} upd                     - do update
             * @property {function} ins                     - do insert
             * @property {function} del                     - do delete
             * @property {function} getDbs                  - select all databases' name
             * @property {function} getTbs                  - select all tables' name from a database
             * @property {function} getTbStruct             - get construction of one table
             * @property {function} switch                  - switch this conn to use another database
             * @property {function} close                   - destroy this conn
             */
            conntmp = {
              /**
               * @type {import("mysql").Connection}
               */
              conn: newconn,
              /**
               * @type {ConnConfig}
               */
              config: {
                host: host,
                port: port,
                user: user,
                password: pwd,
                database: database
              },
              /**
               * do select
               * @async
               * @function
               * @param {!string} sql  - select sql
               * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
               */
              sel: function sel(sql) {
                var _this12 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
                  return _regeneratorRuntime().wrap(function _callee21$(_context21) {
                    while (1) switch (_context21.prev = _context21.next) {
                      case 0:
                        _context21.next = 2;
                        return doSelect(_this12.conn, sql);
                      case 2:
                        return _context21.abrupt("return", _context21.sent);
                      case 3:
                      case "end":
                        return _context21.stop();
                    }
                  }, _callee21);
                }))();
              },
              /**
               * do update
               * @async
               * @function
               * @param {!string} sql - update sql
               * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
               */
              upd: function upd(sql) {
                var _this13 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
                  return _regeneratorRuntime().wrap(function _callee22$(_context22) {
                    while (1) switch (_context22.prev = _context22.next) {
                      case 0:
                        _context22.next = 2;
                        return doUpdate(_this13.conn, sql);
                      case 2:
                        return _context22.abrupt("return", _context22.sent);
                      case 3:
                      case "end":
                        return _context22.stop();
                    }
                  }, _callee22);
                }))();
              },
              /**
               * do insert
               * @async
               * @function
               * @param {!string} sql - insert sql
               * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
               */
              ins: function ins(sql) {
                var _this14 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
                  return _regeneratorRuntime().wrap(function _callee23$(_context23) {
                    while (1) switch (_context23.prev = _context23.next) {
                      case 0:
                        _context23.next = 2;
                        return doInsert(_this14.conn, sql);
                      case 2:
                        return _context23.abrupt("return", _context23.sent);
                      case 3:
                      case "end":
                        return _context23.stop();
                    }
                  }, _callee23);
                }))();
              },
              /**
               * do delete
               * @async
               * @function
               * @param {!string} sql - delete sql
               * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
               */
              del: function del(sql) {
                var _this15 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
                  return _regeneratorRuntime().wrap(function _callee24$(_context24) {
                    while (1) switch (_context24.prev = _context24.next) {
                      case 0:
                        _context24.next = 2;
                        return doDelete(_this15.conn, sql);
                      case 2:
                        return _context24.abrupt("return", _context24.sent);
                      case 3:
                      case "end":
                        return _context24.stop();
                    }
                  }, _callee24);
                }))();
              },
              newDb: function newDb(name, character, collation) {
                var _this16 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
                  var sql;
                  return _regeneratorRuntime().wrap(function _callee25$(_context25) {
                    while (1) switch (_context25.prev = _context25.next) {
                      case 0:
                        sql = "create database if not exists " + name;
                        if (character != null) {
                          sql = sql + " default character set " + character;
                        }
                        if (collation != null) {
                          sql = sql + " default collate " + collation;
                        }
                        _context25.next = 5;
                        return doFreeSql(_this16.conn, sql);
                      case 5:
                        return _context25.abrupt("return", _context25.sent);
                      case 6:
                      case "end":
                        return _context25.stop();
                    }
                  }, _callee25);
                }))();
              },
              delDb: function delDb(name) {
                var _this17 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26() {
                  var sql;
                  return _regeneratorRuntime().wrap(function _callee26$(_context26) {
                    while (1) switch (_context26.prev = _context26.next) {
                      case 0:
                        sql = "drop database if exists " + name;
                        _context26.next = 3;
                        return doFreeSql(_this17.conn, sql);
                      case 3:
                        return _context26.abrupt("return", _context26.sent);
                      case 4:
                      case "end":
                        return _context26.stop();
                    }
                  }, _callee26);
                }))();
              },
              /**
               * get all db's name
               * @async
               * @function
               * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of db names and the key is "dbname"
               */
              getDbs: function getDbs() {
                var _this18 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27() {
                  var sql;
                  return _regeneratorRuntime().wrap(function _callee27$(_context27) {
                    while (1) switch (_context27.prev = _context27.next) {
                      case 0:
                        sql = "select schema_name as dbname from information_schema.schemata";
                        _context27.next = 3;
                        return doSelect(_this18.conn, sql);
                      case 3:
                        return _context27.abrupt("return", _context27.sent);
                      case 4:
                      case "end":
                        return _context27.stop();
                    }
                  }, _callee27);
                }))();
              },
              /**
               * if dbname is not assigned clearly, it would be this conn default database
               * @async
               * @function
               * @param {string|undefined|null|""} dbname 
               * @returns {Promise<Array<Map<tbname,string>>} a promise, if success, it would be a list of table names and the key is "tbname", like [{ tbname: "user" }]
               */
              getTbs: function getTbs(dbname) {
                var _this19 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28() {
                  var sql;
                  return _regeneratorRuntime().wrap(function _callee28$(_context28) {
                    while (1) switch (_context28.prev = _context28.next) {
                      case 0:
                        if (dbname == undefined || dbname == "" || dbname == null) {
                          sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + _this19.config.database + '\'';
                        } else {
                          sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
                        }
                        _context28.next = 3;
                        return doSelect(_this19.conn, sql);
                      case 3:
                        return _context28.abrupt("return", _context28.sent);
                      case 4:
                      case "end":
                        return _context28.stop();
                    }
                  }, _callee28);
                }))();
              },
              /**
               * @async
               * @function
               * @param string tbname 
               * @returns {Promise<Array<Map<any,string>>} construction of a table
               */
              getTbStruct: function getTbStruct(tbname) {
                var _this20 = this;
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29() {
                  return _regeneratorRuntime().wrap(function _callee29$(_context29) {
                    while (1) switch (_context29.prev = _context29.next) {
                      case 0:
                        _context29.next = 2;
                        return showTbStruct(_this20.conn, tbname);
                      case 2:
                        return _context29.abrupt("return", _context29.sent);
                      case 3:
                      case "end":
                        return _context29.stop();
                    }
                  }, _callee29);
                }))();
              },
              /**
               * switch this conn to use another database
               * @function
               * @param {!string} dbname - the database's name you want switch to use
               */
              siwtch: function siwtch(dbname) {
                use(this.conn, dbname);
                this.config.database = dbname;
              },
              /**
               * destroy this conn
               * @function
               */
              close: function close() {
                this.conn.destroy();
                console.log('Ok, this conn has been destroyed');
              }
            };
            /**
             * @type {ConnOutPool}
             */
            return _context30.abrupt("return", conntmp);
          case 3:
          case "end":
            return _context30.stop();
        }
      }, _callee30);
    }));
    function conn(_x8, _x9, _x10, _x11, _x12) {
      return _conn2.apply(this, arguments);
    }
    return conn;
  }(),
  /**
   * do select in a random one-off conn with quickConnConfig
   * @async
   * @function
   * @param {!string} sql  - select sql
   * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
   */
  sel: function sel(sql) {
    var _this21 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31() {
      var newconn;
      return _regeneratorRuntime().wrap(function _callee31$(_context31) {
        while (1) switch (_context31.prev = _context31.next) {
          case 0:
            newconn = _this21.newconn();
            _context31.next = 3;
            return doSelect(newconn, sql, "once");
          case 3:
            return _context31.abrupt("return", _context31.sent);
          case 4:
          case "end":
            return _context31.stop();
        }
      }, _callee31);
    }))();
  },
  /**
   * do update in a random one-off conn with quickConnConfig
   * @async
   * @function
   * @param {!string} sql - update sql
   * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
   */
  upd: function upd(sql) {
    var _this22 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32() {
      var newconn;
      return _regeneratorRuntime().wrap(function _callee32$(_context32) {
        while (1) switch (_context32.prev = _context32.next) {
          case 0:
            newconn = _this22.newconn();
            _context32.next = 3;
            return doUpdate(newconn, sql, "once");
          case 3:
            return _context32.abrupt("return", _context32.sent);
          case 4:
          case "end":
            return _context32.stop();
        }
      }, _callee32);
    }))();
  },
  /**
   * do insert in a random one-off conn with quickConnConfig
   * @async
   * @function
   * @param {!string} sql - insert sql
   * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
   */
  ins: function ins(sql) {
    var _this23 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33() {
      var newconn;
      return _regeneratorRuntime().wrap(function _callee33$(_context33) {
        while (1) switch (_context33.prev = _context33.next) {
          case 0:
            newconn = _this23.newconn();
            _context33.next = 3;
            return doInsert(newconn, sql, "once");
          case 3:
            return _context33.abrupt("return", _context33.sent);
          case 4:
          case "end":
            return _context33.stop();
        }
      }, _callee33);
    }))();
  },
  /**
   * do delete in a random one-off conn with quickConnConfig
   * @async
   * @function
   * @param {!string} sql - delete sql
   * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
   */
  del: function del(sql) {
    var _this24 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34() {
      var newconn;
      return _regeneratorRuntime().wrap(function _callee34$(_context34) {
        while (1) switch (_context34.prev = _context34.next) {
          case 0:
            newconn = _this24.newconn();
            _context34.next = 3;
            return doDelete(newconn, sql, "once");
          case 3:
            return _context34.abrupt("return", _context34.sent);
          case 4:
          case "end":
            return _context34.stop();
        }
      }, _callee34);
    }))();
  },
  /**
   * you can put any sql into it, running with a random one-off conn
   * @param {!string} sql - free sql
   * @returns 
   */
  sql: function sql(_sql) {
    var _this25 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee35() {
      var newconn;
      return _regeneratorRuntime().wrap(function _callee35$(_context35) {
        while (1) switch (_context35.prev = _context35.next) {
          case 0:
            newconn = _this25.newconn();
            _context35.next = 3;
            return doFreeSql(newconn, _sql, "once");
          case 3:
            return _context35.abrupt("return", _context35.sent);
          case 4:
          case "end":
            return _context35.stop();
        }
      }, _callee35);
    }))();
  },
  newDb: function newDb(name, character, collation) {
    var _this26 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee36() {
      var sql, newconn;
      return _regeneratorRuntime().wrap(function _callee36$(_context36) {
        while (1) switch (_context36.prev = _context36.next) {
          case 0:
            sql = "create database if not exists " + name;
            if (character != null) {
              sql = sql + " default character set " + character;
            }
            if (collation != null) {
              sql = sql + " default collate " + collation;
            }
            newconn = _this26.newconn();
            _context36.next = 6;
            return doFreeSql(newconn, sql, "once");
          case 6:
            return _context36.abrupt("return", _context36.sent);
          case 7:
          case "end":
            return _context36.stop();
        }
      }, _callee36);
    }))();
  },
  delDb: function delDb(name) {
    var _this27 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee37() {
      var sql, newconn;
      return _regeneratorRuntime().wrap(function _callee37$(_context37) {
        while (1) switch (_context37.prev = _context37.next) {
          case 0:
            sql = "drop database if exists " + name;
            newconn = _this27.newconn();
            _context37.next = 4;
            return doFreeSql(newconn, sql, "once");
          case 4:
            return _context37.abrupt("return", _context37.sent);
          case 5:
          case "end":
            return _context37.stop();
        }
      }, _callee37);
    }))();
  },
  /**
   * get all db's name
   * @async
   * @function
   * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of dbnames and the key is "dbname"
   */
  getDbs: function getDbs() {
    var _this28 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee38() {
      var sql, newconn;
      return _regeneratorRuntime().wrap(function _callee38$(_context38) {
        while (1) switch (_context38.prev = _context38.next) {
          case 0:
            sql = "select schema_name as dbname from information_schema.schemata";
            newconn = _this28.newconn();
            _context38.next = 4;
            return doSelect(newconn, sql, "once");
          case 4:
            return _context38.abrupt("return", _context38.sent);
          case 5:
          case "end":
            return _context38.stop();
        }
      }, _callee38);
    }))();
  },
  /**
   * get tables' name from a db, running with a random one-off conn
   * @async
   * @function
   * @param {string|undefined|null|""} dbname - the name of the db you want to get all tables' name from. If you assign it with undefined, null, "" or don't pass it, the function will use this conn's default database
   * @returns {Promise<Array<Map<tbname,string>>} a promise, if success, it would be a list of tbnames and the key is "tbname"
   */
  getTbs: function getTbs(dbname) {
    var _this29 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee39() {
      var sql;
      return _regeneratorRuntime().wrap(function _callee39$(_context39) {
        while (1) switch (_context39.prev = _context39.next) {
          case 0:
            if (dbname == undefined || dbname == "" || dbname == null) {
              sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + _this29.quickConnConfig.database + '\'';
            } else {
              sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
            }
            _context39.next = 3;
            return doSelect(_this29.newconn(), sql, "once");
          case 3:
            return _context39.abrupt("return", _context39.sent);
          case 4:
          case "end":
            return _context39.stop();
        }
      }, _callee39);
    }))();
  },
  /**
   * get a tables' struct, running with a random one-off conn
   * @async
   * @function
   * @param {!string} tbname - the name of the that you want to its construction
   * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of db names and the key is "dbname"
   */
  getTbStruct: function getTbStruct(tbname) {
    var _this30 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee40() {
      var newconn;
      return _regeneratorRuntime().wrap(function _callee40$(_context40) {
        while (1) switch (_context40.prev = _context40.next) {
          case 0:
            newconn = _this30.newconn();
            _context40.next = 3;
            return showTbStruct(newconn, tbname, "once");
          case 3:
            return _context40.abrupt("return", _context40.sent);
          case 4:
          case "end":
            return _context40.stop();
        }
      }, _callee40);
    }))();
  }
};
// db.mode = "debug";

// db.quickConnConfig.database = 'SPRINGDEMO';

// let rs;

// rs = await db.getTbs();

// let conn = await db.conn("localhost",3306,"root","root","onlinemall");
// rs = await conn.getTbs();

// db.pool.init("localhost",3306,"root","root","onlinemall")
// rs = await db.pool.getTbs();

// let conn = await db.pool.conn();
// conn.siwtch("springdemo");
// rs = await conn.getTbs();

// console.log(rs);
// conn.close();
var _default = db;
exports["default"] = _default;