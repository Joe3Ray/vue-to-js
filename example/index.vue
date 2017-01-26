<template>
    <div class="pen">
        <h2>{{ title }}</h2>
        <div>
            <p>123</p>
        </div>
    </div>
</template>

<style>
    .pen {
        text-align: left;
    }
</style>

<script>
    import a from 'a';
    module.exports = {
        data: function () {
            return {
                title: ''
            };
        },
        created: function () {
            let b = 123;
            console.log(b);
        },
        components: {
            tab: require('tab')
        }
    };
</script>