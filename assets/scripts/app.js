const MONSTER_ATTACK_VALUE = 15;
const ATTACK_VALUE = 12;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 30;

let maxLife = 100;
let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;
let hasBonusLife = true;

adjustHealthBars(maxLife);

function reset(){
    currentPlayerHealth = maxLife;
    currentMonsterHealth = maxLife;
    resetGame(maxLife);
}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but bonus life saved you');
    }
    if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
      alert("you have a draw!");
      reset();
    } else if (currentMonsterHealth <= 0) {
      alert("you won!");
      reset();
    } else if (currentPlayerHealth <= 0) {
      alert("you lost!!!");
      reset();
    }
}

function attackMonster(mode){
    let maxDamage;
    if(mode === 'ATTACK'){
        maxDamage = ATTACK_VALUE;
    } else if(mode === 'STRONG_ATTACK'){
        maxDamage = MONSTER_ATTACK_VALUE;
    }
    const monsterDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamage;
    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler(){
    attackMonster('STRONG_ATTACK');
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= maxLife - HEAL_VALUE){
        alert("you can't heal more than maximum health");
        healValue = maxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
