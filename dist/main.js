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

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DIRS = [\n    [0, -1],\n    [0, 1],\n    [1, 0],\n    [-1,0]\n]\n\nclass Player {\n    \n    constructor(x, y, tileSize, velocity, tileMap) {\n        this.x = x; \n        this.y = y;\n        this.tileSize = tileSize; \n        this.velocity = velocity;\n        this.tileMap = tileMap;\n        \n        // const spriteCols = 10;\n        // const spriteRows = 6;\n        // const totalFrames = 6\n\n        this.currentFrame = 0;\n        this.framesDrawn = 0;\n\n        this.playerImage = new Image ();\n        // this.playerImage.src = \"../graphics/sprites/characters/player.png\" // idk how to use sprite sheets.. so I used the rock... \n        this.playerImage.src = 'graphics/sprites/objects/rock_in_water_01.png'\n\n        this.currentMovingDirection = null;\n\n        document.addEventListener('keydown', this._keydown) // \n        document.addEventListener('keyup', this._keyup) // listener to set player current moving direction to null if they let go of a direction.\n\n    }\n\n\n    animate(ctx) {\n        //288 x 480\n        // requestAnimationFrame(animate)\n\n        // currentFrame = this.currentFrame % totalFrames;\n\n        // let srcX = this.currentFrame * this.tileSize / 6;\n        // let srcY = 20;\n\n\n        ctx.drawImage(this.playerImage, this.x, this.y, this.tileSize, this.tileSize)\n\n        \n        \n        // this.framesDrawn++;\n        // if (this.framesDrawn >= 10){\n        //     this.currentFrame++;\n        //     this.framesDrawn = 0;\n        // }\n \n    }\n\n\n    _keydown =(event) => {\n        // debugger \n        if (event.key === 'ArrowUp'){\n            this.currentMovingDirection = DIRS[0];\n        } else if (event.key === 'ArrowDown'){\n            this.currentMovingDirection = DIRS[1];\n        } else if (event.key === 'ArrowLeft'){\n            this.currentMovingDirection = DIRS[3];\n        } else if (event.key === 'ArrowRight'){\n            this.currentMovingDirection = DIRS[2];\n        }\n        // console.log('down')\n\n        this.move();\n    }\n\n    // _keyup =(event) => {\n    //     // console.log('up')\n    //     this.currentMovingDirection = null;\n    // }\n\n    \n\n    draw(ctx) {\n        // ctx.drawImage(this)\n    }\n\n    move() {\n        this.y = this.currentMovingDirection[1]*10 + this.y;\n        this.x = this.currentMovingDirection[0]*10 + this.x;\n        // console.log(this.x)\n        // console.log(this.y)\n        // console.log(this.currentMovingDirection)\n        \n    }\n\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://ravine_proj/./src/Player.js?");

/***/ }),

/***/ "./src/TileMap.js":
/*!************************!*\
  !*** ./src/TileMap.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player.js */ \"./src/Player.js\");\n\n\nclass TileMap {\n    \n    constructor(tileSize) {\n        this.tileSize = tileSize;\n        this.grass = new Image();\n        this.grass.src = \"../graphics/sprites/tilesets/grass.png\"\n    }\n    \n    // P = player\n    theMap = [\n        [' ', 'P', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],\n        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']\n    ]\n\n    draw(ctx) {\n        // debugger\n        for (let row = 0; row < this.theMap.length; row++) {\n            for (let col = 0; col < this.theMap[row].length; col++) {\n                let tile = this.theMap[row][col];\n                if (tile === 'P') {\n                    // logic to denote what to render given the value in the theMap array.\n                    // for now, just trying to render grass.. \n                    // this._drawGrass, but also render the player or something so that I can use a player to manip..\n                    this._drawGrass(ctx, col, row, this.tileSize);\n                    // this.getPlayer()\n\n                } else {\n                    // debugger\n                    this._drawGrass(ctx, col, row, this.tileSize);\n                }\n            }\n        }\n    }\n\n    _drawGrass (ctx, col, row, size) {\n        ctx.drawImage(this.grass, col * this.tileSize, row *this.tileSize, size, size)\n    }\n\n    getPlayer(velocity) {\n        for (let row = 0; row < this.theMap.length; row++) {\n            for (let col = 0; col < this.theMap[row].length; col++) {\n                let tile = this.theMap[row][col];\n                if (tile === \"P\") {\n                    return new _Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](col *this.tileSize, row * this.tileSize, this.tileSize, velocity, this)\n                }\n            }\n        }\n\n    }\n\n    setCanvasSize(canvas) {\n        canvas.width = (this.theMap[0].length * this.tileSize);\n        canvas.height = (this.theMap.length * this.tileSize);\n    }\n\n\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TileMap);\n\n//# sourceURL=webpack://ravine_proj/./src/TileMap.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TileMap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TileMap.js */ \"./src/TileMap.js\");\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player.js */ \"./src/Player.js\");\nconsole.log('hellos from index')\n;\n\n\n// game info so far... \n// map size will be 30 x 20 squares. \n// tile size 16 x 16 pixels also. \n\nconst canvas = document.getElementById('game-canvas'); // gathered my html elements that I will be working in. \nconst ctx = canvas.getContext('2d'); // all rendering takes place on the ctx. \n\nconst tileSize = 16;\nconst theTileMapInstance = new _TileMap_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tileSize);\nconst player = theTileMapInstance.getPlayer()\n\n\nfunction gameLoop() { // layer draw calls to create layers\n    theTileMapInstance.draw(ctx)\n    // debugger\n    player.animate(ctx)\n}\n\ntheTileMapInstance.setCanvasSize(canvas);\n\nsetInterval(gameLoop, 1000/75);\n\n//# sourceURL=webpack://ravine_proj/./src/index.js?");

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