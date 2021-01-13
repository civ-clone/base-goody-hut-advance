import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import Action from '@civ-clone/core-goody-hut/Action';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import Unit from '@civ-clone/core-unit/Unit';
export declare class Advance extends Action {
  #private;
  constructor(
    goodyHut: GoodyHut,
    unit: Unit,
    playerResearchRegistry?: PlayerResearchRegistry,
    randomNumberGenerator?: () => number
  );
  perform(): void;
}
export default Advance;
