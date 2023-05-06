<template>
  <div class="">
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Баллансировка</h1>
      <p class="lead">
        Выберите в левой колонке пункты и их количество что бы в правой колонке
        появился итоговый балланс
      </p>
      <button class="btn btn-lg btn-block btn-outline-primary" @click="clickMe">
        Подсчитать
      </button>
    </div>

    <div class="row m-5 p-1">
      <div class="col m-1 p-1">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Элементы</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li v-for="(curArmor, index) in armor" :key="index">
                <ul>
                  <li v-for="(data, dataName) in curArmor" :key="dataName">
                    {{ dataName }}: {{ data }}
                  </li>
                </ul>
                <div class="row">
                  <div class="col">
                    <button
                      type="button"
                      @click="curArmor.IncreaseCount()"
                      class="btn btn-primary m-1 col-1"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      @click="curArmor.DecreaseCount()"
                      class="btn btn-primary m-1 col-1"
                    >
                      -
                    </button>
                  </div>
                </div>
                --------------
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col m-1 p-1">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Итоговый баланс</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li v-for="(data, index) in displayedStatistics" :key="index">
                {{ index }} : {{ data.toFixed(2) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
<!-- 
<script lang="ts">
import { Options, Vue } from "vue-class-component";

// i need a class to store stats
class Armor {
  name: string;
  healthBoost: number;
  damageBoost: number;
  speedBoost: number;

  amountSelected: number;

  constructor(
    name: string,
    healthBoost: number,
    damageBoost: number,
    speedBoost: number
  ) {
    this.amountSelected = 0;
    this.name = name;
    //
    [this.healthBoost, this.damageBoost, this.speedBoost] = [
      healthBoost,
      damageBoost,
      speedBoost,
    ];
  }

  IncreaseCount(): void {
    this.amountSelected++;
  }

  DecreaseCount(): void {
    if (this.amountSelected > 0) this.amountSelected--;
  }
}

// i need target class that will calculate target stats
class Stats {
  totalPoints = 100;

  calc(armorList: Array<Armor>): {
    healthBoost: number;
    damageBoost: number;
    speedBoost: number;
  } {
    let tmp = { healthBoost: 1, damageBoost: 1, speedBoost: 1 };

    for (let armor of armorList) {
      tmp.healthBoost += armor.healthBoost * armor.amountSelected;
      tmp.damageBoost += armor.damageBoost * armor.amountSelected;
      tmp.speedBoost += armor.speedBoost * armor.amountSelected;
    }

    let sum = tmp.damageBoost + tmp.healthBoost + tmp.speedBoost;

    tmp.healthBoost = (tmp.healthBoost / sum) * this.totalPoints;
    tmp.damageBoost = (tmp.damageBoost / sum) * this.totalPoints;
    tmp.speedBoost = (tmp.speedBoost / sum) * this.totalPoints;

    return tmp;
  }
}

//
@Options({
  props: {
    msg: String,
  },
})
//
export default class HelloWorld extends Vue {
  // state
  armor!: Array<Armor>;
  statistics!: Stats;

  displayedStatistics = {
    healthBoost: 100 / 3,
    damageBoost: 100 / 3,
    speedBoost: 100 / 3,
  };

  // state (props)
  msg!: string;

  // functions
  data(): { armor: Array<Armor>; statistics: Stats } {
    return {
      armor: [
        new Armor("alfa", 1, 2, 1),
        new Armor("beta", 0, 0, 2),
        new Armor("gamma", 0, 2, 0),
        new Armor("delta", 3, 0, 0),
      ],
      statistics: new Stats(),
    };
  }

  clickMe(): void {
    this.displayedStatistics = this.statistics.calc(this.armor);
  }
}
</script> -->
