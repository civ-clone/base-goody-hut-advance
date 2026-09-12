"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advance = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Action_1 = require("@civ-clone/core-goody-hut/Action");
const core_random_1 = require("@civ-clone/core-random");
class Advance extends Action_1.default {
    constructor(goodyHut, unit, playerResearchRegistry = PlayerResearchRegistry_1.instance, randomNumberGenerator = core_random_1.instance) {
        super(goodyHut, unit);
        this._playerResearchRegistry = playerResearchRegistry;
        this._randomNumberGenerator = randomNumberGenerator;
    }
    perform() {
        const playerResearch = this._playerResearchRegistry.getByPlayer(this.unit().player()), availableResearch = playerResearch.available(), RandomAdvance = availableResearch[Math.floor(availableResearch.length * this._randomNumberGenerator())];
        playerResearch.addAdvance(RandomAdvance);
    }
}
exports.Advance = Advance;
exports.default = Advance;
//# sourceMappingURL=Advance.js.map