<template>
  <div  v-if="show" id="pdfShow" @click="close" style="overflow: auto;">
      <canvas @click.stop="clickCanvas($event)" id="the-canvas"></canvas>
      <div class="foot" v-if='pdfDoc'>
        <!--<button class='left' v-if="pageNum>1" @click.stop="onPrevPage">上一页</button>
        <button class='right' v-if="pageNum<pdfDoc.numPages" @click.stop="onNextPage">下一页</button>-->
        <button class='left btn' v-if="pageNum>1" @click.stop="onPrevPage">上一页</button>
        <span style="width: 300px;display: inline-block;"></span>
        <button class='right btn' v-if="pageNum<pdfDoc.numPages" @click.stop="onNextPage">下一页</button>
      </div>
  </div>
</template>
<script>
import PDFJS from 'pdfjs-dist'
 
export default {
  data () {
    return {
    	show:false,
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      scale:1
    }
  },
  
  methods: {
    showPDF (url) {
    	this.pageNum = 1;
    	if(url){
	      let _this = this
	      _this.show = true;
	      PDFJS.getDocument(url).then(function (pdf) {
	        _this.pdfDoc = pdf
	        _this.renderPage(_this.pageNum)
	      })
    	}
    },
    renderPage (num) {
      this.pageRendering = true
      let _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        var viewport = page.getViewport(_this.scale)
        let canvas = document.getElementById('the-canvas')
        canvas.height = viewport.height
        canvas.width = viewport.width
 
        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        }
        var renderTask = page.render(renderContext)
 
        // Wait for rendering to finish
        renderTask.promise.then(function () {
          _this.pageRendering = false
          if (_this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(_this.pageNumPending)
            _this.pageNumPending = null
          }
        })
      })
    },
    queueRenderPage (num) {
      if (this.pageRendering) {
        this.pageNumPending = num
      } else {
        this.renderPage(num)
      }
    },
    onPrevPage () {//点击上一页
      if (this.pageNum <= 1) {
        return
      }
      this.pageNum--
      this.queueRenderPage(this.pageNum)
    },
    onNextPage () {//点击下一页
      if (this.pageNum >= this.pdfDoc.numPages) {
        return
      }
      this.pageNum++
      this.queueRenderPage(this.pageNum)
    },
    close(){
    	this.show = false;
    	/*document.getElementById('pdfShow').style.display ='none';*/
    },
    clickCanvas(el){
    	el.target.stopPropagation();    
    	el.target.preventDefault();
    }
  }
}
</script>
 
<style scoped>
#pdfShow {
  background-color: rgba(0,0,0,0.75);
  position:fixed;
  z-index: 10000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  padding: 5px;
}
 
.pdf-page {
 
}
.top {
  position: fixed;
  transform: translate(-50%,0);
  left: 50%;
}
.foot {
  position: relative;
  transform: translate(-50%,0);
  left: 50%;
  top: -60px;
}
.btn{
	padding: .5rem 1rem;
}
</style>