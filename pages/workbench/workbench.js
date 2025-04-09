Page({
  data:{
    customerID:"",
    authority:"",
    token:"",
    greeting:"",
    managerID:"",
    managerName:"",
    name:"",
    customerList:[],
    Id_director:"",
    name_director:"",
    Id_super:"",
    name_super:"",
  },
  onLoad(e){
    console.log(e)
    let currentTime = new Date();
    let hour = currentTime.getHours();
    if(hour >=6 && hour < 9){
      this.setData({
        greeting:"早上好！"
      })
    }else if(hour >= 9 && hour < 12){
      this.setData({
        greeting:"上午好！"
      })
    }else if(hour >= 12 && hour <14){
      this.setData({
        greeting:"中午好！"
      })
    }else if(hour >= 14 && hour <17){
      this.setData({
        greeting:"下午好！"
      })
    }else if(hour >= 17 && hour <22){
      this.setData({
        greeting:"晚上好！"
      })
    }else if(hour >= 22 || hour < 6 ){
      this.setData({
        greeting:"早点休息"
      })
    }
    this.setData({
      customerID: e["customerID"],
      authority: e["authority"],
      token: e["token"],
      name:e["name"]
    })
    if(this.data.authority == 0){
      this.setData({
        managerID:e["managerID"],
        managerName:e["managerName"],
        Id_director:e["IdDirector"],
        name_director:e["nameDirector"],
        Id_super:e["IdSuper"],
        name_super:e["nameSuper"],
      })
    }else if(this.data.authority == 1 || this.data.authority == 2 || this.data.authority == 3){
      dd.getStorage({
        key: `list`,
        success: (res) => {
          // console.log(res)
          this.setData({
            customerList: res.data
          })
        },
        fail: () => {},
        complete: () => {},
      });
    }
    dd.showToast({
      content: '登录成功',
      duration: 500,
    });
  },

  up:function(){
    let id = this.data.customerID;
    let m = "&authority=" +  this.data.authority;
    let token = "&token=" +  this.data.token;
    let name = "&name=" +  this.data.name;
    if(this.data.authority <= 0){
      let managerName = "&managerName=" +  this.data.managerName;
      let managerID = "&managerID=" +  this.data.managerID;
      let Id_director = "&Id_director=" +  this.data.Id_director;
      let name_director = "&name_director=" +  this.data.name_director;
      let Id_super = "&Id_super=" +  this.data.Id_super;
      let name_super = "&name_super=" +  this.data.name_super;
      let url = "/pages/index/index?customerID="+id+m+token+name+managerName+managerID+Id_director+name_director+Id_super+name_super;
      dd.navigateTo({
        url: url,
      });
    }else if(this.data.authority == 1 || this.data.authority == 2 || this.data.authority == 3){
      let url = "/pages/index/index?customerID="+id+m+token+name;
      dd.navigateTo({
        url: url,
      });
    }
    
    
  },

  down:function(){
    let id = this.data.customerID;
    let m = "&authority=" +  this.data.authority;
    let token = "&token=" +  this.data.token;
    let name = "&name=" +  this.data.name;
    if(this.data.authority <= 0){
      let managerName = "&managerName=" +  this.data.managerName;
      let managerID = "&managerID=" +  this.data.managerID;
      let url = "/pages/getHistroy/getHistroy?customerID="+id+m+token+name+managerName+managerID;
      dd.navigateTo({
        url: url,
      });
    }else if(this.data.authority == 1 || this.data.authority == 2 || this.data.authority == 3){
      let url = "/pages/getHistroy/getHistroy?customerID="+id+m+token+name;
      dd.navigateTo({
        url: url,
      });
    }
  },
  work:function(){
    let id = this.data.customerID;
    let m = "&authority=" +  this.data.authority;
    let token = "&token=" +  this.data.token;
    let name = "&name=" +  this.data.name;
    if(this.data.authority == 1 || this.data.authority == 2 || this.data.authority == 3){
      let url = "/pages/getHistroy2/getHistroy2?customerID="+id+m+token+name;
      dd.navigateTo({
        url: url,
      });
    }
  },
  supervise:function(){
    let id = this.data.customerID;
    let m = "&authority=" +  this.data.authority;
    let token = "&token=" +  this.data.token;
    let name = "&name=" +  this.data.name;
    if(this.data.authority == 1 || this.data.authority == 2 || this.data.authority == 3){
      let url = "/pages/supervise/supervise?customerID="+id+m+token+name;
      dd.navigateTo({
        url: url,
      });
    }
  },

  goSetting:function(){
    let url = "/pages/setting/setting";
    dd.navigateTo({
      url: url,
      
      success: () => {},
      fail: () => {},
      complete: () => {},
    });
  }
  
})