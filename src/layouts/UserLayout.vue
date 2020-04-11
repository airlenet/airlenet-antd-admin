<template>
  <div :class="{ [styles.container]: true }">
    <div :class="{ [styles.lang]: true }">
      <SelectLang />
    </div>
    <div :class="{ [styles.content]: true }">
      <div :class="{ [styles.top]: true }">
        <div :class="{ [styles.header]: true }">
          <router-link to="/">
            <img alt="logo" :class="{ [styles.logo]: true }" :src="logo" />
            <span :class="{ [styles.title]: true }">Ant Design</span>
          </router-link>
        </div>
        <div :class="{ [styles.desc]: true }">
          Ant Design 是西湖区最具影响力的 Web 设计规范
        </div>
      </div>
      <router-view />
    </div>
    <DefaultFooter />
  </div>
</template>

<script>
import styles from "./UserLayout.module.less";
import logo from "../assets/logo.svg";
import SelectLang from "../components/SelectLang/SelectLang";
import DefaultFooter from "../components/Footer/DefaultFooter";
export default {
  name: "UserLayout",
  components: { DefaultFooter, SelectLang },
  data() {
    return { styles, logo };
  }
};
</script>
