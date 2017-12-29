# JGForm
简介
通过JGForm.js，你可以很快速的搭建起应用场景复杂的表单。我们无需关注html元素的使用，css样式的设定等，注意力仅需集中在Javascript对象属性的设置上。
==》》外部资源的加载，JS对象转为DOM节点，以及默认事件的绑定，布局的自适应……这一切都是自动完成的。
引用
JGForm.js依赖于Jquery 1.1X.X,因此我们要在它之前载入jquery.js.
    <script src="doc/script/jquery-1.11.3.js"></script>
<script src="doc/script/JGForm.js?v=143311"async></script>

<div id="box"></div>
window.onload = function () {
        JGForm('#box', [])
        }

种类：
1.	输入框
•	文本
	最大长度
	为空判断

•	数字
	最大值
	最小值
2.	选择框
•	下拉单选
	Local
	server
•	下拉多选
	Local
	server

•	日期
	默认组件
	自定义事件

•	月份
3.	附件
•	本地附件
•	Box或其它有效路径
4.	按钮
	自定义事件

浏览器支持情况
IE8-	IE9+	Edge	Chrome	FF

 
 
 
 



