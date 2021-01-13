import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import Action from '@civ-clone/core-goody-hut/Action';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import ScienceAdvance from '@civ-clone/core-science/Advance';
import Unit from '@civ-clone/core-unit/Unit';

export class Advance extends Action {
  #playerResearchRegistry: PlayerResearchRegistry;
  #randomNumberGenerator: () => number;

  constructor(
    goodyHut: GoodyHut,
    unit: Unit,
    playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
    randomNumberGenerator: () => number = () => Math.random()
  ) {
    super(goodyHut, unit);

    this.#playerResearchRegistry = playerResearchRegistry;
    this.#randomNumberGenerator = randomNumberGenerator;
  }

  perform(): void {
    const playerResearch = this.#playerResearchRegistry.getByPlayer(
        this.unit().player()
      ),
      availableResearch = playerResearch.available(),
      RandomAdvance: typeof ScienceAdvance =
        availableResearch[
          Math.floor(availableResearch.length * this.#randomNumberGenerator())
        ];
    playerResearch.addAdvance(RandomAdvance);
  }
}

export default Advance;
