``` json
{
    /*
    vs默认对JS使用了prettier
  1.右键单击格式化【单文件组件】 【原先用的时vetur】
    右键单击【js文件】使用的是prettier插件
    保存时自动格式化 如果是在单文件组件中 用的是eslint 如果是在js文件中编辑器自动默认修复【 "eslint.autoFixOnSave": true,】
    但是有一个问题  function后面的空格会被消除 这是侯就要使用eslint配置【  "eslint.autoFixOnSave": true】如果前两个配置都不生效就会使用prettier插件【"prettier.eslintIntegration": true】
  2.ESLint 和 Prettier 都可以格式化代码，如果他们对格式化代码执行不同规则，那就可能发生冲突，
   可以通过配置解决大部分冲突，但仍有一些是无法解决的，比如，Prettier 在 function
   关键字后不允许有空格且不能自定义，那如果想避免 ESLint 不报错，只能配置 ESLint 允许 function 关键字后不带空格（主要针对匿名函数）。
    */
    "window.zoomLevel": 1,
    "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\cmd.exe",
    "eslint.alwaysShowStatus": true,
    "eslint.provideLintTask": true,
    "eslint.quiet": true,
    //编辑器默认保存自动修复js文件
    "editor.formatOnSave": true,
    // eslint保存时自动修复js文件【可修复function关键字后不带空格】
    "eslint.autoFixOnSave": true,
    //保存时在eslint无法自动修改时此配置才会生效【官方描述】
    //千万不要设置此属性
    // "prettier.eslintIntegration": true,
    // 编辑粘贴自动格式化
    "editor.formatOnPaste": true,
    // "editor.fontFamily": "microsoft yahei",
    "eslint.validate": [
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "javascriptreact",
            "autoFix": true
        },
        {
            "language": "vue", // 检测vue文件
            "autoFix": true //  为vue文件开启保存自动修复的功能
        },
        {
            "language": "html",
            "autoFix": true
        }
    ],
    // "prettier.HTMLWhitespaceSensitivity": "ignore",
    // "prettier.bracketSpacing": false,
    // "prettier.proseWrap": "never",
    "prettier.semi": false, //js末尾是否使用分号
    // vetur处理单文件组件格式化    支持格式化嵌入的html/css/scss/less/postcss/stylus/js/ts
    // 如果不设置这些项目格式化时会先进行vetur格式化 然后在进行eslint格式化
    // 关闭vetur格式化template标签,由prettier最终执行
    "vetur.format.defaultFormatter.html": "none",
    "vetur.format.defaultFormatter.js": "prettier",
    "vetur.format.defaultFormatter.less": "prettier",
    "vetur.validation.template": false, //因为使用了eslint-plugin-vue插件 避免vetur验证模板文件
    // "vetur.format.defaultFormatter.postcss": "prettier",
    // "vetur.format.defaultFormatter.scss": "prettier",
    // "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
    // "vetur.format.defaultFormatter.ts": "prettier",
    // 缩进
    "vetur.format.options.tabSize": 4,
    "vetur.format.defaultFormatterOptions": {
        //项目中如果有prettierrc、.prettierrc.js等配置文件，否则会覆盖掉vscode上面的配置
        // 处理单文件中的js文件 继承自 prettier
        "prettier": {
            "semi": false, //是否使用分号
            "singleQuote": true
        },
        //取消vue强制换行【官方不推荐使用】
        // "js-beautify-html": {
        // "wrap_line_length": 160,
        //   "wrap_attributes": "auto",
        //   "end_with_newline": false
        // }
        // 处理单文件组件中的模板
        // 继承自prettyhtml格式化===> https://prettyhtml.netlify.com/     https://vuejs.github.io/vetur/formatting.html#settings
        "prettyhtml": {
            // 模板单行超过n个长度的时候开始换行显示各种参数和事件
            "printWidth": 200,
            //单文件组件html中是否使用单引号
            "singleQuote": true
            // "HTMLWhitespaceSensitivity": "ignore"
            // "bracketSpacing": true
            // "htmlWhitespaceSensitivity": "ignore",
        }
    },
    "javascript.preferences.quoteStyle": "single",
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "files.autoSave": "afterDelay",
    "search.exclude": {
        "**/bower_components": true,
        "**/node_modules": false
    },
    "quokka.compactMessageOutput": true,
    "quokka.suppressExpirationNotifications": true,
    "breadcrumbs.enabled": true,
    "liveServer.settings.donotShowInfoMsg": true,
    "search.quickOpen.includeSymbols": true,
    "diffEditor.ignoreTrimWhitespace": false,
    "workbench.colorTheme": "Material Theme High Contrast",
    "editor.mouseWheelZoom": true,
    "editor.lineHeight": 22,
    //防止单文件组件首行template报错
    "vetur.experimental.templateInterpolationService": false,
    // 启用or禁用vetur格式化程序 【需要重启vscode】
    "vetur.format.enable": true,
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "prettier.stylelintIntegration": true,
    "[jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    // 控制是否在打开文件时，基于文件内容自动检测 Editor: Tab Size 和 Editor: Insert Spaces。如果设置为true则.editorconfi文件中的indent_size会失效
    "editor.detectIndentation": false,
    "prettier.singleQuote": true
    // 因为设置了 "editor.detectIndentation": false 所以该设置仅对settings.json文件缩进起作用
    // "editor.tabSize": 4
}
```
