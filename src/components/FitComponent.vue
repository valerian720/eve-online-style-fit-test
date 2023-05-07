<template>
  <div class="">
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Баллансировка</h1>
      <p class="lead">
        Выберите в левой колонке пункты в слоты что бы в правой колонке появился
        итоговый балланс корабля
      </p>
    </div>

    <div class="row m-5 p-1">
      <div class="col m-1 p-1">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Корабль</h4>
          </div>
          <div class="card-body">
            <select
              class="form-select"
              v-model="selectedShip"
              aria-label="Default select example"
            >
              <option selected :value="null">Выберите корабль</option>
              <option :value="ship" v-for="(ship, index) in ships" :key="index">
                {{ splitCamelCase(ship.name) }}
              </option>
            </select>
            <!--  -->
          </div>
        </div>
        <div class="card mb-4 box-shadow" v-if="selectedShip != null">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">
              Слоты корабля (выбор модулей)
            </h4>
          </div>
          <div class="card-body">
            <div
              class="row m-1 p-1"
              v-for="(slotAmout, slotNumber) in selectedShip.slots"
              :key="slotNumber"
            >
              <p class="h4">слот {{ romanize(slotNumber + 1) }}</p>
              <select
                class="form-select mb-2"
                aria-label="Default select example"
                v-for="slotIndex in range(slotAmout)"
                :key="slotIndex"
              >
                <option selected>Пустой модуль</option>
                <option
                  value="1"
                  v-for="(module, idex) in modules.filter(
                    (v) => v.slot == slotNumber + 1
                  )"
                  :key="idex"
                >
                  {{ splitCamelCase(module.name) }} ({{
                    moduleToString(module)
                  }})
                </option>
              </select>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
      <div class="col m-1 p-1">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Итоговый баланс</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4" v-if="selectedShip != null">
              <li>Название: {{ splitCamelCase(selectedShip.name) }}</li>
              <li>урон: {{ selectedShip.damage }}</li>
              <li>прочность щита: {{ selectedShip.shield }}</li>
              <li>прочность брони: {{ selectedShip.armor }}</li>
              <li>прочность корпуса: {{ selectedShip.hull }}</li>
              <li>
                скорость генерирования энергии:
                {{
                  selectedShip.EnergyCreatingPerTick -
                  selectedShip.energyUsingPerTick
                }}
              </li>
              <li>объем реактора: {{ selectedShip.reactor }}</li>
              <li>объем CPU: {{ selectedShip.cpu }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FitComponent",
  props: {
    msg: String,
  },

  data() {
    return {
      translations: {
        damage: "урон",
        shield: "щит",
        armor: "броня",
        hull: "корпус",
        energyUsingPerTick: "энергия затраченная каждый тик",
        cpuUsed: "использование CPU",
        reactorUsed: "использование реактора",
      },
      shipsDefaults: {
        name: "ShipDefaults",
        damage: 0,
        shield: 0,
        armor: 0,
        hull: 0,
        energyUsingPerTick: 0,
        cpuUsed: 0,
        reactorUsed: 0,
        //
        EnergyCreatingPerTick: 10,
        reactor: 100,
        cpu: 100,
        //
        slots: [3, 3, 2],
      },
      modulesDefaults: {
        name: "ModuleDefaults",
        damage: 0,
        shield: 0,
        armor: 0,
        hull: 0,
        energyUsingPerTick: 1,
        cpuUsed: 10,
        reactorUsed: 10,
        slot: 1, // starts with 1
      },
      //
      modules: [],
      ships: [],
      //
      selectedShip: null,
    };
  },

  created() {
    this.populate();
  },

  methods: {
    splitCamelCase(text) {
      return text.replace(/([A-Z])/g, " $1").toLowerCase();
    },
    range(size, startAt = 0) {
      return [...Array(size).keys()].map((i) => i + startAt);
    },
    romanize(num) {
      var lookup = {
          M: 1000,
          CM: 900,
          D: 500,
          CD: 400,
          C: 100,
          XC: 90,
          L: 50,
          XL: 40,
          X: 10,
          IX: 9,
          V: 5,
          IV: 4,
          I: 1,
        },
        roman = "",
        i;
      for (i in lookup) {
        while (num >= lookup[i]) {
          roman += i;
          num -= lookup[i];
        }
      }
      return roman;
    },
    moduleToString(curModule, exclude = ["name", "slot"]) {
      var ret = [];
      for (const key in curModule) {
        if (!exclude.includes(key)) {
          ret.push(`${this.translate(key)}: ${curModule[key]}`);
        }
      }
      return ret.join(", ");
    },
    translate(text) {
      return this.translations[text];
    },
    populate() {
      this.modules = [
        {
          name: "ShieldBoost",
          damage: 0,
          shield: 100,
          armor: 0,
          hull: 0,
          energyUsingPerTick: 4,
          cpuUsed: 20,
          reactorUsed: 30,
          slot: 2,
        },
        {
          name: "ArmorBoost",
          damage: 0,
          shield: 0,
          armor: 120,
          hull: 0,
          energyUsingPerTick: 3,
          cpuUsed: 20,
          reactorUsed: 3,
          slot: 2,
        },
        {
          name: "HullBoost",
          damage: 0,
          shield: 0,
          armor: 0,
          hull: 50,
          energyUsingPerTick: 1,
          cpuUsed: 15,
          reactorUsed: 2,
          slot: 3,
        },
        {
          name: "ReactorBoost",
          damage: 0,
          shield: 0,
          armor: 0,
          hull: 0,
          energyUsingPerTick: -10,
          cpuUsed: 20,
          reactorUsed: 3,
          slot: 3,
        },
        {
          name: "CoilGun",
          damage: 12,
          shield: 0,
          armor: 0,
          hull: 0,
          energyUsingPerTick: 4,
          cpuUsed: 30,
          reactorUsed: 30,
          slot: 1,
        },
      ];
      this.ships = [
        {
          name: "YellowBeast",
          damage: 0,
          shield: 200,
          armor: 30,
          hull: 100,
          energyUsingPerTick: 0,
          cpuUsed: 0,
          reactorUsed: 0,
          //
          EnergyCreatingPerTick: 10,
          reactor: 100,
          cpu: 100,
          //
          slots: [6, 3, 2],
        },
        {
          name: "Runner",
          damage: 0,
          shield: 30,
          armor: 200,
          hull: 400,
          energyUsingPerTick: 0,
          cpuUsed: 0,
          reactorUsed: 0,
          //
          EnergyCreatingPerTick: 20,
          reactor: 30,
          cpu: 30,
          //
          slots: [1, 2, 2],
        },
      ];
    },
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
