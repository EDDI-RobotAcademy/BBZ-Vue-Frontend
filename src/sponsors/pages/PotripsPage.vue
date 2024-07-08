<template>
    <div>Our First Sponsor</div>
</template>

<script>

export default {
    created() {
        window.location.href = "http://192.168.0.46:8080/";
    },
    methods: {
        async waitOneMinute() {
            setTimeout(() => console.log("after"), 18000);
        }
    },
    mounted() {
        this.waitOneMinute()
    }
};
</script>