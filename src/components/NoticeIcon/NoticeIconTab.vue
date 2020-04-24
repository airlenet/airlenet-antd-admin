<template>
  <div>
    <div v-if="!data || data.length == 0" :class="{ [styles.notFound]: true }">
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        alt="not found"
      />
      <div>{{ emptyText }}</div>
    </div>
    <div v-else>
      <a-list :class="{ [styles.list]: true }" :dataSource="data">
        <a-list-item
          slot="renderItem"
          slot-scope="item"
          :class="{
            [styles.item]: true,
            [styles.read]: item.read ? item.read : false
          }"
          @click="listClick(item)"
        >
          <a-list-item-meta :class="{ [styles.meta]: true }">
            <a-avatar
              slot="avatar"
              v-if="item.avatar && typeof item.avatar === 'string'"
              :class="{ [styles.avatar]: true }"
              :src="item.avatar"
            />
            <span
              slot="avatar"
              v-else
              :class="{ [styles.iconElement]: true }"
              >{{ item.avatar }}</span
            >
            <div slot="title" :class="{ [styles.title]: true }">
              {{ item.title }}
              <div :class="{ [styles.extra]: true }">
                <a-tag
                  v-if="item.status && item.extra"
                  :color="color[item.status]"
                  :style="{
                    marginRight: '0px'
                  }"
                >
                  {{ item.extra }}
                </a-tag>
                <template v-else>
                  {{ item.extra }}
                </template>
              </div>
            </div>

            <div slot="description">
              <div :class="{ [styles.description]: true }">
                {{ item.description }}
              </div>
              <div :class="{ [styles.datetime]: true }">
                {{ item.datetime }}
              </div>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <div :class="{ [styles.bottomBar]: true }">
        <div
          v-if="showClear"
          @click="
            e => {
              if (this.onClear) this.onClear(e);
              else this.$emit('onClear', e);
            }
          "
        >
          {{ clearText }} {{ title }}
        </div>

        <div
          v-if="showViewMore"
          @click="
            e => {
              if (this.onViewMore) this.onViewMore(e);
              else this.$emit('onViewMore', e);
            }
          "
        >
          {{ viewMoreText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import styles from "./NoticeIconTab.module.less";

export default {
  name: "NoticeIconTab",
  props: {
    data: {
      default: function() {
        return [];
      }
    },
    emptyText: {},
    showClear: {
      default: true
    },
    clearText: {},
    viewMoreText: {},
    showViewMore: {
      type: Boolean,
      default: false
    },
    onClear: {
      type: Function
    },
    onClick: {
      type: Function
    },
    onViewMore: {
      type: Function
    },
    title: {},
    tabKey: {}
  },
  data() {
    return {
      styles,
      color: {
        todo: "",
        processing: "blue",
        urgent: "red",
        doing: "gold"
      }
    };
  },
  methods: {
    listClick(item) {
      if (this.onClick) this.onClick(item);
      else this.$emit("onClick", item);
    }
  }
};
</script>
