# PhotoWal
改变照片的位置：
  通过config.js,您可以改变照片的呈现位置、角度。当然，也可以同时配置多个位置（json格式），来达到在某个范围特别集中，或者疏散。
  var config={
	"left":[{'min':-60,'max':250},{'min':600,'max':936}],//水平位置范围
	"rotate":[{'min':-90,'max':90}],                    //旋转角度范围
	"top":[{'min':-40,'max':150},{'min':250,'max':400}]//竖向位置范围
}
添加照片：
  想要添加照片，您只需两个步骤：
  1.复制图片到img文件夹。
  2.在data.js中，向data数组添加一个新的对象：
  var data=[
	           {'img':'图片的路径','back':'描述该图片的一段话'},
          ]
  至于控制按钮，您完全不必担心，本案例将会根据data中对象的数量自动添加，并且会自动居中，只要不是太多。