export const events = {
  NEW_GAME: 'new_game',
  JOIN_GAME: 'join_game',
  BEGIN_GAME: 'begin_game',
  SET_CONFIG: 'set_config',
  CHOOSE_INFECTED: 'choose_infected',
};

const phases = {
  INIT: 'init',
  JOINING: 'joining',
  SETUP: 'setup',
  INFECTING: 'infecting',
  DAY_PLANNING: 'day_planning',
  HIVEMIND_PLANNING: 'hivemind_planning',
  VOTING: 'voting',
  VICTORY: 'victory',
};


const default_game_state = {
  phase: phases.INIT,
  players: {},
  gamemaster: null,
  hivemind: null,
  infected: [],
  config: {
    infected_count: 1,
    task_count: 10,
    majority_vote_elimination: false,
  }
};

export function project_game_state(game_events, previous_game_state = default_game_state) {
  switch(game_events?.length) {
    case undefined:
    case 0:
      return previous_game_state;
    case 1:
      return phaseProjector[previous_game_state.phase](game_events[0], previous_game_state);
    default:
      last_game_state = previous_game_state;
      for (const game_event in game_events) {
        last_game_state = project_game_state([game_event], last_game_state);
      }
      return last_game_state;
  }
}

const phaseProjector = {
  [phases.INIT]: (game_event, previous_game_state) => {
    switch(game_event.event_type) {
      case events.NEW_GAME:
        const gamemaster_ref = game_event.sent_by;
        let players = {};
        players[gamemaster_ref] = game_event.nickname;
        return {
          ...previous_game_state,
          phase: phases.JOINING,
          players: players,
          gamemaster: gamemaster_ref,
        };
      default:
        return previous_game_state;
    }
  },
  [phases.JOINING]: (game_event, previous_game_state) => {
    switch(game_event.event_type) {
      case events.JOIN_GAME:
        let players = previous_game_state.players;
        players[game_event.sent_by] = game_event.nickname;
        return {
          ...previous_game_state,
          players: players,
        };
      case events.BEGIN_GAME:
        return {
          ...previous_game_state,
          phase: phases.SETUP,
        };
      default:
        return previous_game_state;
    }
  },
  [phases.SETUP]: (game_event, previous_game_state) => {
    switch(game_event.event_type) {
      default:
        return previous_game_state;
    }
  },
  [phases.INFECTING]: (game_event, previous_game_state) => {
    switch(game_event.event_type) {
      default:
        return previous_game_state;
    }
  },
  [phases.DAY_PLANNING]: (game_event, previous_game_state) => {
    switch(game_event.event_type) {
      default:
        return previous_game_state;
    }
  },
  [phases.HIVEMIND_PLANNING]: (game_event, previous_game_state) => {
    switch(game_event.event_type) {
      default:
        return previous_game_state;
    }
  },
  [phases.VOTING]: (game_event, previous_game_state) => {
    switch(game_event.event_type) {
      default:
        return previous_game_state;
    }
  },
  [phases.VICTORY]: (game_event, previous_game_state) => {
    switch(game_event.event_type) {
      default:
        return previous_game_state;
    }
  },
};
