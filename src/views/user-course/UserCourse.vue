<template>
    <v-container v-if="isLoggedIn">
      <v-alert type="error" v-if="error == 1">
            {{errorMsg}}
          </v-alert>
          <v-alert type="success" v-if="error == 0">
            {{errorMsg}}
          </v-alert>
        <template v-if="! indexData">
            <v-data-table item-key="name" class="elevation-1" loading loading-text="Loading... Please wait"></v-data-table>
        </template>
        <v-data-table
            :headers="headers"
            :items="indexData.datas"
            sort-by="active"
            class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar flat color="blue dark-accent 4">
                <v-toolbar-title class="font-weight-bold">My Courses</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >My New Courses</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                v-model="editedItem.course_id"
                                :items="indexData.courses"
                                item-text="name" 
                                item-value="id"
                                label="Select Course"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                v-model="editedItem.active"
                                :items="items"
                                label="Active"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>
            <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </v-container>
    <v-container v-else>
        <template>
            <div>
                <v-alert
                v-model="alert"
                dismissible
                close-icon="mdi-delete"
                color="red"
                border="left"
                elevation="2"
                colored-border
                
                >
                You are <strong>not Logged In</strong>, please log in first!.
                </v-alert>

                <div class="text-center">
                <v-btn
                    v-if="!alert"
                    dark
                    @click="alert = true"
                >
                    Reset Alert
                </v-btn>
                </div>
            </div>
        </template>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      dialog: false,
      apiUrl: 'user-course',
      alert:true,
      headers: [
        { text: 'Course Name', align: 'start', value: 'course.name'},
        { text: 'Active', value: 'active' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [0 , 1],
      editedIndex: -1,
      editedItem: {
        course_id: '',
        active: 1,
      },
      defaultItem: {
        course_id: '',
        active: 1,
      },
    }),

    computed: {
        ...mapGetters(['isLoggedIn', 'indexData', 'error', 'statusCode', 'errorMsg']),
      formTitle () {
        return this.editedIndex === -1 ? 'New My Courses' : 'Edit My Courses'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('setIndexData', [this.apiUrl])
      },

      setErrorZero () {
        this.$store.dispatch('setErrorZero')
      },

      editItem (item) {
        this.editedIndex = this.indexData.datas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.indexData.datas.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.indexData.datas.splice(index, 1)
        this.$store.dispatch('delete', [this.apiUrl, item.id])
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          this.$store.dispatch('store', [this.apiUrl, this.editedItem])
          Object.assign(this.indexData.datas[this.editedIndex], this.editedItem)
        } else {
          this.$store.dispatch('store', [this.apiUrl, this.editedItem])
          // this.indexData.datas.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>