<template>
    <steps :active="1" background="#787878">
        <step title="新建"></step>
        <step title="我是步骤1hahhah1"></step>
        <step title="我是步骤2"></step>
        <step title="已完成"></step>
    </steps>
</template>

<script>
import steps from "./steps.vue";
import step from "./step.vue";
export default {
    name: "APP",
    data() {
        return {};
    },
    components: { steps, step },
};
</script>
