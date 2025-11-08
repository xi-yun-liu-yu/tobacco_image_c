// pages/cabinetRecognition/cabinetRecognition.js
Page({
  data: {
    // 图片相关
    displayImage: '',
    hasUploadedImage: false,
    
    // 柜面尺寸数据
    showDimensions: false,
    cabinetLength: '',
    cabinetWidth: '',
    
    // 陈列评语
    showComment: false,
    displayComment: '',
    
    // 规则选择弹窗 - 注意：这里改为 false 时弹窗显示
    ruleModalHidden: true,
    
    // 核心指标选项
    coreIndicators: [
      { label: '利润', value: 'profit', checked: false },
      { label: '订销比', value: 'orderSalesRatio', checked: false },
      { label: '可销天数', value: 'salesDays', checked: false }
    ],
    
    // 陈列标准选项
    displayStandards: [
      { label: '颜色统一', value: 'colorUniform', checked: false },
      { label: '品规统一', value: 'specUniform', checked: false },
      { label: '型号统一', value: 'modelUniform', checked: false }
    ],
    
    // 已选择的规则
    selectedCoreIndicator: '',
    selectedDisplayStandard: ''
  },
  
  // 柜面识别 - 上传图片
  handleCabinetRecognition() {
    this.chooseImage((tempFilePath) => {
      // 显示上传的图片
      this.setData({
        displayImage: tempFilePath,
        hasUploadedImage: true,
        showDimensions: true
      });
      
      // 生成模拟尺寸数据
      this.generateMockDimensions();
    });
  },
  
  // 陈列评分 - 上传图片
  handleDisplayScore() {
    this.chooseImage((tempFilePath) => {
      // 显示陈列评语
      this.setData({
        showComment: true
      });
      
      // 生成模拟评语（增加长文本示例，测试滚动效果）
      this.generateMockComment(true);
    });
  },
  
  // 选择图片（拍照或相册）
  chooseImage(callback) {
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 1,
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        callback && callback(tempFilePath);
      },
      fail: (err) => {
        dd.showToast({
          content: '图片选择失败，请重试',
          type: 'none',
          duration: 1500
        });
        console.error('选择图片失败:', err);
      }
    });
  },
  
  // 生成模拟柜面尺寸数据
  generateMockDimensions() {
    // 生成1-5米之间的随机长度和宽度
    const length = (Math.random() * 4 + 1).toFixed(2);
    const width = (Math.random() * 2 + 0.5).toFixed(2);
    
    this.setData({
      cabinetLength: length,
      cabinetWidth: width
    });
  },
  
  // 生成模拟陈列评语（支持长文本）
  generateMockComment(isLongText = false) {
    const shortComments = [
      "陈列整体整洁有序，商品摆放规范，符合陈列标准，视觉效果良好。",
      "商品陈列层次分明，重点商品突出，便于顾客挑选，建议适当增加促销标识。",
      "陈列布局合理，空间利用充分，商品分类清晰，符合品牌形象要求。",
      "商品摆放整齐，价签齐全准确，陈列密度适中，顾客购物体验良好。",
      "陈列符合公司标准，商品丰满度适中，色彩搭配协调，整体视觉效果佳。"
    ];
    
    // 长文本评语（测试滚动效果）
    const longComment = "陈列整体符合公司规定标准，商品摆放整齐有序，分类清晰明确，便于顾客快速找到所需商品。重点推广商品位置突出，搭配相应促销标识，视觉引导效果良好。商品丰满度适中，无空缺位置，价签齐全且与商品一一对应，信息准确无误。陈列层次分明，高低错落有致，营造出良好的视觉层次感。色彩搭配协调统一，符合品牌形象定位，整体视觉效果舒适。建议在节假日期间适当增加陈列密度，突出节日氛围；同时加强商品陈列的定期维护，确保始终保持良好状态。继续保持现有陈列标准，不断优化细节，提升顾客购物体验和品牌形象。";
    
    let comment;
    if (isLongText) {
      comment = longComment;
    } else {
      const randomIndex = Math.floor(Math.random() * shortComments.length);
      comment = shortComments[randomIndex];
    }
    
    this.setData({
      displayComment: comment
    });
  },
  
  // 打开规则选择弹窗 - 关键：设置 ruleModalHidden 为 false
  handleSelectRule() {
    if (!this.data.hasUploadedImage) {
      dd.showToast({
        content: '请先上传柜面图片',
        type: 'none',
        duration: 1500
      });
      return;
    }
    
    // 显示弹窗
    this.setData({
      ruleModalHidden: false
    });
  },
  
  // 关闭规则选择弹窗 - 设置 ruleModalHidden 为 true
  cancelRuleSelection() {
    this.setData({
      ruleModalHidden: true
    });
  },
  
  // 确认规则选择
  confirmRuleSelection() {
    const { selectedCoreIndicator, selectedDisplayStandard } = this.data;
    
    // 验证是否都已选择
    if (!selectedCoreIndicator || !selectedDisplayStandard) {
      dd.showToast({
        content: '请选择核心指标和陈列标准',
        type: 'none',
        duration: 1500
      });
      return;
    }
    
    // 关闭弹窗
    this.setData({
      ruleModalHidden: true
    });
    
    // 根据选择的规则展示对应的图片（这里使用本地模拟图片路径）
    this.showRuleImage();
    
    dd.showToast({
      content: '规则选择成功',
      type: 'success',
      duration: 1500
    });
  },
  
  // 核心指标选择变化
  handleCoreIndicatorChange(e) {
    const value = e.detail.value;
    const coreIndicators = this.data.coreIndicators.map(item => ({
      ...item,
      checked: item.value === value
    }));
    
    this.setData({
      coreIndicators,
      selectedCoreIndicator: value
    });
  },
  
  // 陈列标准选择变化
  handleDisplayStandardChange(e) {
    const value = e.detail.value;
    const displayStandards = this.data.displayStandards.map(item => ({
      ...item,
      checked: item.value === value
    }));
    
    this.setData({
      displayStandards,
      selectedDisplayStandard: value
    });
  },
  
  // 根据选择的规则展示对应的图片
  showRuleImage() {
    const { selectedCoreIndicator, selectedDisplayStandard } = this.data;
    
    // 这里使用模拟的图片路径，实际项目中应替换为真实图片路径
    let imagePath = '/images/default.png';
    
    // 根据不同的规则组合展示不同的图片
    if (selectedCoreIndicator === 'profit' && selectedDisplayStandard === 'colorUniform') {
      imagePath = '/pages/image/downLoad.png';
    } else if (selectedCoreIndicator === 'orderSalesRatio' && selectedDisplayStandard === 'specUniform') {
      imagePath = '/pages/image/work.png';
    } else if (selectedCoreIndicator === 'salesDays' && selectedDisplayStandard === 'modelUniform') {
      imagePath = '/pages/image/upLoad.png';
    } else if (selectedCoreIndicator === 'profit' && selectedDisplayStandard === 'specUniform') {
      imagePath = '/pages/image/supervise.png';
    } else if (selectedCoreIndicator === 'orderSalesRatio' && selectedDisplayStandard === 'colorUniform') {
      imagePath = '/pages/image/supervise.png';
    } else if (selectedCoreIndicator === 'salesDays' && selectedDisplayStandard === 'colorUniform') {
      imagePath = '/pages/image/upLoad.png';
    } else {
      imagePath = '/images/default-rule.png';
    }
    
    this.setData({
      displayImage: imagePath
    });
  }
});