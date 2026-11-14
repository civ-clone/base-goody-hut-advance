"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advance = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Action_1 = require("@civ-clone/core-goody-hut/Action");
const core_random_1 = require("@civ-clone/core-random");
/**
 * The hut gives the unit's player an advance: the one a ruleset chose, or else one of those it could research next, at
 * random.
 */
class Advance extends Action_1.default {
    constructor(goodyHut, unit, playerResearchRegistry = PlayerResearchRegistry_1.instance, randomNumberGenerator = core_random_1.instance, chosen = null) {
        super(goodyHut, unit);
        this._chosen = chosen;
        this._playerResearchRegistry = playerResearchRegistry;
        this._randomNumberGenerator = randomNumberGenerator;
    }
    /** The advance the ruleset chose, or `null` for one at random. */
    chosen() {
        return this._chosen;
    }
    perform() {
        const playerResearch = this._playerResearchRegistry.getByPlayer(this.unit().player());
        if (this._chosen !== null) {
            playerResearch.addAdvance(this._chosen);
            return;
        }
        const availableResearch = playerResearch.available(), RandomAdvance = availableResearch[Math.floor(availableResearch.length * this._randomNumberGenerator())];
        playerResearch.addAdvance(RandomAdvance);
    }
}
exports.Advance = Advance;
Advance.transient = [
    '_playerResearchRegistry',
    '_randomNumberGenerator',
];
exports.default = Advance;
//# sourceMappingURL=Advance.js.map