<template>
  <div :class="{ [styles.main]: true }">
    <div :class="{ [stylesFrom.login]: true }">
      <a-form :form="form">
        <a-tabs :defaultActiveKey="loginType" @change="onTabChange">
          <a-tab-pane key="account" tab="账户密码登录">
            <a-alert
              v-if="
                status === 'error' && loginType === 'account' && !submitting
              "
              style="marginBottom: 24px"
              message="账户或密码错误（admin/ant.design）"
              type="error"
              showIcon
            />
            <a-form-item name="userName">
              <a-input
                id="userName"
                size="large"
                name="userName"
                placeholder="用户名: admin or user"
                v-decorator="[
                  'userName',
                  { rules: [{ required: true, message: '请输入用户名!' }] }
                ]"
                :rules="[{ required: true, message: '请输入用户名!' }]"
              >
                <UserOutlined
                  slot="prefix"
                  style="color: #1890ff"
                  :class="{ [stylesFrom.prefixIcon]: true }"
                />
              </a-input>
            </a-form-item>

            <a-form-item name="password">
              <a-input
                id="password"
                size="large"
                name="password"
                placeholder="密码: ant.design"
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入密码!' }] }
                ]"
              >
                <LockTwoTone
                  slot="prefix"
                  :class="{ [stylesFrom.prefixIcon]: true }"
                />
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="mobile" tab="手机号登录">
            <a-alert
              v-if="status === 'error' && loginType === 'mobile' && !submitting"
              style="marginBottom: 24px"
              message="验证码错误"
              type="error"
              showIcon
            />

            <a-form-item name="mobile">
              <a-input
                name="mobile"
                placeholder="手机号"
                size="large"
                v-decorator="[
                  'mobile',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入手机号！',
                        trigger: 'blur'
                      },
                      {
                        pattern: /^1\d{10}$/,
                        message: '手机号格式错误！',
                        trigger: 'blur'
                      }
                    ]
                  }
                ]"
              >
                <MobileTwoTone
                  slot="prefix"
                  :class="{ [stylesFrom.prefixIcon]: true }"
                />
              </a-input>
            </a-form-item>
            <a-form-item shouldUpdate noStyle>
              <a-row :gutter="8">
                <a-col :span="16">
                  <a-form-item name="captcha">
                    <a-input
                      name="captcha"
                      size="large"
                      placeholder="验证码"
                      v-decorator="[
                        'captcha',
                        {
                          rules: [{ required: true, message: '请输入验证码！' }]
                        }
                      ]"
                    >
                      <MailTwoTone
                        slot="prefix"
                        :class="{ [stylesFrom.prefixIcon]: true }"
                      />
                    </a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-button
                    :disabled="timing"
                    :class="{ [stylesFrom.getCaptcha]: true }"
                    size="large"
                    @click="
                      () => {
                        const value = getFieldValue('mobile');
                        onGetCaptcha(value);
                      }
                    "
                  >
                    {{ timing ? `${count} 秒` : "获取验证码" }}
                  </a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div>
          <a-checkbox
            :checked="autoLogin"
            @onChange="e => setAutoLogin(e.target.checked)"
          >
            自动登录
          </a-checkbox>
          <a style="float:right">忘记密码</a>
        </div>
        <a-form-item>
          <a-button
            :loading="submitting"
            size="large"
            :class="{ [stylesFrom.submit]: true }"
            type="primary"
            htmlType="submit"
            @click="handleSubmit"
            >登录
          </a-button>
        </a-form-item>

        <div :class="{ [styles.other]: true }">
          其他登录方式
          <AlipayCircleOutlined :class="{ [styles.icon]: true }" />
          <TaobaoCircleOutlined :class="{ [styles.icon]: true }" />
          <WeiboCircleOutlined :class="{ [styles.icon]: true }" />
          <router-link :class="{ [styles.register]: true }" to="/user/register">
            注册账户
          </router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  AlipayCircleOutlined,
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined
} from "@ant-design/icons-vue";
import styles from "./Login.module.less";
import stylesFrom from "./LoginForm.module.less";

import { getFakeCaptcha } from "@/services/login";

export default {
  name: "Login",
  components: {
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined,
    LockTwoTone,
    MailTwoTone,
    MobileTwoTone,
    UserOutlined
  },
  data() {
    return {
      styles,
      stylesFrom,
      submitting: false,
      autoLogin: true,
      register: "",
      loginType: "account",
      count: 0,
      timing: false,
      status: "",
      form: this.$form.createForm(this, { name: "login" })
    };
  },
  beforeCreate() {
    // this.form = this.$form.createForm(this, { name: "login" });
  },
  methods: {
    setAutoLogin(checked) {
      this.autoLogin = checked;
    },
    onTabChange(key) {
      this.loginType = key;
    },
    getFieldValue() {},
    onGetCaptcha(mobile) {
      const result = getFakeCaptcha(mobile);
      if (result === false) {
        return;
      }
      // message.success('获取验证码成功！验证码为：1234');
      this.timing = true;
    },
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.submitting = true;
          this.$store
            .dispatch("handleLogin", { ...values, type: this.loginType })
            .then(data => {
              this.submitting = false;
              if (data.status == "ok") {
                //
              } else {
                this.status = data.status;
              }
            })
            .catch(err => {
              this.submitting = false;
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
