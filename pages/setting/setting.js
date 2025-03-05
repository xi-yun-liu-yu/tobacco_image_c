Page({
  data: {},
  exit:function(){
    dd.confirm({
      title: '确认退出',
      content: '您将注销登录并返回登录界面',
      cancelButtonText: '不了',
      confirmButtonText: '确认',
      success: (res) => {
        // console.log(res);
        if(res["confirm"]){
          dd.reLaunch({
            url: "/pages/login/login",
            success: () => {},
            fail: () => {},
            complete: () => {

            },
          });
        }
      },
      fail: (res) => {
        // console.log(res);
      },
      complete: (res) => {
        // console.log(res);
      },
    });

  },

});
