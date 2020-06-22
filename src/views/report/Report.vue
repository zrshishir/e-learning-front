<template>
  
    <v-container v-if="isLoggedIn">
      <v-row >
        <v-col cols="12" md="4">
          <v-card
            color="teal"
            dark
          >
            <v-card-title class="headline">Total Answers</v-card-title>
            <v-card-title>{{indexData.totalRes}}</v-card-title>

          </v-card>
        </v-col>
        <v-col cols="12" md="4" v-for="item in indexData.reports" :key="item.Total">
          <v-card
            :color='(item.right_wrong == 0) ? "orange darken-4" : "light-blue darken-3"'
            dark
          >
            <v-card-title class="headline">{{(item.right_wrong == 0) ? "Wrong Answers" : "Right Answers"}}</v-card-title>
            <v-card-title>{{item.total}}</v-card-title>

          </v-card>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="3">
              <div class="my-2">
                <v-btn color="primary" x-large @click="tableView = !tableView">
                    <v-icon>mdi-domain</v-icon>Details
                </v-btn>
            </div>
          </v-col>
      </v-row>
      <template>
        <v-simple-table v-if="tableView">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">Question</th>
                <th class="text-left">Option1</th>
                <th class="text-left">Option2</th>
                <th class="text-left">Option3</th>
                <th class="text-left">Option4</th>
                <th class="text-left">Right</th>
                <th class="text-left">Your Response</th>
                <th class="text-left">Right/Wrong</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in indexData.reportDetails" :key="item.id">
                <td>{{ item.questions.question }}</td>
                <td>{{ item.questions.option1 }}</td>
                <td>{{ item.questions.option2 }}</td>
                <td>{{ item.questions.option3 }}</td>
                <td>{{ item.questions.option4 }}</td>
                <td>{{ item.questions.correct_option }}</td>
                <td>{{ item.response }}</td>
                <td>
                    <v-icon v-if="item.right_wrong" large color="light-blue darken-3">mdi-check</v-icon>
                    <v-icon v-else large color="orange darken-4">mdi-cancel</v-icon>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </template>
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
      apiUrl: 'report',
      tableView: false,
    }),
    computed: {
        ...mapGetters(['isLoggedIn', 'indexData', 'error', 'statusCode', 'errorMsg']),
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.$store.dispatch('setIndexData', [this.apiUrl])
      },
    }
  }
</script>