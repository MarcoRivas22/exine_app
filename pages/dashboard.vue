<template>
  <div class="row" v-if="$store.state.devices.length > 0">
    <div
      v-for="(widget, index) in $store.state.selectedDevice.template.widgets"
      :key="index"
      :class="[widget.column]"
    >
      <i
        aria-hidden="true"
        class="fa fa-download text-warning pull-right"
        style="margin-bottom: 10px"
        @click="exportExcel(widget)"
      >
      </i>
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

      <Iotindicator
        v-if="widget.widget == 'indicator'"
        :config="fixWidget(widget)"
      ></Iotindicator>
    </div>
  </div>

  <div v-else>Select a Device...</div>
</template>
j
<script>
import Rtnumberchart from "../components/Widgets/Rtnumberchart.vue";
import Iotswitch from "../components/Widgets/Iotswitch.vue";
import IotButton from "../components/Widgets/IotButton.vue";
import IotIndicator from "../components/Widgets/IotIndicator.vue";
import exportFromJSON from "export-from-json";

export default {
  components: {
    Rtnumberchart,
    Iotswitch,
    IotButton,
    IotIndicator,
  },

  middleware: "authenticated",
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
    async exportExcel(widget) {
      const axiosHeaders = {
        headers: {
          token: $nuxt.$store.state.auth.token,
        },
        params: {
          dId: $nuxt.$store.state.selectedDevice.dId,
          variable: widget.variable,
          chartTimeAgo: 0,
        },
      };

      let data = await this.$axios.get("/get-small-charts-data", axiosHeaders);
      data = data.data.data;

      for (var i = 0; i < data.length; i++) {
        let unix_timestamp = data[i].time;
        var date = new Date(unix_timestamp);
        var fecha =
          date.getUTCFullYear() + "/" + date.getMonth() + "/" + date.getDate();
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        data[i].fecha = fecha;

        data[i].hora =
          hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

        data[i].valor = data[i].value;
      }

      data.forEach((data) => {
        delete data._id;
        delete data.dId;
        delete data.userId;
        delete data.variable;
        delete data.time;
        delete data.value;
        delete data.__v;
      });

      const fileName = "Historial";
      const exportType = exportFromJSON.types.xls;

      exportFromJSON({ data, fileName, exportType });
    },
  },
};
</script>

<style>
.fa-download {
  cursor: pointer;
}
</style>
