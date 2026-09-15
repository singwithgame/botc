import type { PublicRoomState, SecretRoomState } from '../types/game';
import { handleDemonDeath, checkWinCondition } from './gameLogic';

export function checkVirginTrigger(
  nominatorSecret: any,
  askSpyExecute: () => boolean
): boolean {
  if (nominatorSecret?.alignment === 'good' && !['butler', 'drunk', 'recluse', 'saint'].includes(nominatorSecret.character || '')) {
    return true;
  } else if (nominatorSecret?.character === 'spy') {
    if (askSpyExecute()) {
      return true;
    }
  }
  return false;
}

export function executeVirginPower(
  roomState: PublicRoomState,
  secretState: SecretRoomState,
  nominatorUid: string,
  targetUid: string,
  roomId: string,
  nominatorName: string
) {
  const pubClone = JSON.parse(JSON.stringify(roomState));
  const secClone = JSON.parse(JSON.stringify(secretState));
  
  pubClone.players[nominatorUid].isDead = true;
  pubClone.players[nominatorUid].hasGhostVote = true;
  pubClone.lastExecutedUid = nominatorUid;
  secClone.players[targetUid].isUsed = true; 

  if (secClone.players[nominatorUid]?.character === 'imp') {
    const inherited = handleDemonDeath(pubClone, secClone, false, nominatorUid);
    if (inherited) {
      secClone.dayLogs = secClone.dayLogs || {};
      secClone.dayLogs[roomState.dayNumber] = secClone.dayLogs[roomState.dayNumber] || { nominations: [], executedUid: null, abilityLogs: [] };
      secClone.dayLogs[roomState.dayNumber].abilityLogs = secClone.dayLogs[roomState.dayNumber].abilityLogs || [];
      secClone.dayLogs[roomState.dayNumber].abilityLogs.push(`※ [시스템] 조건 충족으로 새로운 악마(임프)가 계승되었습니다.`);
    }
  }

  const winResult = checkWinCondition(pubClone, secClone);
  
  secClone.dayLogs = secClone.dayLogs || {};
  secClone.dayLogs[roomState.dayNumber] = {
    ...secClone.dayLogs[roomState.dayNumber],
    nominations: pubClone.nominationHistory || [],
    executedUid: pubClone.lastExecutedUid || null,
    abilityLogs: [...(secClone.dayLogs[roomState.dayNumber]?.abilityLogs || []), `처녀(Virgin) 능력 발동: 지목자 ${nominatorName} 즉시 처형`]
  };

  let updates: Record<string, any> = {};

  if (winResult) {
    pubClone.status = 'end';
    pubClone.winner = winResult.winner;
    
    const winningPlayers = Object.values(pubClone.players).map((p: any) => {
      const secret = secClone.players[p.uid];
      return {
        name: p.name,
        character: secret?.character || null,
        originalCharacter: secret?.originalCharacter || null,
        fakeCharacter: secret?.fakeCharacter || null,
        isRedHerring: secret?.isRedHerring || false,
        alignment: secret?.alignment || null
      };
    }).filter((p: any) => p.alignment === pubClone.winner);
    
    pubClone.winningPlayers = winningPlayers;

    const newId = `${Date.now()}_${roomId}`;
    const historyRecord = {
      id: newId,
      timestamp: Date.now(),
      winner: pubClone.winner,
      winReason: winResult.reason,
      evilInfo: secClone.evilInfo || null,
      players: Object.values(pubClone.players).map((p: any) => ({
        uid: p.uid,
        name: p.name,
        character: secClone.players[p.uid]?.character || null,
        originalCharacter: secClone.players[p.uid]?.originalCharacter || null,
        fakeCharacter: secClone.players[p.uid]?.fakeCharacter || null,
        isRedHerring: secClone.players[p.uid]?.isRedHerring || false,
        messageHistory: secClone.players[p.uid]?.messageHistory || []
      })),
      dayLogs: secClone.dayLogs
    };
    updates[`history/${newId}`] = historyRecord;
  } else {
    pubClone.status = 'night';
    pubClone.dayNumber += 1;
    
    updates[`public/rooms/${roomId}/usedNominators`] = [];
    updates[`public/rooms/${roomId}/usedTargets`] = [];
    updates[`public/rooms/${roomId}/nominationHistory`] = [];
  }

  updates[`public/rooms/${roomId}/status`] = pubClone.status;
  if (pubClone.status === 'night') {
    updates[`public/rooms/${roomId}/dayNumber`] = pubClone.dayNumber;
  } else if (pubClone.status === 'end') {
    updates[`public/rooms/${roomId}/winner`] = pubClone.winner;
    updates[`public/rooms/${roomId}/winReason`] = pubClone.winReason;
    updates[`public/rooms/${roomId}/winningPlayers`] = pubClone.winningPlayers;
  }
  
  updates[`public/rooms/${roomId}/players/${nominatorUid}/isDead`] = true;
  updates[`public/rooms/${roomId}/players/${nominatorUid}/hasGhostVote`] = true;
  updates[`public/rooms/${roomId}/lastExecutedUid`] = nominatorUid;

  updates[`secret/rooms/${roomId}`] = secClone;

  return updates;
}
