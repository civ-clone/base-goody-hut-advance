"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Advance_playerResearchRegistry, _Advance_randomNumberGenerator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advance = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Action_1 = require("@civ-clone/core-goody-hut/Action");
class Advance extends Action_1.default {
    constructor(goodyHut, unit, playerResearchRegistry = PlayerResearchRegistry_1.instance, randomNumberGenerator = () => Math.random()) {
        super(goodyHut, unit);
        _Advance_playerResearchRegistry.set(this, void 0);
        _Advance_randomNumberGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _Advance_playerResearchRegistry, playerResearchRegistry, "f");
        __classPrivateFieldSet(this, _Advance_randomNumberGenerator, randomNumberGenerator, "f");
    }
    perform() {
        const playerResearch = __classPrivateFieldGet(this, _Advance_playerResearchRegistry, "f").getByPlayer(this.unit().player()), availableResearch = playerResearch.available(), RandomAdvance = availableResearch[Math.floor(availableResearch.length * __classPrivateFieldGet(this, _Advance_randomNumberGenerator, "f").call(this))];
        playerResearch.addAdvance(RandomAdvance);
    }
}
exports.Advance = Advance;
_Advance_playerResearchRegistry = new WeakMap(), _Advance_randomNumberGenerator = new WeakMap();
exports.default = Advance;
//# sourceMappingURL=Advance.js.map