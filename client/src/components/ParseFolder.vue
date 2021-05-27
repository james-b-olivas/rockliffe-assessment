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
            <li v-for="file in files" v-bind:key="file.id">
                {{file}}
            </li>
        </div>
    </div>
</template>

<script>
    const API_URL = 'http://localhost:4000/folders';
    import { emitter } from "../event-bus.js";
    export default {
        data() {
            return {
                folders: Array,
                currentFolder: String,
                files: Array
            }
        },
        mounted() {
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
        },
        methods: {
            onFolderClick: (folder) => {
                let splitFolder = folder.split('/');
                let folderName = splitFolder[splitFolder.length - 1];
                fetch(`${API_URL}/${folderName}`)
                    .then(response => response.json())
                    .then(response => {
                        emitter.emit("folder-clicked", response);
                    })
            }
        }
    }
</script>