/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/EnvObject.js":
/*!**************************!*\
  !*** ./src/EnvObject.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\n\nclass EnvObject {\n\n    //let rock = new EnvObject(col * this.tileSize, col * this.tileSize, this.tileSize, this.tileMap)\n     \n    constructor(x, y, tileSize, velocity, tileMap, hitboxXOffset = 0, hitboxYOffset = 0) {\n        this.x = x;\n        this.y = y;\n        this.tileSize = tileSize;\n        this.velocity = velocity;\n        this.tileMap = tileMap;\n\n        this.hitboxes = new _utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.x, this.y, this.tileSize, this.tileSize, hitboxXOffset, hitboxYOffset);\n    }\n\n    drawHitboxes(ctx) { // for debugging to see a semitransparent hitbox on all env objects like a rock.\n        // this.hitboxes.forEach((hitbox) => hitbox._debugDraw(ctx))\n        this.hitboxes._debugDraw(ctx);\n    }\n\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EnvObject);\n\n//# sourceURL=webpack://ravine_proj/./src/EnvObject.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DIRS = [\n    [0, -1],\n    [0, 1],\n    [1, 0],\n    [-1,0]\n]\n\nclass Player {\n    \n    constructor(x, y, tileSize, velocity, tileMap) {\n        this.x = x; \n        this.y = y;\n        this.tileSize = tileSize; \n        this.velocity = velocity;\n        this.tileMap = tileMap;\n        \n        // const spriteCols = 10;\n        // const spriteRows = 6;\n        // const totalFrames = 6\n\n        this.currentFrame = 0;\n        this.framesDrawn = 0;\n\n        this.playerImage = new Image ();\n        this.playerImage.src = \"../graphics/sprites/characters/player.png\" // idk how to use sprite sheets.. so I used the rock... \n        // this.playerImage.src = '../graphics/sprites/objects/rock_in_water_01.png'\n\n        this.currentMovingDirection = null;\n\n        document.addEventListener('keydown', this._keydown) // \n        document.addEventListener('keyup', this._keyup) // listener to set player current moving direction to null if they let go of a direction.\n\n        this.currentFrame = 0;\n\n        this.lastMovingDirection;\n\n    }\n\n\n    animate(ctx) {\n        //288 x 480\n        // requestAnimationFrame(animate)\n\n        // currentFrame = this.currentFrame % totalFrames;\n\n        let srcX = this.currentFrame * 48 % 288;\n        let srcY;\n\n        // switch(srcY) {\n        if (this.currentMovingDirection === DIRS[2]){ // right\n            srcY = 208;\n        } else if (this.currentMovingDirection === DIRS[0]){ // up\n            srcY = 255;\n        } else if (this.currentMovingDirection === DIRS[1]){ // down\n            srcY = 158;\n        } else if (this.currentMovingDirection === DIRS[3]){ // left\n            srcY = 208;  \n            srcX = (this.currentFrame * 48 % 288) * 1\n        } else {\n            if (this.lastMovingDirection === DIRS[2]){        // right idle\n                srcY = 64;\n            } else if (this.lastMovingDirection === DIRS[0]){ // up idle\n                srcY = 110;\n            } else if (this.lastMovingDirection === DIRS[3]){ // left idle... same as right idle lmao\n                srcY = 64;\n            } else {                                          // down idle\n                srcY = 16;\n            }\n        }\n\n        // really ugly code to mirror the right animation run.. :T\n        if (this.currentMovingDirection === DIRS[3]) {\n            ctx.save();\n            ctx.scale(-1, 1);\n            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, -this.x - 1, this.y -15, -32, 32)\n            ctx.restore();\n        } else if (this.currentMovingDirection === null && this.lastMovingDirection === DIRS[3]) {\n            ctx.save();\n            ctx.scale(-1, 1);\n            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, -this.x - 1, this.y -15, -32, 32)\n            ctx.restore();\n        } else { \n            // ctx.save()\n            ctx.drawImage(this.playerImage, srcX, srcY, 32, 32, this.x -17, this.y -15, 32, 32)\n            // ctx.restore()\n        }    \n        \n        \n        this.framesDrawn++;\n        if (this.framesDrawn >= 12){\n            this.currentFrame++;\n            this.framesDrawn = 0;\n        }\n \n    }\n\n\n    _keydown =(event) => {\n        // debugger \n        if (event.key === 'ArrowUp'){\n            this.currentMovingDirection = DIRS[0];\n        } else if (event.key === 'ArrowDown'){\n            this.currentMovingDirection = DIRS[1];\n        } else if (event.key === 'ArrowLeft'){\n            this.currentMovingDirection = DIRS[3];\n        } else if (event.key === 'ArrowRight'){\n            this.currentMovingDirection = DIRS[2];\n        }\n        // console.log('down')\n\n        // while (!!this.currentMovingDirection) {\n            \n            \n        \n    }\n\n    _keyup =(event) => {\n        // console.log('up')\n        this.lastMovingDirection = this.currentMovingDirection;\n        this.currentMovingDirection = null;\n    }\n\n    \n\n    draw(ctx) {\n        // ctx.drawImage(this)\n    }\n\n    move() {\n\n        if (!!this.currentMovingDirection){\n            this.y = this.currentMovingDirection[1]* this.velocity + this.y;\n            this.x = this.currentMovingDirection[0]* this.velocity + this.x;\n        }\n        // console.log([this.x, this.y])\n        // console.log(this.x)\n        // console.log(this.y)\n        // console.log(this.currentMovingDirection)\n        \n    }\n\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://ravine_proj/./src/Player.js?");

/***/ }),

/***/ "./src/TileMap.js":
/*!************************!*\
  !*** ./src/TileMap.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player.js */ \"./src/Player.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _EnvObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EnvObject.js */ \"./src/EnvObject.js\");\n\n\n\n\n\n\nclass TileMap {\n    \n    constructor(tileSize) {\n        this.tileSize = tileSize;\n        this.grass = new Image();\n        this.grass.src = \"../graphics/sprites/tilesets/grass.png\"\n        this.water = new Image();\n        this.water.src = '../graphics/sprites/tilesets/water2.png'\n        this.wro = new Image();\n        this.wro.src = '../graphics/sprites/objects/rock_in_water_01.png'\n    }\n\n    \n    \n    // P = player\n    theMap = [\n        ['W',  'W',  'W',  'W',  'W', 'W', 'W', 'W',  'W', 'W', 'W', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W', 'M2', 'M1',  'W', 'Wr', 'W', 'W', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W', 'M3', 'M4',  'W',  'W', 'W', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  'W',  'W',  'W',  'W', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  'W',  'W', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  'W', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  'P',  ' ',  ' ', ' ', ' ', ' ', 'Wr', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  ' ',  ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        ['W',  'W',  'W',  'W',  ' ', ' ', ' ', ' ',  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']\n    ]\n\n    draw(ctx) {\n        // debugger\n        for (let row = 0; row < this.theMap.length; row++) {\n            for (let col = 0; col < this.theMap[row].length; col++) {\n                let tile = this.theMap[row][col];\n                if (tile === 'P') {\n                    // logic to denote what to render given the value in the theMap array.\n                    // for now, just trying to render grass.. \n                    // this._drawGrass, but also render the player or something so that I can use a player to manip..\n                    this._drawGrass(ctx, col, row, this.tileSize);\n                    // this.getPlayer()\n                } else if (tile === \"W\") {\n                    this._drawWater(ctx, 25, 20, col, row, this.tileSize);\n                } else if (tile === \"M1\") {\n                    this._drawWater(ctx, 80, 0, col, row, this.tileSize); // top right corner!!\n                } else if (tile === \"M2\") {\n                    this._drawWater(ctx, 64 ,0, col, row, this.tileSize); //\n                \n                } else if (tile === \"M3\") {\n                    this._drawWater(ctx, 64, 16, col, row, this.tileSize);\n                    \n                } else if (tile === \"M4\") {\n                    this._drawWater(ctx, 80, 16, col, row, this.tileSize);\n                } else if (tile === \"Wr\") {    \n                    this._drawWro(ctx, col, row, this.tileSize);\n                } else {\n                    // debugger\n                    this._drawGrass(ctx, col, row, this.tileSize);\n                }\n            }\n        }\n    }\n\n    _drawWater (ctx, srcX, srcY, col, row, size) {\n        ctx.drawImage(this.water, srcX, srcY, size, size, col * this.tileSize, row * this.tileSize, size, size)\n    }\n\n    _drawWro (ctx, col, row, size) {\n        ctx.drawImage(this.wro, col * this.tileSize, row *this.tileSize, size, size)\n    }\n\n    _drawGrass (ctx, col, row, size) {\n        ctx.drawImage(this.grass, col * this.tileSize, row *this.tileSize, size, size)\n    }\n\n    getPlayer(velocity) {\n        for (let row = 0; row < this.theMap.length; row++) {\n            for (let col = 0; col < this.theMap[row].length; col++) {\n                let tile = this.theMap[row][col];\n                if (tile === \"P\") {\n                    return new _Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](col *this.tileSize, row * this.tileSize, this.tileSize, velocity, this)\n                }\n            }\n        }\n\n    }\n\n    getObjects() {\n        let objectsCollection = [];\n        for (let row = 0; row < this.theMap.length; row++) {\n            for (let col = 0; col < this.theMap[row].length; col++) {\n                let tile = this.theMap[row][col];\n                if (tile === \"Wr\") {\n                    let rock = new _EnvObject_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](col * this.tileSize, row * this.tileSize, this.tileSize, 0, this)\n                    objectsCollection.push(rock);\n                    console.log(objectsCollection)\n                }\n            }\n        }\n        return objectsCollection;\n    }\n\n    setCanvasSize(canvas) {\n        canvas.width = (this.theMap[0].length * this.tileSize);\n        canvas.height = (this.theMap.length * this.tileSize);\n    }\n\n\n\n}\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TileMap);\n\n//# sourceURL=webpack://ravine_proj/./src/TileMap.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TileMap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TileMap.js */ \"./src/TileMap.js\");\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player.js */ \"./src/Player.js\");\nconsole.log('hellos from index')\n;\n\n\n// game info so far... \n// map size will be 30 x 20 squares. \n// tile size 16 x 16 pixels also. \n\nconst canvas = document.getElementById('game-canvas'); // gathered my html elements that I will be working in. \nconst ctx = canvas.getContext('2d'); // all rendering takes place on the ctx. \n\nconst tileSize = 16;\nconst theTileMapInstance = new _TileMap_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tileSize);\n\n\nconst player = theTileMapInstance.getPlayer(1);\n\nconst envObjects = theTileMapInstance.getObjects();\nconsole.log(envObjects);\n// debugger\n\n\nfunction gameRender() { // layer draw calls to create layers\n    theTileMapInstance.draw(ctx)\n    // debugger\n    player.animate(ctx)\n    // console.log(\"hello\")\n    player.move();\n    envObjects.forEach((obj) => obj.drawHitboxes(ctx));\n}\n\ntheTileMapInstance.setCanvasSize(canvas);\n\nsetInterval(gameRender, 1000/75);\n\n// order logic =>\n\n// TileMap.js handles rendering logic. \n// hitboxes handles collision detection only!\n// each class will have their own move() function which will handle collision logic and what to do.\n// separate player class. with a hitbox instance tied on an attribute. \n// separate envionmental objects class. with a hitbox also tied. \n// \n\n//# sourceURL=webpack://ravine_proj/./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Hitbox { // hitbox logic... \n               // track x, y positions in the game world. \n               // track height and width of the hitbox. \n               // MUST loop through all combinations of hitboxes to detect collisions. \n               // isColliding(target, checkingWith) => `target.collisionState = true` && return true if target and checking with colliding.\n               // \n               // Currently thinking of adding an x and y offset so I can attach accurate hitboxes to all the game assets.\n               // whenever a new object is made, hitboxes are tied to it through a callback. \n    constructor(x, y, width, height, xOffset = 0, yOffset = 0){\n\n        this.x = x;\n        this.y = y;\n\n        this.xOffset = xOffset;\n        this.yOffset = yOffset;\n\n        this.width = width;\n        this.height = height;\n\n        this.collisionState = false;\n\n        this.debugImage = new Image();\n        this.debugImage.src = '../graphics/debug.png';\n\n    }\n\n    _debugDraw(ctx) {\n        // debugger\n        ctx.drawImage(this.debugImage, 0, 0, 16, 16, this.x + this.xOffset, this.y + this.yOffset, this.width, this.height)\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hitbox);\n\n//# sourceURL=webpack://ravine_proj/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;