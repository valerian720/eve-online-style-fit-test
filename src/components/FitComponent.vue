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
        <Transition name="bounce">
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
        </Transition>
      </div>
      <div class="col m-1 p-1">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Итоговый баланс</h4>
          </div>
          <div class="card-body">
            <Transition name="fade" mode="out-in">
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
                      selectedProcessedShip.cpu -
                        selectedProcessedShip.cpuUsed <
                      0,
                  }"
                >
                  объем CPU: {{ selectedProcessedShip.cpu }} /
                  {{
                    selectedProcessedShip.cpu - selectedProcessedShip.cpuUsed
                  }}
                </li>
              </ul>
              <div class="row m-1 p-1" v-else>Неизвестно</div>
            </Transition>
          </div>
        </div>
        <Transition name="fade">
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
        </Transition>
      </div>
      <div class="row m-1 p-1" v-if="selectedShip">
        <p>
          <a
            class="btn btn-primary"
            data-bs-toggle="collapse"
            href="#changeSelectedShip"
            aria-expanded="false"
            aria-controls="changeSelectedShip"
          >
            Изменить корабль
          </a>
        </p>
        <div class="collapse" id="changeSelectedShip">
          <ObjectCreator
            @obj-changed="processImportedShip"
            :constructable="selectedShip"
            :name="'выбранного корабля'"
          />
        </div>
      </div>
      <div class="row m-1 p-1">
        <p>
          <a
            class="btn btn-primary"
            data-bs-toggle="collapse"
            href="#changeModules"
            aria-expanded="false"
            aria-controls="changeModules"
          >
            Изменить Модули
          </a>
        </p>
        <div class="collapse" id="changeModules">
          <div class="row" v-for="(curModule, index) in modules" :key="index">
            <ObjectCreator
              @obj-changed="calcSelectedProcessedShip"
              :constructable="curModule"
              :name="`модуля ${curModule.name}`"
            />
          </div>
        </div>
      </div>
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
    registerShipModules() {
      console.log("registerShipModules");
      let unregNewModules = this.selectedShip.usedSlots;
      for (const unregModuleIndex in unregNewModules) {
        let unregModule = unregNewModules[unregModuleIndex];
        if (
          unregModule.name != undefined &&
          !this.modules.includes(unregModule)
        ) {
          this.modules.push(unregModule);
        }
      }
    },
    cleanupRegisteredModules() {
      console.log("cleanupRegisteredModules");
      let haveSeen = new Set();
      let listToDelete = [];
      for (const moduleIndex in this.modules) {
        let curModule = this.modules[moduleIndex];
        let curModuleJson = JSON.stringify(curModule);
        if (
          this.modules.filter((v) => JSON.stringify(v) === curModuleJson)
            .length > 0
        ) {
          if (haveSeen.has(curModuleJson)) {
            listToDelete.push(curModule);
          } else {
            haveSeen.add(curModuleJson);
          }
        }
      }
      this.modules = this.modules.filter((el) => !listToDelete.includes(el));
    },
    markDuplicateModules() {
      let haveSeen = {};
      for (const moduleIndex in this.modules) {
        let curModule = this.modules[moduleIndex];
        if (this.modules.filter((v) => v.name === curModule.name).length > 0) {
          let suffix = "";
          if (haveSeen[curModule.name] == undefined) {
            haveSeen[curModule.name] = 1;
          } else {
            suffix = "*".repeat(haveSeen[curModule.name]);
            haveSeen[curModule.name] += 1;
          }
          curModule.name += suffix;
        }
      }
    },
    cleanupSelectedShipModules() {
      console.log("cleanupSelectedShipModules");
      console.log(JSON.stringify(this.modules));
      let curModules = this.selectedShip.usedSlots;
      for (const curModuleIndex in curModules) {
        let curModule = curModules[curModuleIndex];
        let curModuleJson = JSON.stringify(curModule);
        let replacingModule = this.modules.filter(
          (v) => JSON.stringify(v) === curModuleJson
        );
        console.log(replacingModule);
        if (replacingModule.length > 0) {
          this.selectedShip.usedSlots[curModuleIndex] = replacingModule[0];
        }
      }
    },
    processImportedShip() {
      // add new
      this.registerShipModules();
      // cleanup
      this.cleanupRegisteredModules();
      this.cleanupSelectedShipModules();
      // this.markDuplicateModules();
      // sync recalc values
      this.calcSelectedProcessedShip();
    },

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
<style scoped lang="less">
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
