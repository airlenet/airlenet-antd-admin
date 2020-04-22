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
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
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
    }
  },
  methods: {
    handleFormSubmit(value) {
      // eslint-disable-next-line no-console
      console.log(value);
    },
    getTabKey() {
      // const { match, location } = this.props;
      // const url = match.path === '/' ? '' : match.path;
      // const tabKey = location.pathname.replace(`${url}/`, '');
      //
      // if (tabKey && tabKey !== '/') {
      //     return tabKey;
      // }

      return "articles";
    },
    handleTabChange(key) {
      // const { match } = this.props;
      // const url = match.url === '/' ? '' : match.url;
      const url = "";

      switch (key) {
        case "articles":
          this.$route.push(`${url}/articles`);
          break;

        case "applications":
          this.$route.push(`${url}/applications`);
          break;

        case "projects":
          this.$route.push(`${url}/projects`);
          break;

        default:
          break;
      }
    }
  }
};
