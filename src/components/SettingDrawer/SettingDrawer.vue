<template>
  <a-drawer
    :visible="show"
    :width="300"
    @close="() => setShow(false)"
    placement="right"
    style="z-index: 999"
  >
    <div
      slot="handle"
      class="ant-pro-setting-drawer-handle"
      @click="() => setShow(!show)"
    >
      <CloseOutlined
        v-if="show"
        :style="{
          color: '#fff',
          fontSize: 20
        }"
      />
      <SettingOutlined
        v-else
        :style="{
          color: '#fff',
          fontSize: 20
        }"
      />
    </div>

    <div class="ant-pro-setting-drawer-content">
      <div :style="{ marginBottom: '24px' }">
        <h3 class="ant-pro-setting-drawer-title">
          {{ $t("app.setting.pagestyle") }}
        </h3>
        <!--'Page style setting'-->
        <BlockCheckbox
          :list="themeList.themeList"
          :value="navTheme"
          @onChange="value => changeSetting('navTheme', value)"
        />
      </div>
      <ThemeColor
        :title="$t('app.setting.themecolor')"
        :value="primaryColor"
        :colors="
          themeList.colorList[navTheme === 'realDark' ? 'dark' : 'light']
        "
        @onChange="color => changeSetting('primaryColor', color)"
      />

      <a-divider />

      <!--<Body title={formatMessage({ id: 'app.setting.navigationmode' })}>-->
      <!--<BlockCheckbox-->
      <!--value={layout}-->
      <!--onChange={(value) => changeSetting('layout', value, hideLoading)}-->
      <!--/>-->
      <!--</Body>-->
      <!--<LayoutSetting settings={settingState} changeSetting={changeSetting} />-->
      <!--<Divider />-->

      <!--<Body title={formatMessage({ id: 'app.setting.othersettings' })}>-->
      <!--<List-->
      <!--split={false}-->
      <!--renderItem={renderLayoutSettingItem}-->
      <!--dataSource={[-->
      <!--{-->
      <!--title: formatMessage({ id: 'app.setting.weakmode' }),-->
      <!--action: (-->
      <!--<Switch-->
      <!--size="small"-->
      <!--checked={!!colorWeak}-->
      <!--onChange={(checked) => changeSetting('colorWeak', checked)}-->
      <!--/>-->
      <!--),-->
      <!--},-->
      <!--]}-->
      <!--/>-->
      <!--</Body>-->
      <!--{hideHintAlert && hideCopyButton ? null : <Divider />}-->

      <!--{hideHintAlert ? null : (-->
      <!--<Alert-->
      <!--type="warning"-->
      <!--message={formatMessage({-->
      <!--id: 'app.setting.production.hint',-->
      <!--})}-->
      <!--icon={<NotificationOutlined />}-->
      <!--showIcon-->
      <!--style={{ marginBottom: 16 }}-->
      <!--/>-->
      <!--)}-->

      <!--{hideCopyButton ? null : (-->
      <!--<CopyToClipboard-->
      <!--text={genCopySettingJson(settingState)}-->
      <!--onCopy={() =>-->
      <!--message.success(formatMessage({ id: 'app.setting.copyinfo' }))-->
      <!--}-->
      <!--&gt;-->
      <!--<Button block>-->
      <!--<CopyOutlined /> {formatMessage({ id: 'app.setting.copy' })}-->
      <!--</Button>-->
      <!--</CopyToClipboard>-->
      <!--)}-->
      <CopyOutlined />
      <NotificationOutlined />
    </div>
  </a-drawer>
</template>

<script>
import {
  CloseOutlined,
  CopyOutlined,
  NotificationOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";
import "./SettingDrawer.less";
import BlockCheckbox from "./BlockCheckbox";
import DefaultSettings from "../../config/defaultSettings.js";
import ThemeColor from "./ThemeColor";

export default {
  name: "SettingDrawer",
  components: {
    ThemeColor,
    BlockCheckbox,
    CopyOutlined,
    CloseOutlined,
    NotificationOutlined,
    SettingOutlined
  },
  data() {
    return {
      navTheme: DefaultSettings.navTheme,
      primaryColor: "daybreak",
      layout: "sidemenu",
      show: true,
      nextSetting: {},
      colorList: [
        {
          key: "dust",
          color: "#F5222D"
        },
        {
          key: "volcano",
          color: "#FA541C"
        },
        {
          key: "sunset",
          color: "#FAAD14"
        },
        {
          key: "cyan",
          color: "#13C2C2"
        },
        {
          key: "green",
          color: "#52C41A"
        },
        {
          key: "daybreak",
          color: "#1890FF"
        },
        {
          key: "geekblue",
          color: "#2F54EB"
        },
        {
          key: "purple",
          color: "#722ED1"
        }
      ],
      themeList: {
        colorList: {
          light: this.colorList,
          dark: this.colorList
        },
        themeList: [
          {
            key: "light",
            url:
              "https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg",
            title: this.$t("app.setting.pagestyle.light")
          },
          {
            key: "dark",
            url:
              "https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg",
            title: this.$t("app.setting.pagestyle.dark")
          },
          {
            key: "realDark",
            url:
              "https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg",
            title: this.$t("app.setting.pagestyle.dark")
          }
        ]
      }
    };
  },
  created() {
    this.$route.query;
    this.themeList.colorList.dark = this.colorList
    this.themeList.colorList.light = this.colorList
  },
  computed: {
    setting() {
      return this.$store.state.setting;
    }
  },
  methods: {
    setShow(show) {
      this.show = show;
    },
    changeSetting(key, value) {
      const nextState = { ...this.setting };
      nextState[key] = value;
      this.$store.commit("changeSetting", { payload: nextState });
    }
  },
  mounted() {}
};
</script>
