<script lang="jsx">
import {Fragment} from "vue-fragment";
export default {
  name: "SlotProps",
  props: {
    slots: {},
    propsData: {}
  },
  render() {
    return (
      <Fragment>
        {this.propsData ? this.slots.map(slot => {
          slot.componentOptions.propsData = {...slot.componentOptions.propsData, ...this.propsData}
          return slot
        }) : this.slots}
      </Fragment>
    )
  }
}
</script>
