<template>
    <div id="app" class="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {}
    },
    created() {
        //
    }
}
</script>

<style lang="less">
* {
    box-sizing: border-box;
    margin: 0;
    border: 0;
}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
}

html,
body,
#app,
.app {
    width: 100%;
    height: 100%;
}

.full-screen {
    width: 100%;
    height: 100%;
}

.full-width {
    width: 100%;
}

.full-height {
    height: 100%;
}

.flex-box {
    display: flex;
}
</style>
