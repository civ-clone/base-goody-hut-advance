"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _playerResearchRegistry, _randomNumberGenerator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advance = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Action_1 = require("@civ-clone/core-goody-hut/Action");
class Advance extends Action_1.default {
    constructor(goodyHut, unit, playerResearchRegistry = PlayerResearchRegistry_1.instance, randomNumberGenerator = () => Math.random()) {
        super(goodyHut, unit);
        _playerResearchRegistry.set(this, void 0);
        _randomNumberGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _playerResearchRegistry, playerResearchRegistry);
        __classPrivateFieldSet(this, _randomNumberGenerator, randomNumberGenerator);
    }
    perform() {
        const playerResearch = __classPrivateFieldGet(this, _playerResearchRegistry).getByPlayer(this.unit().player()), availableResearch = playerResearch.available(), RandomAdvance = availableResearch[Math.floor(availableResearch.length * __classPrivateFieldGet(this, _randomNumberGenerator).call(this))];
        playerResearch.addAdvance(RandomAdvance);
    }
}
exports.Advance = Advance;
_playerResearchRegistry = new WeakMap(), _randomNumberGenerator = new WeakMap();
exports.default = Advance;
//# sourceMappingURL=Advance.js.map