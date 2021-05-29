<template>
<div>

    <div>
        {{currentPage}} / {{pageCount}}
        <pdf
            :src="this.filePath"
            :page="this.currentPage"
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
        ></pdf>
    </div>

    <!-- <div>
        {{pageCount}}
        <pdf
            v-for="i in pageCount"
            :key="i"
            :src="this.filePath"
            :page="i"
            style="display: inline-block; width: 70%"
        ></pdf>
    </div> -->
    <div>
        <v-btn @click="prevPageClick($event)">Previous page</v-btn>
        <v-btn @click="nextPageClick($event)">Next page</v-btn>
    </div>
</div>
</template>

<script>

import pdf from 'vue-pdf';
// import path from 'path';

// var loadingTask = pdf.createLoadingTask('https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS');
// var loadingTask = pdf.createLoadingTask('test-folders/folder3/lorem-ipsum.pdf');

export default {
    components: {
        pdf
    },
    props: {
        filePath: String,
        currentPage: Number
    },
    data() {
        return {
            src: undefined,
            // src: "test-folders/folder3/lorem-ipsum.pdf",
            // numPages: undefined,
            pageCount: 0
        }
    },
    mounted() {
    //   console.log(this.fileName, this.folderName);

    //     this.src.promise.then(pdf => {

    //         this.numPages = pdf.numPages;
    //     });
    },
    beforeUpdate() {
        console.log('Updated');
        console.log('Current page:', this.currentPage);
        console.log('Page count:', this.pageCount);
        console.log(this.filePath);
    },
    methods: {
        prevPageClick() {
            if (this.currentPage > 1) this.currentPage--;
            console.log('Current page:', this.currentPage);
        },
        nextPageClick() {
            if (this.currentPage < this.pageCount) this.currentPage++;
            console.log('Current page:', this.currentPage);
        }
    }
}

</script>