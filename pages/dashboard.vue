<template>
  <div class="row" v-if="$store.state.devices.length > 0">
    <div
      v-for="(widget, index) in $store.state.selectedDevice.template.widgets"
      :key="index"
      :class="[widget.column]"
    >
      <Rtnumberchart
        v-if="widget.widget == 'numberchart'"
        :config="fixWidget(widget)"
      ></Rtnumberchart>

      <Iotswitch
        v-if="widget.widget == 'switch'"
        :config="fixWidget(widget)"
      ></Iotswitch>

      <IotButton
        v-if="widget.widget == 'button'"
        :config="fixWidget(widget)"
      ></IotButton>

      <IotIndicator
        v-if="widget.widget == 'indicator'"
        :config="fixWidget(widget)"
      ></IotIndicator>
    </div>
  </div>

  <div v-else>Select a Device...</div>
</template>
<script>
import Rtnumberchart from "../components/Widgets/Rtnumberchart.vue";
import Iotswitch from "../components/Widgets/Iotswitch.vue";
import IotButton from "../components/Widgets/IotButton.vue";
import IotIndicator from "../components/Widgets/IotIndicator.vue";

import { Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";

export default {
  middleware: "authenticated",
  components: {
    Rtnumberchart,
    Iotswitch,
    IotButton,
    IotIndicator,
  },
  name: "Dashboard",
  data() {
    return {};
  },

  mounted() {},

  methods: {
    fixWidget(widget) {
      var widgetCopy = JSON.parse(JSON.stringify(widget));
      widgetCopy.selectedDevice.dId = this.$store.state.selectedDevice.dId;
      widgetCopy.selectedDevice.name = this.$store.state.selectedDevice.name;
      widgetCopy.userId = this.$store.state.selectedDevice.userId;

      if (widget.widget == "numberchart") {
        widgetCopy.demo = false;
      }

      return widgetCopy;
    },
  },
};
</script>
