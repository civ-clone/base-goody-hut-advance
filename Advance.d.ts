import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import Action from '@civ-clone/core-goody-hut/Action';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import ScienceAdvance from '@civ-clone/core-science/Advance';
import Unit from '@civ-clone/core-unit/Unit';
/**
 * The hut gives the unit's player an advance: the one a ruleset chose, or else one of those it could research next, at
 * random.
 */
export declare class Advance extends Action {
  static readonly transient: string[];
  private _chosen;
  private _playerResearchRegistry;
  private _randomNumberGenerator;
  constructor(
    goodyHut: GoodyHut,
    unit: Unit,
    playerResearchRegistry?: PlayerResearchRegistry,
    randomNumberGenerator?: () => number,
    chosen?: typeof ScienceAdvance | null
  );
  /** The advance the ruleset chose, or `null` for one at random. */
  chosen(): typeof ScienceAdvance | null;
  perform(): void;
}
export default Advance;
