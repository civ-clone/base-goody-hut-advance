"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advance = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Action_1 = require("@civ-clone/core-goody-hut/Action");
class Advance extends Action_1.default {
    constructor(goodyHut, unit, playerResearchRegistry = PlayerResearchRegistry_1.instance, randomNumberGenerator = () => Math.random()) {
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