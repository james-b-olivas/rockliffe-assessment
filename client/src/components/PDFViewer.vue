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
        {{currentPage}} / {{pageCount}}
    </div>
    <div>
        <v-btn @click="prevPageClick($event)">Previous page</v-btn>
        <v-btn @click="nextPageClick($event)">Next page</v-btn>
    </div>
</div>
</template>

<script>

import pdf from 'vue-pdf';

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
            pageCount: 0
        }
    },
    methods: {
        prevPageClick() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPageClick() {
            if (this.currentPage < this.pageCount) this.currentPage++;
        }
    }
}

</script>