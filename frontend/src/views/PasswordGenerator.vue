<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title class="headline font-weight-regular blue-grey white--text">
          Password Generator
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="1" sm="1" md="1">
              文字
            </v-col>
            <v-col cols="2" sm="2" md="2">
              <v-checkbox
                v-model="upper"
                label="英字（大文字）"
                color="blue-grey"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="2" sm="2" md="2">
              <v-checkbox
                v-model="lower"
                label="英字（小文字）"
                color="blue-grey"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="2" sm="2" md="2">
              <v-checkbox
                v-model="number"
                label="数字"
                color="blue-grey"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="2" sm="2" md="2">
              <v-checkbox
                v-model="symbol"
                label="記号"
                color="blue-grey"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1" sm="1" md="1">
              文字数
            </v-col>
            <v-radio-group v-model="charCount" row>
              <v-radio
                label="8文字"
                color="blue-grey"
                value="8"
              ></v-radio>
              <v-radio
                label="12文字"
                color="blue-grey"
                value="12"
              ></v-radio>
              <v-radio
                label="16文字"
                color="blue-grey"
                value="16"
              ></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <v-col cols="1" sm="1" md="1">
              個数
            </v-col>
            <v-radio-group v-model="creationNumber" row>
              <v-radio
                label="10個"
                color="blue-grey"
                value="10"
              ></v-radio>
              <v-radio
                label="30個"
                color="blue-grey"
                value="30"
              ></v-radio>
              <v-radio
                label="50個"
                color="blue-grey"
                value="50"
              ></v-radio>
            </v-radio-group>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue-grey white--text" @click="generate">
            GENERATE
          </v-btn>
          <v-btn color="grey white--text" @click="clear">
            CLEAR
          </v-btn>
          <v-btn color="blue-grey white--text" @click="toCsv">
            CSV
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-simple-table>
        <tbody>
          <tr v-for="password in passwordList" :key="password.item1">
            <td>{{ password.item1 }}</td>
            <td>{{ password.item2 }}</td>
            <td>{{ password.item3 }}</td>
            <td>{{ password.item4 }}</td>
            <td>{{ password.item5 }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'PasswordGenerator',

  data() {
    return {
      upper: true,
      lower: false,
      number: false,
      symbol: false,

      charCount: "8",
      creationNumber: "10",

      uppers: "abcdefghijklmnopqrstuvwxyz".toUpperCase(),
      lowers: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!#$%&@?~^-=_",

      passwordList: [],
    }
  },

  methods: {
    generate() {
      this.passwordList = []

      let strings = ""

      if (this.upper) {
        strings += this.uppers
      }

      if (this.lower) {
        strings += this.lowers
      }

      if (this.number) {
        strings += this.numbers
      }

      if (this.symbol) {
        strings += this.symbols
      }

      const stringsLength = strings.length
      let passwords = []

      for (let i = 0; i < this.creationNumber; i++) {
        let password = ""

        for (let j = 0; j < this.charCount; j++) {
          password += strings.charAt(Math.floor(Math.random() * stringsLength))
        }

        passwords.push(password)
      }

      for (let i = 0; i < this.creationNumber / 5; i++) {
        const passwordObj = {
          "item1": passwords[i * 5],
          "item2": passwords[i * 5 + 1],
          "item3": passwords[i * 5 + 2],
          "item4": passwords[i * 5 + 3],
          "item5": passwords[i * 5 + 4],
        }
        this.passwordList.push(passwordObj)
      }
    },

    clear() {
      this.upper = true
      this.lower = false
      this.number = false
      this.symbol = false

      this.charCount = "8"
      this.creationNumber = "10"

      this.passwordList = []
    },

    toCsv() {
      if (this.passwordList.length === 0) {
        alert('Please to csv after generate password')
        return
      }

      const today = new Date()
      const year = today.getFullYear()
      const month = ("0" + (today.getMonth() + 1)).slice(-2)
      const day = ("0" + today.getDate()).slice(-2)
      const hour = ("0" + today.getHours()).slice(-2)
      const minute = ("0" + today.getMinutes()).slice(-2)
      const second = ("0" + today.getSeconds()).slice(-2)
      const filename = `password_${year}${month}${day}${hour}${minute}${second}.csv`

      let csv = []
      for(let i = 0; i < this.passwordList.length; i++) {
        csv.push(this.passwordList[i].item1)
        csv.push(this.passwordList[i].item2)
        csv.push(this.passwordList[i].item3)
        csv.push(this.passwordList[i].item4)
        csv.push(this.passwordList[i].item5)
      }
      csv = csv.join('\n');

      const UTF_8_BOM = '%EF%BB%BF';
      const data = 'data:text/csv;charset=utf-8,' + UTF_8_BOM + encodeURIComponent(csv);
      let element = document.createElement('a');
      element.href = data;
      element.setAttribute('download', filename);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }
}
</script>
