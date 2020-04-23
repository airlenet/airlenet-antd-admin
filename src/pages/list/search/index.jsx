import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper.vue";

export default {
  name: "Search",

  render() {
    return (
      <PageHeaderWrapper
        title="搜索列表"
        tabList={[
          {
            key: "articles",
            tab: "文章"
          },
          {
            key: "projects",
            tab: "项目"
          },
          {
            key: "applications",
            tab: "应用"
          }
        ]}
        tabActiveKey={this.getTabKey}
        tabChange={this.handleTabChange}
      >
        <div
          slot="content"
          style={{
            textAlign: "center"
          }}
        >
          <a-input-search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={this.handleFormSubmit}
            style={{
              maxWidth: 522,
              width: "100%"
            }}
          />
        </div>
        <router-view />
      </PageHeaderWrapper>
    );
  },
  computed: {
    loading() {
      return this.$store.state.loading["listAndsearchAndarticles"];
    },
    getTabKey() {
      return this.$route.name;
    }
  },
  methods: {
    handleFormSubmit(value) {
      // eslint-disable-next-line no-console
      console.log(value);
    },
    // getTabKey() {
    //   // const { match, location } = this.props;
    //   // const url = match.path === '/' ? '' : match.path;
    //   // const tabKey = location.pathname.replace(`${url}/`, '');
    //   //
    //   // if (tabKey && tabKey !== '/') {
    //   //     return tabKey;
    //   // }
    //
    //   return "articles";
    // },
    handleTabChange(key) {
      switch (key) {
        case "articles":
          this.$router.push({ name: `articles` });
          break;

        case "applications":
          this.$router.push({ name: `applications` });
          break;

        case "projects":
          this.$router.push({ name: `projects` });
          break;

        default:
          break;
      }
    }
  }
};
