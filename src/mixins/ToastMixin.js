export default {
    methods: {
        showToast(variant, title, description){
            this.$root.$bvToast.toast(description, {
                title : title,
                autoHideDelay : 300,
                variant : variant,
                solid : true
            });
        }
        
    },
}