import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import Action from '@civ-clone/core-goody-hut/Action';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import ScienceAdvance from '@civ-clone/core-science/Advance';
import Unit from '@civ-clone/core-unit/Unit';
import { instance as rngInstance } from '@civ-clone/core-random';

/**
 * The hut gives the unit's player an advance: the one a ruleset chose, or else one of those it could research next, at
 * random.
 */
export class Advance extends Action {
  static readonly transient = [
    '_playerResearchRegistry',
    '_randomNumberGenerator',
  ];
  private _chosen: typeof ScienceAdvance | null;
  private _playerResearchRegistry: PlayerResearchRegistry;
  private _randomNumberGenerator: () => number;

  constructor(
    goodyHut: GoodyHut,
    unit: Unit,
    playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
    randomNumberGenerator: () => number = rngInstance,
    chosen: typeof ScienceAdvance | null = null
  ) {
    super(goodyHut, unit);

    this._chosen = chosen;
    this._playerResearchRegistry = playerResearchRegistry;
    this._randomNumberGenerator = randomNumberGenerator;
  }

  /** The advance the ruleset chose, or `null` for one at random. */
  chosen(): typeof ScienceAdvance | null {
    return this._chosen;
  }

  perform(): void {
    const playerResearch = this._playerResearchRegistry.getByPlayer(
      this.unit().player()
    );

    if (this._chosen !== null) {
      playerResearch.addAdvance(this._chosen);

      return;
    }

    const availableResearch = playerResearch.available(),
      RandomAdvance: typeof ScienceAdvance =
        availableResearch[
          Math.floor(availableResearch.length * this._randomNumberGenerator())
        ];

    playerResearch.addAdvance(RandomAdvance);
  }
}

export default Advance;
