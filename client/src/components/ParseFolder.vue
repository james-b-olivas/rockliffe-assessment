<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Get all the folders in the directory -->
            List of folders:
            <li v-for="folder in folders" v-bind:key="folder.id" @click="onFolderClick(folder, $event)">
                {{folder}}
            </li>
        </div>
        <div class="col-md-6">
            <!-- Get the files from selected folder and display them -->
            List of files in current folder:
            <li v-for="file in files" v-bind:key="file.id" v-bind:currentPage=1 @click="onFileClick(file)">
                {{file}}
            </li>
        </div>
        <!-- Display PDF, but only if a folder and file have been selected -->
        <div v-if="this.hasSelectedFile === true" style="margin-left: 50px; width: 70%">
            <PDFViewer v-bind:filePath="this.currentFolderPath.concat('/', this.currentFile)"/>
        </div>
        <!-- Create "Download" button that downloads the currently displayed PDF -->
        <div
            v-if="this.hasSelectedFile === true"
            style="margin-left: 50px; margin-top: 1%; margin-bottom: 1%; width: 70%"
            @click="downloadButtonClick()"
        >
            <v-btn>Download File</v-btn>
        </div>
        <!-- Create "Home" button that resets selected file and folder, and also stops PDF from being displayed -->
        <div
            v-if="this.hasSelectedFile === true"
            style="margin-left: 50px; margin-top: 1%; margin-bottom: 1%; width: 70%"
            @click="homeButtonClick()"
        >
            <v-btn>Home</v-btn>
        </div>
    </div>
</template>

<script>
    const API_URL = 'http://localhost:4000/folders';
    import { emitter } from "../event-bus.js";
    import PDFViewer from "./PDFViewer.vue";
    import axios from "axios";
    export default {
        components: {
            PDFViewer
        },
        data() {
            return {
                folders: Array,
                currentFolderPath: '',
                files: Array,
                currentFile: '',
                hasSelectedFile: Boolean
            }
        },
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
                this.hasSelectedFile = false;
                this.files = response;
            });
            emitter.on("update-current-folder", (folder) => {
                this.currentFolderPath = folder;
            });
            emitter.on("file-clicked", (file) => {
                this.hasSelectedFile = false;
                this.currentFile = file;
                this.hasSelectedFile = true;
            });
            emitter.on("home-button-clicked", () => {
                this.currentFolderPath = '';
                this.files = [];
                this.currentFile = '';
                this.hasSelectedFile = false;
            });
            emitter.on("download-button-clicked", () => {
                let splitFolder = this.currentFolderPath.split('/');
                let folderName = splitFolder[splitFolder.length - 1];
                let combinedPath = `${API_URL}/${folderName}/${this.currentFile}`;
                axios({
                    url: combinedPath,
                    method: 'GET',
                    responseType: 'blob',
                }).then(response => {
                    let blob = new Blob([response.data], { type: 'application/pdf' });
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = this.currentFile;
                    link.click();
                    })
            });
        },

        methods: {
            onFolderClick: (folder) => {
                let splitFolder = folder.split('/');
                let folderName = splitFolder[splitFolder.length - 1];
                console.log(`${API_URL}/${folderName}`);
                fetch(`${API_URL}/${folderName}`)
                    .then(response => response.json())
                    .then(response => {
                        emitter.emit("folder-clicked", response);
                        emitter.emit("update-current-folder", splitFolder[splitFolder.length - 2] + '/' + folderName, folderName);
                    })
            },
            onFileClick: (file) => {
                emitter.emit("file-clicked", file);
            },
            homeButtonClick: () => {
                emitter.emit("home-button-clicked");
            },
            downloadButtonClick: () => {
                emitter.emit("download-button-clicked");
            }
        }
    }
</script>