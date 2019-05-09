var app = getApp()
Page({
  data: {
    showTopTips_normal:false,
    showTopTips_fail:false,
    showTopTips_normal_txt:'',
    showTopTips_fail_txt:'',
    app_tittle: '两高楼宇采集',
    app_des: '两高楼宇采集',
    app_code_des: '您没有权限，请联系管理员',
    app_code: '13355661100',
    list: [],
    xian_chang_jing_du:'',

  },
  huo_qu_jing_wei_du() {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'chou_jiang_mail/',
            data: {
              code: res.code,
              mail_addr: that.data.app_code_des,
            },
            success: function (result) {
              if (result.data.描述 == "成功") {
                that.setData({
                  showTopTips_normal_txt: result.data.描述,
                  showTopTips_normal: true,
                });
                setTimeout(function () {
                  that.setData({
                    showTopTips_normal: false
                  });
                }, 3000);
              } else {
                that.setData({
                  showTopTips_fail_txt: result.data.描述,
                  showTopTips_fail: true,
                });
                setTimeout(function () {
                  that.setData({
                    showTopTips_fail: false
                  });
                }, 3000);
              }
              console.log('request success', result)
            }
          })
        } else {
          that.setData({
            showTopTips_fail_txt: res.errMsg,
            showTopTips_fail: true,
          });
          setTimeout(function () {
            that.setData({
              showTopTips_fail: false
            });
          }, 3000);
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  bindCountryChange5: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      app_code_des: e.detail.value
    })
  },
  onLoad: function (options) {
    // Do something when page ready.
    var that = this;
    console.log(options.page_name)
    console.log(options.page_desc)
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'chou_jiang_get_home_data/',
            data: {
              code: res.code,
            },
            success: function (result) {
              if (result.data.描述 == "下载成功") {
                that.setData({
                  app_tittle: result.data.主页标题,
                  app_des: result.data.主页描述,
                  app_code_des: result.data.验证码标题,
                  app_code: result.data.验证码描述,
                  list: result.data.主界内容,
                });
              }else{
                wx.navigateTo({
                  url: '../../example/zhu_che/zhu_che'
                })
              }
              console.log('request success', result)
            }
          })
        } else {
          that.setData({
            showTopTips_fail_txt: res.errMsg,
            showTopTips_fail: true,
          });
          setTimeout(function () {
            that.setData({
              showTopTips_fail: false
            });
          }, 3000);
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

});