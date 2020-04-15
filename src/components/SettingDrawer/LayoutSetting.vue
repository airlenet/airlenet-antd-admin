<template>
  <a-list
    :split="false"
    :dataSource="[
      {
        title: $t('app.setting.content-width'),
        action: 'fixed'
      },
      {
        title: $t('app.setting.fixedheader'),
        action: 'fixedheader'
      },
      {
        title: $t('app.setting.fixedsidebar'),
        action: 'fixedsidebar',
        disabled: layout === 'topmenu',
        disabledReason: $t('app.setting.fixedsidebar.hint')
      }
    ]"
  >
    <a-tooltip
      slot="renderItem"
      slot-scope="item"
      :title="item.disabled ? item.disabledReason : ''"
      placement="left"
    >
      <a-list-item>
        <span :style="{ opacity: item.disabled ? 0.5 : 1 }">{{
          item.title
        }}</span>

        <a-select
          slot="actions"
          v-if="item.action == 'fixed'"
          :value="contentWidth || 'Fixed'"
          size="small"
          @select="
            value => $emit('changeSetting', 'contentWidth', value)
          "
          :style="{ width: '80px' }"
        >
          {layout === 'sidemenu' ? null : (
          <a-select-option value="Fixed" v-if="!(layout === 'sidemenu')">
            {{ $t("app.setting.content-width.fixed") }}
          </a-select-option>
          )}
          <a-select-option value="Fluid">
            {{ $t("app.setting.content-width.fluid") }}
          </a-select-option>
        </a-select>

        <a-switch
          slot="actions"
          v-if="item.action == 'fixedheader'"
          size="small"
          @checked="!!fixedHeader"
          @change="
            checked => $emit('changeSetting', 'fixedHeader', checked)
          "
        />
        <a-switch
          slot="actions"
          v-if="item.action == 'fixedsidebar'"
          size="small"
          :checked="!!fixSiderbar"
          @change="
            checked => $emit('changeSetting', 'fixSiderbar', checked)
          "
        />
      </a-list-item>
    </a-tooltip>
  </a-list>
</template>

<script>
import "./SettingDrawer.less";
export default {
  name: "LayoutSetting",
  props: {
    contentWidth: {},
    layout: {},
    fixSiderbar: {},
    fixedHeader: {}
  }
};
</script>
