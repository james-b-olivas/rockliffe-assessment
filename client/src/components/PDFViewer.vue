<template>
    <div>
        <pdf
            v-for="i in numPages"
            :key="i"
            :src="src"
            :page="i"
            style="display: inline-block; width: 70%"
        ></pdf>
    </div>
</template>

<script>

import pdf from 'vue-pdf'

var loadingTask = pdf.createLoadingTask('https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS');

export default {
    components: {
        pdf
    },
    data() {
        return {
            src: loadingTask,
            numPages: undefined,
        }
    },
    mounted() {

        this.src.promise.then(pdf => {

            this.numPages = pdf.numPages;
        });
    }
}

</script>