// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行','新款','精选'],
    goods: {
      'pop': {page: 0,list: []},
      'new': {page: 0,list: []},
      'sell': {page: 0,list: []}
    }
  },
  onLoad: function (options) {
    // 1. 请求轮播图以及推荐数据
    this._getMultidata()

    // 2. 请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },

  //------------------网络请求函数---------------------
  _getMultidata(){
    getMultiData().then(res=>{
      // console.log(res)
      // 取出轮播图和推荐的数据
      const banners=res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;

      // console.log(banners)
      // console.log(recommends)

      // 将banners和resommends放到data中
      this.setData({
        // banners: banners,
        // recommends: recommends
        //ES6增强写法
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type){
    // 1. 获取页码
    const page = this.data.goods[type].page + 1;

    // 2. 发送网络请求
    getGoodsData(type,page).then(res=>{
      console.log(res)
      // 2.1 取出数据
      const list = res.data.data.list;

      // 2.2 将数据设置到type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list)

      // 2.3 将数据设置到data的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList ,
        [pageKey]: page 
      })
    })
  },

  //------------------事件监听函数---------------------
  handleTabClick(event){
    // 取出index
    const index = event.detail.index;
    console.log(index)
  }
})