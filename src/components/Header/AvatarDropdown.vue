<template>
  <div>
    <HeaderDropdown v-if="currentUser && currentUser.name">
      <span :class="{ [styles.action]: true, [styles.account]: true }">
        <a-avatar
          size="small"
          :class="{ [styles.avatar]: true }"
          :src="currentUser.avatar"
          alt="avatar"
        />
        <span :class="{ [styles.name]: true }">{{ currentUser.name }}</span>
      </span>
      <a-menu
        slot="overlay"
        :class="{ [styles.menu]: true }"
        :selectedKeys="selectedMenu"
        @click="
          e => {
            this.$emit('onMenuClick', e);
          }
        "
      >
        <a-menu-item key="center">
          <UserOutlined />
          个人中心
        </a-menu-item>

        <a-menu-item key="settings">
          <SettingOutlined />
          个人设置
        </a-menu-item>

        <a-menu-divider />

        <a-menu-item key="logout">
          <LogoutOutlined />
          退出登录
        </a-menu-item>
      </a-menu>
    </HeaderDropdown>

    <span v-else :class="{ [styles.action]: true, [styles.account]: true }">
      <a-spin size="small" style=" margin-left: 8px;  margin-right: 8px" />
    </span>
  </div>
</template>

<script>
import styles from "./index.module.less";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons-vue";

export default {
  name: "AvatarDropdown",
  components: { HeaderDropdown, LogoutOutlined, SettingOutlined, UserOutlined },
  props: {
    menu: {
      default: false
    }
  },
  data() {
    return {
      styles,
      selectedMenu: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    }
  }
};
</script>
