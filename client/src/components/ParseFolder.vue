<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Get the folder and parse it -->
            List of folders:
            <li v-for="folder in folders" v-bind:key="folder.id" @click="onFolderClick(folder, $event)">
                {{folder}}
            </li>
        </div>
        <div class="col-md-6">
            <!-- Get the files from current folder and parse it -->
            List of files in current folder:
            <li v-for="file in files" v-bind:key="file.id" @click="onFileClick(file)">
                {{file}}
            </li>
        </div>
        <div v-if="this.hasSelectedFile === true" style="margin-left: 50px; width: 70%">
            <PDFViewer v-bind:filePath="this.currentFolder.concat('/', this.currentFile)"/>
        </div>
    </div>
</template>

<script>
    const API_URL = 'http://localhost:4000/folders';
    import { emitter } from "../event-bus.js";
    import PDFViewer from "./PDFViewer.vue";
    export default {
        components: {
            PDFViewer
        },
        data() {
            return {
                folders: Array,
                currentFolder: String,
                files: Array,
                currentFile: '',
                hasSelectedFile: Boolean
            }
        },
        // props: {
        //     folders: Array,
        //     currentFolder: String,
        //     files: Array
        // },
        mounted() {
            this.hasSelectedFile = false;
            fetch(API_URL)
                .then(response => response.json())
                .then(response => {
                    this.folders = response;
                })
        },
        created() {
            emitter.on("folder-clicked", (response) => {
                this.files = response;
            });
            emitter.on("update-current-folder", (folder) => {
                this.currentFolder = folder;
            });
            emitter.on("file-clicked", (file) => {
                this.currentFile = file;
                this.hasSelectedFile = true;
            });
        },
        methods: {
            onFolderClick: (folder) => {
                let splitFolder = folder.split('/');
                let folderName = splitFolder[splitFolder.length - 1];
                fetch(`${API_URL}/${folderName}`)
                    .then(response => response.json())
                    .then(response => {
                        emitter.emit("folder-clicked", response);
                        emitter.emit("update-current-folder", splitFolder[splitFolder.length - 2] + '/' + folderName);
                    })
            },
            onFileClick: (file) => {
                emitter.emit("file-clicked", file);
            }
        }
    }
</script>