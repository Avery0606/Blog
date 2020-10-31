<template>
  <div class="content-body">
    <div class="toolbar"><!--工具栏-->
      <button @click="Bold" id="Bold" title="加粗" v-bind:class="{Bolding:tools.Bold}">B</button>
      <button @click="Italic" id="Italic" title="斜体" v-bind:class="{Italicing:tools.Italic}">I</button>
      <button @click="Underline" id="Underline" title="下划线" v-bind:class="{Underlining:tools.Underline}">U</button>
      <button @click="Superscript" id="Superscript" title="上角标" v-bind:class="{Superscripting:tools.Superscript}">x²</button>
      <button @click="Subscript" id="Subscript" title="下角标" v-bind:class="{Subscripting:tools.Subscript}">x₂</button>
      <button @click="BackColor" id="BackColor" title="突出显示文本" v-bind:class="{BackColoring:tools.BackColor}">A</button>
      <!-- <button @click="Undo" id="Undo">后退</button>
      <button @click="Redo" id="Redo">前进</button> -->
      <div class="splitline"></div>

      <button @click="InsertHorizontalRule" title="插入水平线">L</button>
      <button @click="InsertOrderedList" title="插入有序列表">
        <i class="iconfont icon-youxuliebiao"></i>
      </button>
      <button @click="InsertUnorderedList" title="插入有序列表">
        <i class="iconfont icon-wuxuliebiao"></i>
      </button>
      
      <div class="splitline"></div>

      <button @click="JustifyLeft" title="左对齐">
        <i class="iconfont icon-zuoduiqi"></i>
      </button>
      <button @click="JustifyCenter" title="居中">
        <i class="iconfont icon-icon--"></i>
      </button>
      <button @click="JustifyRight" title="右对齐">
        <i class="iconfont icon-youduiqi"></i>
      </button>
      <button @click="JustifyFull" title="两端对齐">
        <i class="iconfont icon-liangduanduiqimohangjuzhongduiqi"></i>
      </button>

      <div class="splitline"></div>

      <select v-model="tools.Typeface" @change="Typeface" id="Typeface" title="字体">
        <option disabled>Type</option>
        <option  v-bind:key="value" v-for="value of fontNames">{{value}}</option>
      </select>
      <select v-model="tools.FormatBlock" @change="FormatBlock" id="FormatBlock" title="标题">
        <option disabled>Head</option>
        <option>H1</option>
        <option>H2</option>
        <option>H3</option>
        <option>H4</option>
        <option>H5</option>
        <option>H6</option>
      </select>
      <select v-model="tools.FontSize" @change="FontSize" id="FontSize" title="字号" style="margin-right:1px">
        <option disabled>Size</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
      </select>

      <div class="splitline"></div>

      <button @click="clickEle('GetImage')" title="插入图片">
        <i class="iconfont icon-tupian" style="color:rgb(40, 144, 255)"></i>
        <input type="file" accept="image/png,image/jpg,image/jpeg" id="GetImage" @change="InsertImage" style="display:none">
      </button>
      <button @click="RemoveFormat" title="清除文字所有格式">
        <i class="iconfont icon-qingchugeshi" style="color:rgb(40, 144, 255)"></i>
      </button>
    </div>
    <div class="getTitle"><!--输入标题-->
      <input v-model="title" placeholder="输入标题..." title="输入文章标题" id="getTitle" @focus="handleTitle" @blur="unhandleTitle" autocomplete="off">
    </div>
    <!--文本区-->
    <div contenteditable="true" id="writearea" class="writearea" @focus="writing" @blur="unwriting">
      <!-- <span v-if="defaulttext" style="color:rgb(117,117,117)">{{defaulttext}}</span> -->
      {{defaulttext}}
    </div>
  </div>
</template>
<script>
import '../assets/css/Align icons/iconfont.css'
import '../assets/css/List Icon/iconfont.css'
import '../assets/css/Image icons/iconfont.css'
import '../assets/css/Clear format icon/iconfont.css'
import { read } from 'fs'
 export default {
    name: "Editor",
    data() {
      return {
        defaulttext:'输入正文...',
        title:'',
        fontNames:['Arial','微软雅黑','黑体','Times New Roman'],
        tools:{
          Bold:false,
          Italic:false,
          Underline:false,
          Superscript:false,
          Subscript:false,
          BackColor:false,
          Typeface:'Type',
          FormatBlock:'Head',
          FontSize:'Size',
        }   
      };
    },
    mounted(){
      this.writearea = document.getElementById('writearea');
      this.writearea.addEventListener('click',this.handleClick);
      let dom = document.getElementById('writearea');
      dom.style.color="#b3b3b1";
    },
    methods:{
      handleTitle:function(){
        let dom = document.getElementById('getTitle');
        dom.placeholder = '';
      },
      unhandleTitle:function(){
        let dom = document.getElementById('getTitle');
        dom.placeholder = '输入标题...';
      },
      handleClick:function(e){//判断是否点击图片
        if(e.target && e.target.tagName && e.target.tagName.toUpperCase() === 'IMG'){
          this.handleClickImg(e.target);
        }else if(e.target.id != 'overlay'){//点击除图片和拖拽框的其他部分则删除拖拽框
          let item = document.getElementById('overlay');
          if(item){
            item.remove();
          }
        }
      },
      handleClickImg:function(img){//处理点击图片事件
        this.nowImg = img;
        // console.log(img.width)
        this.showOverlay();
      },
      showOverlay() {// 添加蒙层
        this.overlay = document.createElement('div');
        this.overlay.id = 'overlay';
        this.writearea.appendChild(this.overlay);
        // 定位蒙层和大小
        this.repositionOverlay();
      },
      repositionOverlay() {
        let imgRect = this.nowImg.getBoundingClientRect();
        let editorRect = this.writearea.getBoundingClientRect();
        // 设置蒙层宽高和位置
        Object.assign(this.overlay.style, {
            position: 'absolute',
            top: `${imgRect.top - editorRect.top + this.writearea.scrollTop}px`,
            left: `${imgRect.left - editorRect.left - 1 + this.writearea.scrollLeft}px`,
            width: `${imgRect.width}px`,
            height: `${imgRect.height}px`,
            boxSizing: 'border-box',
            border: '1px dashed red'
        });
        // 添加四个顶点拖拽框
        this.createBox();
      },
      createBox() {//设置拖拽框
        this.boxes = [];
        this.addBox('nwse-resize'); // top left
        this.addBox('nesw-resize'); // top right
        this.addBox('nwse-resize'); // bottom right
        this.addBox('nesw-resize'); // bottom left
        this.positionBoxes(); // 设置四个拖拽框位置
      },
      addBox(cursor) {//设置拖拽框样式
        const box = document.createElement('div');
        Object.assign(box.style, {
            position: 'absolute',
            height: '12px',
            width: '12px',
            backgroundColor: 'white',
            border: '1px solid #777',
            boxSizing: 'border-box',
            opacity: '0.80'
        });
        box.style.cursor = cursor;
        box.addEventListener('mousedown', this.handleMousedown);  // 顺便添加事件
        this.overlay.appendChild(box);
        this.boxes.push(box);
      },
      positionBoxes() {// 设置四个拖拽框位置
        let handleXOffset = `-6px`;
        let handleYOffset = `-6px`;
        [{ left: handleXOffset, top: handleYOffset },
        { right: handleXOffset, top: handleYOffset },
        { right: handleXOffset, bottom: handleYOffset },
        { left: handleXOffset, bottom: handleYOffset }].forEach((pos, idx) => {
            Object.assign(this.boxes[idx].style, pos);
        });
      },
      handleMousedown(e) {
        this.dragBox = e.target;
        this.dragStartY = e.clientY;
        this.dragStartX = e.clientX;
        this.preDragWidth = this.nowImg.width;
        this.preDragHeight = this.nowImg.height;
        this.setCursor(this.dragBox.style.cursor);
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleMouseup);
      },
      handleDrag(e) {
        const deltaY = e.clientY - this.dragStartY;// 计算竖直拖动距离
        const deltaX = e.clientX - this.dragStartX;// 计算水平拖动距离
        // 修改图片大小
        if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) { // 左边的两个框
            let width = Math.round(this.preDragWidth - deltaX);
            let height =  Math.round(this.preDragHeight - deltaY);
            this.nowImg.style.width = width + 'px';
            this.nowImg.style.height = height + 'px';
        } else { // 右边的两个框
            let width =  Math.round(this.preDragWidth + deltaX);
            let height =  Math.round(this.preDragHeight + deltaY);
            this.nowImg.style.width = width + 'px';
            this.nowImg.style.height = height + 'px';
        }
        // 同时修改蒙层大小
        this.repositionOverlay();
      },
      handleMouseup() {
          this.setCursor('');
          // 拖拽结束移除事件监听
          document.removeEventListener('mousemove', this.handleDrag);
          document.removeEventListener('mouseup', this.handleMouseup);
      },
      setCursor(value) {// 设置鼠标样式
        [document.body, this.nowImg].forEach(el => {
            el.style.cursor = value;
        });
      },
      clickEle:function(id){
        let dom = document.getElementById(id);
        dom.click();
      },
      unwriting:function(){//当编辑器失去焦点
        let dom = document.getElementById('writearea');
        let text = dom.innerHTML;
        if(!text){
          dom.innerHTML = this.defaulttext;
          dom.style.color = '#b3b3b1';
        }
      },
      writing:function(e){//当编辑器获得焦点
        let dom = document.getElementById('writearea');
        let text = dom.innerHTML;
        let temp = ' '+this.defaulttext+' ';
        if(text === temp || text === this.defaulttext){
          dom.innerHTML = '';
        }
        dom.style.color= '';

      },
      Bold:function(){//字体加粗
        document.execCommand('bold',false,null);
        this.tools.Bold = !this.tools.Bold
      },
      Italic:function(){//斜体
        document.execCommand('italic',false,null);
        this.tools.Italic = !this.tools.Italic
      },
      Underline:function(){//下划线
        document.execCommand('underline',false,null);
        this.tools.Underline = !this.tools.Underline
      },
      Superscript:function(){//上角标
        document.execCommand('superscript',false,null);
        this.tools.Superscript = !this.tools.Superscript
      },
      Subscript:function(){//下角标
        document.execCommand('subscript',false,null);
        this.tools.Subscript = !this.tools.Subscript
      },
      BackColor:function(){//高亮
        (this.tools.BackColor?document.execCommand('backColor',false,'rgb(255,255,255)'):document.execCommand('backColor',false,'rgb(255,255,0)'));
        this.tools.BackColor = !this.tools.BackColor;
      },
      Typeface:function(){//字体
        document.execCommand('fontName',false,this.tools.Typeface)
      },
      FormatBlock:function(){//标题
          document.execCommand('formatBlock',false,this.tools.FormatBlock)
      },
      FontSize:function(){//字号
          document.execCommand('fontSize',false,this.tools.FontSize)
      },
      InsertHorizontalRule:function(){//水平线
        document.execCommand('insertHorizontalRule',false,null);
      },
      InsertOrderedList:function(){//有序列表
        document.execCommand('insertOrderedList',false,null);
      },
      InsertUnorderedList:function(){//无序列表
        document.execCommand('insertUnorderedList',false,null);
      },
      JustifyLeft:function(){//左对齐
        document.execCommand('justifyLeft',false,null);
      },
      JustifyCenter:function(){//居中
        document.execCommand('justifyCenter',false,null);
      },
      JustifyRight:function(){//右对齐
        document.execCommand('justifyRight',false,null);
      },
      JustifyFull:function(){//两端对齐
        document.execCommand('justifyFull',false,null);
      },
      InsertImage:function(){//插入本地图片
        let dom = document.getElementById('GetImage');
        let img = dom.files[0];//这是图片文件
        let src = dom.value;//这里是本地图片的地址
        let reader = new FileReader();
        let base64;
        reader.readAsDataURL(img);
        reader.onload = function(){
          base64 = this.result;
          document.execCommand('inserthtml',false,`<img src=${base64} style='width:100px;height:100px;'>`)
          dom.value = '';//防止无法上传同一张图片
        }
      },
      RemoveFormat:function(){//清除文字所有格式
        document.execCommand('removeFormat',false,null);
      }

      // Undo:function(){//后退 撤销 
      //   document.execCommand('undo',false,null);
      // },
      // Redo:function(){//前进 反撤销
      //   document.execCommand('redo',false,null);
      // }

    },
    
}
</script>
 
<style scoped>
 .ED{
    
 }
  .content-body{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
  }
  .content-body .toolbar{
    width:70%;
    margin-bottom: 2px;
    /* display: flex;
    flex-wrap: wrap;
    flex-direction: row; */
  }
  .content-body .toolbar .splitline{
    display: inline;
    border:none;
    border-right: 0.5px rgb(210, 208, 206) solid;
    margin-left:1px;
    margin-right:1px;
  }
  .content-body .toolbar button{
    outline: none;
    background-color: white;
    border: none;
    padding:7px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .content-body .toolbar button:hover{
    background-color: rgb(236, 245, 255);
  }
  .content-body .toolbar select{
    padding-bottom: 1px;
    outline: none;
    border: 0.5px rgb(102, 177, 255) solid;
    width:60px;
    margin-left:2px;
  }
  .content-body .toolbar select:hover{
    border-color: rgb(40, 144, 255);
  }
  .content-body .toolbar select:focus{
    border-color: rgb(40, 144, 255);
  }
  .content-body .getTitle input{
    border: none;
    outline: none;
    margin-bottom: 1px;
    font-size:22px;
    text-align: center;
  }
  .content-body .writearea{
    position: relative;
    padding-left: 2px;
    padding-top: 1px;
    padding-right: 2px;
    border: 2px rgb(102, 177, 255) solid;
    height:300px;
    width:70%;
    overflow-y: auto;
    outline: none;/* 取消选中时的默认黑色边框 */
  }
  .content-body .writearea:hover{
    border-color: rgb(40, 144, 255);
  }
  .content-body .writearea:focus{
    border-color: rgb(40, 144, 248);
  }

  .Bolding{/*加粗按钮选中*/
    color:rgb(64,158,255);
    font-weight:bold;
  }
  .Italicing{/*斜体按钮选中*/
      font-style:italic;
      color:rgb(64,158,255);
      font-weight:bold;
  }
  .Underlining{/*下划线按钮选中*/
    text-decoration:underline;
    color:rgb(64,158,255);
    font-weight:bold;
  }
  .Superscripting{/*上角标按钮选中*/
    color:rgb(64,158,255);
    font-weight:bold;
  }
  .Subscripting{/*下角标按钮选中*/
    color:rgb(64,158,255);
    font-weight:bold;
  }
  .BackColoring{/*高亮按钮选中*/
    color:rgb(64,158,255);
    font-weight:bold;
  }

</style>