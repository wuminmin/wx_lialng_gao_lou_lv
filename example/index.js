//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    phone_input: "",
    sms_code_input: "",
    modal_tittle: "绑定手机号",
    send_sms_code_hidden: false,
    hiddenmodalput: true,
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.formId)
    this.bindViewTap(e.detail.formId)

  },
  formReset() {
    console.log('form发生了reset事件')
  },
  phone_input_bindinput: function (e) {
    this.setData({
      phone_input: e.detail.value
    });
  },
  sms_code_input_bindinput: function (e) {
    this.setData({
      sms_code_input: e.detail.value
    });
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function (e) {
    var that = this
    //发起网络请求
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'chou_jiang_check_sms_code/',
            data: {
              code: res.code,
              phone: that.data.phone_input,
              sms_code: that.data.sms_code_input
            },
            success: function (result) {
              if (result.data == "绑定成功") {
                that.setData({
                  hiddenmodalput: true
                })
                that.login_check()
              } else {
                that.setData({
                  modal_tittle: result.data
                });
              }
              console.log('request success', result)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  //事件处理函数
  bindViewTap: function (formId) {
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'chou_jiang_login_check/',
            data: {
              code: res.code,
              formId: formId
            },
            success: function (result) {
              if (result.data.描述 == "新界面") {
                wx.navigateTo({
                  url: '../example/new_home/new_home'
                })
              } else {
                that.modalinput()
              }
              console.log('request success', result)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  login_check: function (e) {
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'chou_jiang_login_check/',
            data: {
              code: res.code
            },
            success: function (result) {
              if (result.data.描述 == "新界面") {
                wx.navigateTo({
                  url: '../example/new_home/new_home'
                })
              } else {
                that.modalinput()
              }
              console.log('request success', result)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  send_sms_code: function (e) {
    var that = this
    //发起网络请求
    wx.request({
      url: app.globalData.global_url + 'chou_jiang_send_sms_code/',
      data: {
        phone: that.data.phone_input
      },
      success: function (result) {
        if (result.data == "OK") {
          that.setData({
            send_sms_code_hidden: true
          });
        } else if (result.data == "isv.MOBILE_NUMBER_ILLEGAL") {
          that.setData({
            modal_tittle: "不合法的手机号"
          });
        } else if (result.data == "isv.SMS_SIGNATURE_ILLEGAL") {
          that.setData({
            modal_tittle: "短信签名不合法"
          });
        } else {
          that.setData({
            modal_tittle: result.data
          });
        }
        console.log('request success', result)
      }
    })
  }
})