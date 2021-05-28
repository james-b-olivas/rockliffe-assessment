<template>
<div>

    <div>
        {{currentPage}} / {{pageCount}}
        <pdf
            :src="this.filePath"
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
        ></pdf>
    </div>
    <!-- <div>
        {{this.filePath}}
        <pdf
            v-for="i in numPages"
            :key="i"
            :src="src"
            :page="i"
            style="display: inline-block; width: 70%"
        ></pdf>
    </div> -->
    </div>
</template>

<script>

import pdf from 'vue-pdf';
// import path from 'path';

var loadingTask = pdf.createLoadingTask('https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS');
// var loadingTask = pdf.createLoadingTask('test-folders/folder3/lorem-ipsum.pdf');

export default {
    components: {
        pdf
    },
    props: {
        filePath: String
    },
    data() {
        return {
            src: loadingTask,
            // src: "test-folders/folder3/lorem-ipsum.pdf",
            numPages: undefined,
        }
    },
    mounted() {
    //   console.log(this.fileName, this.folderName);

    //     this.src.promise.then(pdf => {

    //         this.numPages = pdf.numPages;
    //     });
    }
}

</script>