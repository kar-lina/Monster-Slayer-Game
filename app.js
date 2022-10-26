function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const START = "Game is started";
const P_ATTACK = "Player attacked";
const M_ATTACK = "Monster attacked";
const GAME_OVER = "Game is over.";
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      actions: [],
    };
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.actions = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackVal = getRandomValue(5, 12);
      this.monsterHealth -= attackVal;
      this.addAction("player", "attack", attackVal);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackVal = getRandomValue(8, 15);
      this.playerHealth = this.playerHealth - attackVal;

      this.addAction("monster", "attack", attackVal);
    },
    specailAttackMonster() {
      this.currentRound++;
      const attackVal = getRandomValue(15, 25);
      this.monsterHealth -= attackVal;
      this.addAction("player", "attack", attackVal);

      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healVal = getRandomValue(8, 20);
      if (this.playerHealth + healVal > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healVal;
      }
      this.addAction("player", "heal", healVal);

      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addAction(who, what, val) {
      this.actions.unshift({
        actionBy: who,
        action: what,
        actionValue: val,
      });
    },
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecailAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(val) {
      if (val <= 0 && this.monsterHealth <= 0) {
        //it's a draw
        this.winner = "draw";
      } else if (val <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(val) {
      if (val <= 0 && this.playerHealth <= 0) {
        //it's a draw
        this.winner = "draw";
      } else if (val <= 0) {
        this.winner = "player";
      }
    },
  },
});

app.mount("#game");
