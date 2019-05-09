// example/chou_jiang/chou_jiang.js
const app = getApp()
Page({
  data: {
    lei_xing: '',
    ti_shi: '',
    clearTimeout_id: '',
    form_target_id:'',
    btn_list: [],
    flex_list: [],
    form_list:[],
    flex_des:'',
  },
  formSubmit(e){
    console.log('e.detail.formId，携带数据为：', e.detail.formId);
    console.log('e.target.id，携带数据为：', e.target.id)
    var that = this;
    that.setData({
      form_target_id: e.target.id
    });
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'chou_jiang_form_id/',
            data: {
              code: res.code,
              form_target_id: e.target.id,
              formId: e.detail.formId
            },
            success: function (result) {
              clearTimeout(that.data.clearTimeout_id);
              that.countDown();
              console.log('request success', result);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  chou_jiang_btn: function(e) {
    var that = this;
    console.log(e.target.id)
    wx.request({
      url: app.globalData.global_url + 'chou_jiang_btn/',
      data: {
        btn_id: e.target.id,
      },
      success: function(result) {
        that.setData({
          lei_xing: result.data.lei_xing,
          ti_shi: result.data.ti_shi,
          btn_list: result.data.btn_list,
        });
        console.log('chou_jiang_btn success', result);
      }
    });
  },

  countDown() { //倒计时函数
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: app.globalData.global_url + 'chou_jiang_get_page_data/',
            data: {
              code: res.code,
              form_target_id: that.data.form_target_id
            },
            success: function(result) {
              that.setData({
                flex_des: result.data.lei_xing,
                flex_list: result.data.flex_list,
              });
              console.log(result.data.flex_list);
            }
          });
          var clearTimeout_id_value = setTimeout(that.countDown, 1000);
          that.setData({
            clearTimeout_id: clearTimeout_id_value,
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.global_url + 'chou_jiang_guan_li/',
      data: {

      },
      success: function(result) {
        that.setData({
          lei_xing: result.data.lei_xing,
          ti_shi: result.data.ti_shi,
          btn_list: result.data.btn_list,
          form_list: result.data.form_list,
        });
      }
    });
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearTimeout(this.data.clearTimeout_id);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearTimeout(this.data.clearTimeout_id);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})