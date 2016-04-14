/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * ID DOM操作简写
 * @param  {String} id 元素ID
 * @return {DOM Object}    DOM对象
 */
function $(id) {
	return (typeof id === 'string') ? document.getElementById(id) : id; 
}
/**
 * TODO: 缓存DOM
 * @param  {String} id DOM的ID值
 * @return {Object}    对应ID的DOM
 */
function domCache(id){

}
function createEl(tagName, text, parent){
	var el = document.createElement(tagName);
	if ( text ){
		var content = document.createTextNode(text);
		el.appendChild(content);
	}
	if (!parent){
		return el;
	} else {
		parent.appendChild(el);
	}
}

function createTrWith3Td(d1, d2, d3){
  var td1,td2,td3;
	if (typeof d1 === "object") {
		td1 = createEl("td").appendChild(d1);
	} else {
		td1 = createEl("td", d1);
	}
	if (typeof d2 === "object") {
		td2 = createEl("td").appendChild(d2);
	} else {
		td2 = createEl("td", d2);
	}
	if (typeof d3 === "object") {
		td3 = createEl("td").appendChild(d3);
	} else {
		td3 = createEl("td", d3);
	}
	var tr = document.createElement('tr');
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);

	return tr;
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = $("aqi-city-input").value;
	var value  = $("aqi-value-input").value;
	aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	/* 
	| clear table */
	$("aqi-table").innerHTML = "";
	/*
	| render table header*/

	$("aqi-table").appendChild(
		createTrWith3Td(
			createEl('td', '城市'),
			createEl('td', '空气质量'),
			createEl('td', '操作')		
			)
	);

	// TODO : 增加一种使用字符串拼接方式，实现页面渲染

	/**
	 * 数据遍历，渲染表格
	 * @param  {[type]} element [description]
	 * @param  {[type]} index)  [description]
	 * @return {[type]}         [description]
	 */
	Object.getOwnPropertyNames(aqiData).forEach( function(element, index) {
		console.log( "城市" + element + '->' + aqiData[element] );
		$('aqi-table').appendChild(
			createTrWith3Td(
				element,
				aqiData[element],
				createEl("button","x")
			)
		);
	});

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  $("add-btn").addEventListener('click', addBtnHandle);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  
  $("aqi-table").addEventListener("click",function (e) {
  	// TODO : 调用命名函数来绑定回调
  	if (e.target.innerHTML === 'x') {
  		e.target.parentNode.remove();
  	}
  	return false;
  });
}

window.onload = init;
