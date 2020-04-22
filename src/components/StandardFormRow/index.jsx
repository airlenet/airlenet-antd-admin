import styles from "./index.module.less";

const StandardFormRow = {
  props: {
    title: {
      type: String
    },
    grid: {
      type: Boolean
    },
    block: { type: Boolean },
    last: { type: Boolean }
  },
  data() {
    return {
      styles
    };
  },
  render() {
    const cls = [
      styles.standardFormRow,
      {
        [styles.standardFormRowBlock]: this.block,
        [styles.standardFormRowLast]: this.last,
        [styles.standardFormRowGrid]: this.grid
      }
    ];
    return (
      <div class={cls}>
        {this.title && (
          <div class={styles.label}>
            <span>{this.title}</span>
          </div>
        )}
        <div class={styles.content}>{this.$slots.default}</div>
      </div>
    );
  }
};

export default StandardFormRow;
