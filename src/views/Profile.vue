<template>
  <body>
    <div class="profile" v-for="row in table_data" :key="row.id" >
      <img src="../assets/logo.png" alt="User Avatar">
      <h1>{{ row.username }}</h1>
      <table>
        <tr>
          <td>Email:</td>
          <td>{{ row.email }}</td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td>(123) 456-7890</td>
        </tr>
      </table>
    </div>
  </body>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import imageu from "../assets/logo.png"
export default {
  components: {
    
  },
  data() {
    return {
      table_data: []
    }
  },
  created() {
    this.testApi();
  },
  methods: {
    testApi() {
      var token = sessionStorage.getItem("JWT");

      const headers = {
        'Authorization': "Bearer " +  token,
      }

      axios.get("https://localhost:7185/api/Account/UserDetails", {
        headers: headers,
      })
        .then((res) => {
          console.log(res);
          let resc = res.data.user;
          this.table_data = [resc]; 
          console.log(this.table_data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style>
.profile {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.profile img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.profile h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.profile table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.profile td {
  padding: 10px;
  border: 1px solid #ccc;
}

</style>

