window.onload = function () {
	// 数据
	var json = {
		title: [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"31",
			"32",
			"33",
			"34",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"31",
			"32",
			"33",
			"34",
		]
	};
	// 调用封装函数 json对象写数据
	var arr = [];
	var iNow = 9;
	page({
		// 容器id
		id: 'div1',
		// 当前页
		nowNum: 3,
		// 总页数 动态获取
		allNum: Math.ceil(json.title.length / 10),
		// 回调函数
		callBack: function (now, all) {

			// 显示数据的逻辑
			var num = now * 10 < json.title.length ? 10 : json.title.length - (now - 1) * 10;
			var oUl = document.getElementById("ul1");
			//循环数据 
			//点击的时候 把前一页数据隐藏
			// for (var i = 0; i < aLi.length; i++) {
			// 	aLi[i].style.display = "none";
			// }
			if (oUl.innerHTML == '') {
				// 显示后一页
				for (var i = 0; i < num; i++) {
					var oLi = document.createElement("li");
					oLi.innerHTML = json.title[(now - 1) * 10 + i];
					oUl.appendChild(oLi);
				}
			} else {
				var aLi = document.getElementsByTagName("li");
				console.log(num,'s')
				for (var i = 0; i < num; i++) {
					aLi[i].innerHTML = json.title[(now - 1) * 10 + i];
				}
			}

		}
	});
};
// 写一个封装函数
function page(opt) {
	if (!opt.id) { return false };
	// 获取id
	var obj = document.getElementById(opt.id);

	// 如果当前页默认不写 给它一个初始值为1
	var nowNum = opt.nowNum || 1;
	// 如果总页数不写 给它一个默认值为5
	var allNum = opt.allNum || 5;
	// 如果没有回调函数 直接执行空函数
	var callBack = opt.callBack || function () { };
	// 首页
	if (nowNum >= 4 && allNum >= 6) {
		var oA = document.createElement("a");
		oA.href = "#1";
		oA.innerHTML = "首页";
		obj.appendChild(oA);
	}
	// 上一页
	if (nowNum >= 2) {
		var oA = document.createElement("a");
		oA.href = "#" + (nowNum - 1);
		oA.innerHTML = "上一页"
		obj.appendChild(oA);
	}
	// 如果当前页数<=5
	if (allNum <= 5) {
		for (var i = 1; i <= allNum; i++) {
			var oA = document.createElement('a');
			oA.href = '#' + i;
			// 区分当前页
			if (i == nowNum) {
				oA.innerHTML = i;
			} else {
				oA.innerHTML = '[' + i + ']';
			}
			// 把它添加到容器当中
			obj.appendChild(oA);
		}

	}
	// 当前页数>5
	else {
		for (var i = 1; i <= 5; i++) {
			var oA = document.createElement('a');
			// 对第一页和第二页进行特殊处理
			if (nowNum == 1 || nowNum == 2) {
				oA.href = "#" + i;
				if (nowNum == i) {
					oA.innerHTML = i;
				} else {
					oA.innerHTML = "[" + i + "]";
				}
			}
			//对最后两页进行处理
			else if ((allNum - nowNum == 0) || (allNum - nowNum == 1)) {
				oA.href = "#" + (allNum - 5 + i);
				// 倒数第一项
				if ((allNum - nowNum == 0) && i == 5) {
					oA.innerHTML = (allNum - 5 + i);
				} else if ((allNum - nowNum == 1) && i == 4) {
					oA.innerHTML = (allNum - 5 + i);
				}
				else {
					oA.innerHTML = "[" + (allNum - 5 + i) + "]";
				}

			}
			//对中间的页数进行处理
			else {
				oA.href = "#" + (nowNum - 3 + i);
				// 当前页
				if (i == 3) {
					oA.innerHTML = nowNum - 3 + i;
				} else {

					oA.innerHTML = "[" + (nowNum - 3 + i) + "]";
				}
			}
			obj.appendChild(oA);

		}
	}
	// 下一页
	if ((allNum - nowNum) >= 1) {
		var oA = document.createElement("a");
		oA.href = "#" + (nowNum + 1);
		oA.innerHTML = "下一页"
		obj.appendChild(oA);

	}
	// 尾页
	if (allNum - nowNum >= 3 && allNum >= 6) {
		var oA = document.createElement("a");
		oA.href = "#" + allNum;
		oA.innerHTML = "尾页"
		obj.appendChild(oA);
	}
	// 执行会回调函数
	callBack(nowNum, allNum);
	var aa = obj.getElementsByTagName("a");
	for (var i = 0; i < aa.length; i++) {
		aa[i].onclick = function () {
			//得到相对路径 获取当前页码
			var nowNum = parseInt(this.getAttribute('href').substring(1));
			// 让当前容器清空
			obj.innerHTML = "";
			// 重新执行函数
			page({
				id: obj.id,
				nowNum: nowNum,
				// 之前传过来的allNum
				allNum: allNum,
				// 当点击的时候重新触发回调函数
				callBack: callBack
			});
			// 阻止默认事件
			return false;
		}
	}
}
