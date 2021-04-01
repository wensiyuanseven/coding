const xss = require("xss");
const options = {
  whiteList: {
    a: ["title", "target"],
    p: [],
    span: [],
    h1: []
  }
};
// 白名单过滤
const myxss = new xss.FilterXSS(options);
// 遇见script标签会直接把<转义
const result = myxss.process('<scr<script>ipt>alert("xss");</script>');
// const result = myxss.process('<a src="abc"  title="aaa">哈哈</a>');
console.log(result);
// &lt;script&gt;alert("xss");&lt;/script&gt; result
