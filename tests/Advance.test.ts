import Action from '@civ-clone/core-goody-hut/Action';
import Advance from '../Advance';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import PlayerResearchRegistry from '@civ-clone/core-science/PlayerResearchRegistry';
import PlayerUnit from '@civ-clone/core-unit/Unit';
import ScienceAdvance from '@civ-clone/core-science/Advance';
import { expect } from 'chai';

class First extends ScienceAdvance {}
class Second extends ScienceAdvance {}
class Third extends ScienceAdvance {}

// Stand-ins: the action asks the unit for its player and the registry for that player's research.
const setUp = () => {
  const added: (typeof ScienceAdvance)[] = [],
    rolls: number[] = [],
    player = {},
    playerResearchRegistry = {
      getByPlayer: (asked: unknown) => {
        expect(asked).equal(player);

        return {
          available: () => [First, Second],
          addAdvance: (AdvanceType: typeof ScienceAdvance) =>
            added.push(AdvanceType),
        };
      },
    } as unknown as PlayerResearchRegistry,
    unit = { player: () => player } as unknown as PlayerUnit,
    rng = (): number => {
      rolls.push(0.6);

      return 0.6;
    };

  return { added, playerResearchRegistry, rng, rolls, unit };
};

describe('Advance', (): void => {
  it('is a goody-hut action, matched by its class name', (): void => {
    const { playerResearchRegistry, rng, unit } = setUp();

    expect(
      new Advance({} as GoodyHut, unit, playerResearchRegistry, rng)
    ).instanceOf(Action);
    expect(Advance.name).equal('Advance');
  });

  it('gives one of the advances the player could research, at random, as before', (): void => {
    const { added, playerResearchRegistry, rng, rolls, unit } = setUp(),
      action = new Advance({} as GoodyHut, unit, playerResearchRegistry, rng);

    expect(action.chosen()).equal(null);

    action.perform();

    expect(added).eql([Second]);
    expect(rolls).length(1);
  });

  it('gives the advance a ruleset chose, without a roll', (): void => {
    const { added, playerResearchRegistry, rng, rolls, unit } = setUp(),
      action = new Advance(
        {} as GoodyHut,
        unit,
        playerResearchRegistry,
        rng,
        Third
      );

    expect(action.chosen()).equal(Third);

    action.perform();

    expect(added).eql([Third]);
    expect(rolls).length(0);
  });
});
