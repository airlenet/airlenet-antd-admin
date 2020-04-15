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
          :value="setting.navTheme"
          @onChange="value => changeSetting('navTheme', value)"
        />
      </div>
      <ThemeColor
        :title="$t('app.setting.themecolor')"
        :value="setting.primaryColor"
        :colors="
          themeList.colorList[
            setting.navTheme === 'realDark' ? 'dark' : 'light'
          ]
        "
        @onChange="color => changeSetting('primaryColor', color)"
      />

      <a-divider />

      <div :style="{ marginBottom: '24px' }">
        <h3 class="ant-pro-setting-drawer-title">
          {{ $t("app.setting.navigationmode") }}
        </h3>
        <!--'Page style setting'-->
        <BlockCheckbox
          :list="[
            {
              key: 'sidemenu',
              url:
                'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
              title: $t('app.setting.sidemenu')
            },
            {
              key: 'topmenu',
              url:
                'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
              title: $t('app.setting.topmenu')
            }
          ]"
          :value="setting.layout"
          @onChange="value => changeSetting('layout', value)"
        />
      </div>
      <LayoutSetting
        :contentWidth="setting.contentWidth"
        :layout="setting.layout"
        :fixSiderbar="setting.fixSiderbar"
        :fixedHeader="setting.fixedHeader"
        @changeSetting="changeSetting"
      />
      <a-divider />

      <div :style="{ marginBottom: '24px' }">
        <h3 class="ant-pro-setting-drawer-title">
          {{ $t("app.setting.othersettings") }}
        </h3>
        <a-list
          :split="false"
          :dataSource="[
            {
              title: $t('app.setting.weakmode'),
              action: 'weakmode'
            },
            {
              title: $t('app.setting.blackwhitemode'),
              action: 'blackwhitemode'
            }
          ]"
          ><a-tooltip
            slot="renderItem"
            slot-scope="item"
            :title="item.disabled ? item.disabledReason : ''"
            placement="left"
          >
            <a-list-item>
              <span :style="{ opacity: item.disabled ? 0.5 : 1 }">{{
                item.title
              }}</span>
              <a-switch
                slot="actions"
                v-if="item.action === 'weakmode'"
                size="small"
                :checked="!!setting.colorWeak"
                @change="checked => changeSetting('colorWeak', checked)"
              />
              <a-switch
                slot="actions"
                v-if="item.action === 'blackwhitemode'"
                size="small"
                :checked="!!setting.colorBlackWhite"
                @change="checked => changeSetting('colorBlackWhite', checked)"
              />
            </a-list-item>
          </a-tooltip>
        </a-list>
      </div>
      <a-divider />
      <a-alert
        type="warning"
        :message="$t('app.setting.production.hint')"
        showIcon
        :style="{ marginBottom: '16px' }"
      >
        <NotificationOutlined slot="icon" />
      </a-alert>

      <a-button
        class="copy"
        block
        :data-clipboard-text="genCopySettingJson"
        @click="copyClick"
      >
        <CopyOutlined />{{ $t("app.setting.copy") }}
      </a-button>
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
import ThemeColor from "./ThemeColor";
import LayoutSetting from "./LayoutSetting";
import omit from "omit.js";
import ClipboardJS from "clipboard";
export default {
  name: "SettingDrawer",
  props: {
    setting: {}
  },
  components: {
    LayoutSetting,
    ThemeColor,
    BlockCheckbox,
    CopyOutlined,
    CloseOutlined,
    NotificationOutlined,
    SettingOutlined
  },
  data() {
    return {
      show: false,
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
      themeConfig: {
        daybreak: "daybreak",
        "#1890ff": "daybreak",
        "#F5222D": "dust",
        "#FA541C": "volcano",
        "#FAAD14": "sunset",
        "#13C2C2": "cyan",
        "#52C41A": "green",
        "#2F54EB": "geekblue",
        "#722ED1": "purple"
      },
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
    this.themeList.colorList.dark = this.colorList;
    this.themeList.colorList.light = this.colorList;
  },
  methods: {
    setShow(show) {
      this.show = show;
    },
    changeSetting(key, value) {
      const nextState = { ...this.setting };
      nextState[key] = value;
      this.$emit("onSettingChange", { payload: nextState });
    },
    genStringToTheme(val) {
      return val && this.themeConfig[val] ? this.themeConfig[val] : val;
    },
    copyClick() {}
  },
  computed: {
    genCopySettingJson() {
      return JSON.stringify(
        omit(
          {
            ...this.setting,
            primaryColor: this.genStringToTheme(this.setting.primaryColor)
          },
          ["colorWeak", "colorBlackWhite"]
        ),
        null,
        2
      );
    }
  },
  mounted() {
    let clipboard = new ClipboardJS(".copy");
    clipboard.on("success", () => {
      this.$message.success(this.$t("app.setting.copyinfo"));
    });
    clipboard.on("error", function() {});
  },
  // watch: {
  //   setting: {
  //     handler(newVal, oldVal) {
  //       console.log(newVal, oldVal);
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // }
};
</script>
