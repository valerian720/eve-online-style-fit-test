<template>
  <div class="">
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Баллансировка</h1>
      <p class="lead">
        Выберите в левой колонке пункты в слоты что бы в правой колонке появился
        итоговый балланс корабля
      </p>
      <p>что бы измениь/добавить модули/корабли нажмите здесь</p>
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
                @change="calcSelectedProcessedShip()"
                v-model="
                  selectedShip.usedSlots[
                    summUpToIndex(selectedShip.slots, slotNumber) + slotIndex
                  ]
                "
              >
                <option selected :value="{}">Пустой модуль</option>
                <option
                  :value="module"
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
            <button
              type="button"
              class="btn btn-primary p-1 m-1"
              @click="resetActiveModules()"
            >
              Сброс
            </button>
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
              <li
                :class="{
                  'text-danger': selectedProcessedShip.damage < 0,
                }"
              >
                урон: {{ selectedProcessedShip.damage }}
              </li>
              <li
                :class="{
                  'text-danger': selectedProcessedShip.shield < 0,
                }"
              >
                прочность щита: {{ selectedProcessedShip.shield }}
              </li>
              <li
                :class="{
                  'text-danger': selectedProcessedShip.armor < 0,
                }"
              >
                прочность брони: {{ selectedProcessedShip.armor }}
              </li>
              <li
                :class="{
                  'text-danger': selectedProcessedShip.hull < 0,
                }"
              >
                прочность корпуса: {{ selectedProcessedShip.hull }}
              </li>
              <li
                :class="{
                  'text-danger':
                    selectedProcessedShip.EnergyCreatingPerTick -
                      selectedProcessedShip.energyUsingPerTick <
                    0,
                }"
              >
                скорость генерирования энергии:
                {{ selectedProcessedShip.EnergyCreatingPerTick }} /
                {{
                  selectedProcessedShip.EnergyCreatingPerTick -
                  selectedProcessedShip.energyUsingPerTick
                }}
              </li>
              <li
                :class="{
                  'text-danger':
                    selectedProcessedShip.reactor -
                      selectedProcessedShip.reactorUsed <
                    0,
                }"
              >
                объем реактора:
                {{ selectedProcessedShip.reactor }}
                /
                {{
                  selectedProcessedShip.reactor -
                  selectedProcessedShip.reactorUsed
                }}
              </li>
              <li
                :class="{
                  'text-danger':
                    selectedProcessedShip.cpu - selectedProcessedShip.cpuUsed <
                    0,
                }"
              >
                объем CPU: {{ selectedProcessedShip.cpu }} /
                {{ selectedProcessedShip.cpu - selectedProcessedShip.cpuUsed }}
              </li>
            </ul>
            <div class="row m-1 p-1" v-else>Неизвестно</div>
          </div>
        </div>
        <div class="card mb-4 box-shadow" v-if="selectedShip != null">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Итог</h4>
          </div>
          <div class="card-body">
            <div class="row m-1 p-1">
              Корабль: {{ splitCamelCase(selectedShip.name) }}
            </div>
            <div class="row m-1 p-1">
              Модули:
              {{
                selectedShip.usedSlots
                  .map((el) => splitCamelCase(el.name))
                  .filter((el) => el != null)
                  .join(", ")
              }}
            </div>
          </div>
        </div>
      </div>
      <ObjectCreator
        v-if="selectedShip"
        @obj-changed="calcSelectedProcessedShip"
        :constructable="selectedShip"
      />
    </div>
  </div>
</template>

<script>
import ObjectCreator from "@/components/ObjectCreator.vue";

export default {
  name: "FitComponent",
  props: {
    msg: String,
  },
  components: {
    ObjectCreator,
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
      //
      selectedProcessedShip: {},
    };
  },

  created() {
    this.populate();
  },

  watch: {
    selectedShip(newValue) {
      this.selectedProcessedShip = { ...newValue };
    },
  },

  methods: {
    calcSelectedProcessedShip() {
      this.selectedProcessedShip = { ...this.selectedShip };
      for (const slotIndex in this.selectedProcessedShip.usedSlots) {
        const curModule = this.selectedProcessedShip.usedSlots[slotIndex];
        if (curModule != {})
          for (const curModuleKey in curModule) {
            // apply += to keys from modules to ship
            if (curModuleKey in this.selectedProcessedShip) {
              this.selectedProcessedShip[curModuleKey] +=
                curModule[curModuleKey];
            }
          }
      }
    },
    splitCamelCase(text) {
      var ret = null;
      if (text != null) {
        ret = text.replace(/([A-Z])/g, " $1").toLowerCase();
      }
      return ret;
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
          if (curModule[key] !== 0) {
            ret.push(`${this.translate(key)}: ${curModule[key]}`);
          }
        }
      }
      return ret.join(", ");
    },
    summUpToIndex(arr, index) {
      return arr.reduce((a, b, i) => (i < index ? a + b : a), 0);
    },
    translate(text) {
      return this.translations[text];
    },
    resetActiveModules() {
      this.selectedShip.usedSlots = new Array(
        this.selectedShip.slots.reduce((a, b) => a + b, 0)
      ).fill({});
      this.selectedProcessedShip = { ...this.selectedShip };
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
      //
      this.ships.map((v) => {
        v.usedSlots = new Array(v.slots.reduce((a, b) => a + b, 0)).fill({});
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
