const MONSTER_ATTACK_VALUE = 15;
const ATTACK_VALUE = 12;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 30;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STONGER_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = prompt("Maximum life for you and the monster.", "100");

let maxLife = parseInt(enteredValue);

if (isNaN(maxLife) || maxLife <= 0) {
  maxLife = 100;
}

adjustHealthBars(maxLife);

let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;
let hasBonusLife = true;

function reset() {
  currentPlayerHealth = maxLife;
  currentMonsterHealth = maxLife;
  resetGame(maxLife);
}

let battleLog = [];

function writeToLog(event, value, monsterHealth, playerHealth) {
  logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = "MONSTER";
  }
  if (event === LOG_EVENT_PLAYER_STONGER_ATTACK) {
    logEntry.target = "MONSTER";
  }
  if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = "PLAYER";
  }
  battleLog.push(logEntry);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You would be dead but bonus life saved you");
  }
  if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "DRAW",
      currentMonsterHealth,
      currentPlayerHealth
    );
    alert("you have a draw!");
    reset();
  } else if (currentMonsterHealth <= 0) {
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "YOU WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
    alert("you won!");
    reset();
  } else if (currentPlayerHealth <= 0) {
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "YOU LOST",
      currentMonsterHealth,
      currentPlayerHealth
    );
    alert("you lost!!!");
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : MONSTER_ATTACK_VALUE;
  logEvent =
    mode === MODE_STRONG_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STONGER_ATTACK;
  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= monsterDamage;
  writeToLog(
    logEvent,
    monsterDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= maxLife - HEAL_VALUE) {
    alert("you can't heal more than maximum health");
    healValue = maxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function logHandler() {
    for( let log of battleLog){
        for (let entry in log){
            console.log(`${entry} => ${console.log(log[entry])}`)
        }
    }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", logHandler);
