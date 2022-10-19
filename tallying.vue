<template>
    <div class="tallying">
        <div class="top">
            <ul class="wrap">
                <li>
                    <span>发车仓库：</span>
                    <span>{{ query.fromWName }}</span>
                </li>
                <li>
                    <span>线&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;路：</span>
                    <span>{{ query.toWName }}</span>
                </li>
                <li>
                    <span>配送日期：</span>
                    <span>{{ query.shippingdate }}</span>
                </li>
            </ul>
            <ul
                class="wrap field-wrap"
                v-if="materialList && materialList.length"
            >
                <li v-for="(item, index) of materialList" :key="index">
                    <span class="name">{{ item.materialName }}</span>
                    <span class="add-num">{{ item.cumulative }}</span>
                    <span class="get-value">={{ item.qty }}</span>
                    <!-- 为了保证项目稳定运行 不升级vant -->
                    <van-field
                        v-model="item.input"
                        type="text"
                        :formatter="formatter"
                        placeholder="请输入"
                        @blur="blur(index)"
                    />
                </li>
            </ul>
        </div>
        <div class="bottom-fixed">
            <xsyx-button class="xsyx-button" type="B" @click="submit"
                >保存</xsyx-button
            >
        </div>
    </div>
</template>

<script>
import xsyxButton from "@/components/xsyx-button.vue";
import { materialApi } from "../api";
import { parseTime } from "@/common/utils/index";
export default {
    name: "tallying",
    data() {
        return {
            number: "",
            addNum: "",
            getValue: "",
            materialList: [], //物料数据
            materialTallyRecordDtoList: [], //存储操作数据
            opreatNum: 1, // 操作次数
            materialDetailDtoList: [], //存储老的操作的次数
            tallyCode: "",
        };
    },
    components: { xsyxButton },
    watch: {},
    mounted() {
        console.error(materialApi, "======materialApi=======");
        if (typeof Flutter != "undefined") {
            window.flutterBridge.setNavigateTitle({
                title: this.$route.meta.title,
            });
            // 隐藏右上角按钮
            window.flutterBridge.showRightButton({
                action: "hidden",
            });
        }
        materialApi
            .getMaterialListForTally(null, {
                noEncryption: true, //不需要走加密
            })
            .then((res) => {
                res.materialList.forEach((ele) => {
                    ele.input = ""; // 输入的值
                    ele.cumulative = ""; //累加
                    ele.qty = ""; //输入的总数
                });
                this.materialList = res.materialList;
                this.queryTallyList();
            });
        console.error(this.query, "======query======");
    },
    computed: {
        getMaterialList() {
            return this.materialList.filter((item) => {
                return typeof item.qty === "number" && !isNaN(item.qty);
            });
        },
        query() {
            return this.$route.query;
        },
    },
    methods: {
        queryTallyList() {
            materialApi
                .queryTallyList(this.query, {
                    noEncryption: true,
                })
                .then((res) => {
                    if (res.tallyCode) {
                        this.tallyCode = res.tallyCode;
                    }
                    // 老数据兼容
                    if (
                        res.materialTallyRecordDtoList &&
                        res.materialTallyRecordDtoList.length
                    ) {
                        // 最后一个数组
                        // const item =
                        //     res.materialTallyRecordDtoList[
                        //         res.materialTallyRecordDtoList.length - 1
                        //     ];
                        const allList = res.materialTallyRecordDtoList.reduce(
                            (all, item) => {
                                return all.concat(item.materialDetailDtoList);
                            },
                            []
                        );
                        console.error(allList, "======allDataList=======");
                        if (allList.length) {
                            const obj = {};
                            // 集合
                            allList.forEach((item) => {
                                if (!obj[item.materialNo]) {
                                    obj[item.materialNo] = [];
                                }
                                obj[item.materialNo].push(item);
                            });
                            console.error(obj, "======分组======");
                            this.materialList.forEach((item) => {
                                const inputList = obj[item.materialNo]; //拿到累加的集合
                                if (inputList) {
                                    console.log(inputList, "===inputList===");
                                    let cumulative = "";
                                    // 求和
                                    item.qty = inputList.reduce(
                                        (all, item, index) => {
                                            if (
                                                index == 0 ||
                                                String(item.qty).substr(
                                                    0,
                                                    1
                                                ) === "-"
                                            ) {
                                                cumulative += String(item.qty);
                                            } else {
                                                cumulative += `+${String(
                                                    item.qty
                                                )}`;
                                            }
                                            return all + Number(item.qty);
                                        },
                                        0
                                    );
                                    item.cumulative = cumulative;
                                }
                            });
                            this.materialTallyRecordDtoList=res.materialTallyRecordDtoList
                            this.opreatNum =
                                res.materialTallyRecordDtoList.length + 1; //操作次数
                        }
                    }
                });
        },
        submit() {
            console.log(
                this.getMaterialList,
                "======this.getMaterialList======="
            );
            if (this.getMaterialList.length == 0) {
                this.$toast.showToast("请填写物料");
                return;
            }
            // 处理数据
            const materialTallyList = this.getMaterialList.map((item) => {
                return {
                    qty: item.qty,
                    unit: item.unit,
                    materialNo: item.materialNo,
                    materialName: item.materialName,
                };
            });
            if (this.materialDetailDtoList.length) {
                this.materialTallyRecordDtoList.push({
                    opreatNum: this.opreatNum++,
                    opreatTime: parseTime(new Date()),
                    materialDetailDtoList: this.materialDetailDtoList,
                });
                this.materialDetailDtoList = [];
            }
            materialApi
                .saveTallyList(
                    {
                        ...this.query,
                        tallyCode: this.tallyCode,
                        materialTallyList,
                        materialTallyRecordDtoList:
                            this.materialTallyRecordDtoList,
                    },
                    {
                        noEncryption: true,
                    }
                )
                .then((res) => {
                    console.log(res, "======res=======");
                    this.$toast.showToast("保存成功");
                });
        },
        blur(index) {
            const item = this.materialList[index];
            const input = item.input;
            if (!input || input === "-" || /^0+$/.test(input)) {
                item.input = "";
                return;
            }
            const num = String(input);
            if (num.substr(0, 1) === "-") {
                item.cumulative += num;
            } else {
                item.cumulative += `${item.cumulative ? "+" : ""}${num}`;
            }
            item.qty = Number(item.qty) + Number(input);
            this.materialDetailDtoList.push({
                qty: Number(item.input),
                materialNo: item.materialNo,
            });
            item.input = "";
        },
        formatter(value, allowDot = false, allowMinus = true) {
            if (allowDot) {
                value = this.trimExtraChar(value, ".", /\./g);
            } else {
                value = value.split(".")[0];
            }

            if (allowMinus) {
                value = this.trimExtraChar(value, "-", /-/g);
            } else {
                value = value.replace(/-/, "");
            }
            const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;

            return value.replace(regExp, "");
        },
        trimExtraChar(value, char, regExp) {
            const index = value.indexOf(char);
            let prefix = "";

            if (index === -1) {
                return value;
            }

            if (char === "-" && index !== 0) {
                return value.slice(0, index);
            }

            if (char === "." && value.match(/^(\.|-\.)/)) {
                prefix = index ? "-0" : "0";
            }

            return (
                prefix +
                value.slice(0, index + 1) +
                value.slice(index).replace(regExp, "")
            );
        },
    },
};
</script>

<style scoped lang="less">
.tallying {
    background: #f2f2f2;
    box-sizing: border-box;
    font-family: "PingFang SC";
    display: flex;
    flex-direction: column;
    * {
        box-sizing: border-box;
    }

    .wrap {
        background: #ffffff;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
        li {
            font-size: 15px;
            line-height: 30px;
            span {
                &:first-child {
                    color: #768696;
                }
                &:last-child {
                    color: #303030;
                }
            }
        }
        &.field-wrap {
            overflow: hidden;
            padding-top: 0px;
            li {
                margin-top: 20px;
                white-space: nowrap;
                display: flex;
                align-items: center;
                font-size: 16px;
                .name {
                    font-size: 18px;
                    font-weight: bold;
                    color: #303030;
                }
                .add-num {
                    padding: 8px 6px;
                    background: #f8f9fa;
                    border-radius: 5px;
                    color: #2296f3;
                    margin-left: 15px;
                    margin-right: 12px;
                    width: 120px;
                    height: 44px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .get-value {
                    margin-right: 22.5px;
                    margin-right: auto;
                }
                .van-field {
                    background: #f8f9fa;
                    border-radius: 10px;
                    width: 75px;
                    flex-shrink: 0;
                }
            }
        }
    }
    .top {
        padding: 10px;
        flex: 1;
        overflow-y: auto;
    }
    .bottom-fixed {
        height: 100px;
        background: #ffffff;
        .xsyx-button {
            height: 50px;
            border-radius: 25px;
            margin: 8px 20px 0;
        }
    }
}
</style>
