<template>
    <div class="container">
      <div class="header">
        <img src="../assets/icon.png" alt="Logo" class="logo" />
        <div class="user-icon">
          <i class="fas fa-user"></i>
        </div>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
  
      <!-- Desktop View -->
      <div class="table-container" v-if="!isMobile">
        <table class="data-table">
          <thead>
            <tr>
              <th>Parameter Key</th>
              <th>Value</th>
              <th>Description</th>
              <th @click="sortByDate" class="sortable">Update Date </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in parameters" :key="item.key">
              <td>{{ item.key }}</td>
              <td>
              <input
                v-if="item.key === editParameterId"
                type="text"
                v-model="editableParameter.value"
              />
              <span v-else>{{ item.value }}</span>
              </td>
              <td>
              <input
                v-if="item.key === editParameterId"
                type="text"
                v-model="editableParameter.description"
              />
              <span v-else>{{ item.description }}</span>
              </td>
              <td>{{ item.updatedAt }}</td>
              <td class="actions">
              <button
                v-if="item.key === editParameterId"
                @click="submitEdit(item.key)"
                class="submit-btn"
              >
                Submit
              </button>
              <button
                v-else
                @click="enableEdit(item)"
                :disabled="editParameterId !== null"
                class="edit-btn"
              >
                Edit
              </button>
              <button
                @click="deleteParameter(item.key)"
                class="delete-btn"
                :disabled="editParameterId !== null"
              >
                Delete
              </button>
            </td>
            </tr>
          </tbody>
        </table>
        <div class="add-parameter">
          <input type="text" placeholder="New Parameter" v-model="newParameter.key" />
          <input type="text" placeholder="Value" v-model="newParameter.value" />
          <input type="text" placeholder="New Description" v-model="newParameter.description" />
          <button @click="addParameter" class="add-btn">Add</button>
        </div>
      </div>
  
      <!-- Mobile View -->
      <div class="card-container" v-else>
        <div v-for="item in parameters" :key="item.key" class="parameter-card">
          <p><strong>Parameter Key:   </strong> {{ item.key }}</p>
          <p><strong>Value:   </strong> 
            <input
                v-if="item.key === editParameterId"
                type="text"
                v-model="editableParameter.value"
            />
            <span v-else>{{ item.value }}</span></p>
          <p><strong>Description:   </strong> 
            <input
                v-if="item.key === editParameterId"
                type="text"
                v-model="editableParameter.description"
            />
            <span v-else>{{ item.description }}</span>
          </p>
          <p><strong>Update Date:   </strong> {{ item.updatedAt }}</p>
          <div class="card-actions">
            <button
                v-if="item.key === editParameterId"
                @click="submitEdit(item.key)"
                class="submit-btn"
            >
                Submit
            </button>
            <button
                v-else
                @click="enableEdit(item)"
                :disabled="editParameterId !== null"
                class="edit-btn"
            >
                Edit
            </button>
            <button
                @click="deleteParameter(item.key)"
                class="delete-btn"
                :disabled="editParameterId !== null"
            >
                Delete
            </button>
          </div>
        </div>
        <div class="add-parameter">
          <input type="text" placeholder="New Parameter" v-model="newParameter.key" />
          <input type="text" placeholder="Value" v-model="newParameter.value" />
          <input type="text" placeholder="New Description" v-model="newParameter.description" />
          <button @click="addParameter" class="add-btn">Add</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  export default {
    data() {
      return {
        isMobile: false,
        newParameter: { key: "", value: "", description: "" },
        parameters: [],
        editMode: false,
        editParameterId: null,
        editableParameter: {},
      };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        handleLogout() {
            localStorage.removeItem('authToken');
            
            this.router.push('/signin');
        },
       async fetchParameters() {
        try {
            const authToken = localStorage.getItem('authToken');
            console.log(authToken);
            const response = await axios.get('http://localhost:3003/api/config', {
            headers: { Authorization: `Bearer ${authToken}` }
            });
            console.log(response);
            this.parameters = response.data;
        } catch (error) {
            console.error("Error fetching parameters:", error);
        }
      },
      checkIfMobile() {
        this.isMobile = window.innerWidth <= 768;
      },
      async addParameter() {
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await axios.post('http://localhost:3003/api/config', this.newParameter, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            this.parameters.push(response.data);
            this.newParameter = { key: "", value: "", description: "" };
            this.fetchParameters();
        } catch (error) {
          console.error("Error adding parameter:", error);
        }
      },
      async deleteParameter(id) {
        try {
            const authToken = localStorage.getItem('authToken');
            await axios.delete(`http://localhost:3003/api/config/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` }
            });
            this.parameters = this.parameters.filter(param => param._id !== id);
            this.fetchParameters();
        } catch (error) {
            console.error("Error deleting parameter:", error);
        }
      },
      enableEdit(item) {
        this.editParameterId = item.key;
        this.editableParameter = { value: item.value, description: item.description };
      },
      async submitEdit(id) {
        try {
            const authToken = localStorage.getItem('authToken');
            
            const parameterToEdit = this.parameters.find(param => param.key === id);
            if (!parameterToEdit) {
            console.error("Error: Parameter not found for editing");
            return;
            }

            // Create the updated configuration object 
            const updatedConfig = {
            key: parameterToEdit.key,
            value: this.editableParameter.value,
            description: this.editableParameter.description,
            updatedAt: parameterToEdit.updatedAt // This is taken from the existing parameter object
            };

            const response = await axios.put(
            `http://localhost:3003/api/config/${id}`,
            updatedConfig,
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
            );
            this.fetchParameters();

            const index = this.parameters.findIndex(param => param.key === id);
            if (index !== -1) {
            this.parameters[index] = response.data;
            }

            // Reset editing state
            this.editParameterId = null;
            this.editableParameter = { value: "", description: "" };
        } catch (error) {
            console.error("Error updating parameter:", error);
        }
      },
    },
    sortByDate() {
        this.parameters.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      },
    mounted() {
        this.checkIfMobile();
        window.addEventListener("resize", this.checkIfMobile);
        this.fetchParameters();
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.checkIfMobile);
    },
  };
  </script>
  
  <style scoped>
  /* General Styles */
  .container {
    font-family: Arial, sans-serif;
    color: #bfc0c0;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #1e1e2f;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
  .logo {
    width: 100px;
    height: auto; 
  }
  .user-icon {
    font-size: 24px;
    color: white;
  }
  
  /* Desktop Table */
  .table-container {
    margin-top: 20px;
  }
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  .data-table th,
  .data-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #444;
  }
  .sortable {
    cursor: pointer;
  }
  .actions button {
    margin: 0 5px;
    padding: 5px 10px;
  }
  .edit-btn {
    background-color: #337ab7;
    color: white;
    border: none;
    border-radius: 5px;
  }
  .delete-btn {
    background-color: #d9534f;
    color: white;
    border: none;
    border-radius: 5px;
  }
  .add-parameter {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .add-parameter input {
    background-color: #333;
    color: white;
    border: 1px solid #555;
    padding: 5px;
    border-radius: 5px;
  }
  .add-btn {
    background-color: #5cb85c;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
  }
  
  /* Mobile Card View */
  .card-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .parameter-card {
    background-color: #2a2a3a;
    border: 1px solid white;
    padding: 15px;
    border-radius: 8px;
  }
  .parameter-card p {
    margin: 5px 0;
  }
  .card-actions {
    display: flex;
    gap: 10px;
  }
  .edit-btn,
  .delete-btn {
    padding: 10px 20px;
    font-size: 16px;
  }
  .edit-btn {
    background-color: #337ab7;
    color: white;
    border: none;
    border-radius: 5px;
  }
  .delete-btn {
    background-color: #d9534f;
    color: white;
    border: none;
    border-radius: 5px;
  }
  .submit-btn {
  background-color: #4CAF50; 
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
 }   
 .edit-btn:disabled, .delete-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
 } 
  /* Mobile Add Parameter */
  .add-parameter {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
  .add-parameter input {
    color: white;
    background-color: #333;
    padding: 8px;
    border: 1px solid #555;
    border-radius: 5px;
  }
  .add-btn {
    background-color: #5cb85c;
    color: white;
    border: none;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
  }
  .logout-btn {
  background-color: #d9534f; 
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 20px; 
}

 .logout-btn:hover {
  background-color: #c9302c; 
 }

 .logout-btn:focus {
   outline: none;
   box-shadow: 0 0 5px #c9302c; 
  }
  input[type="text"] {
  background-color: #333;  
  color: #bfc0c0;          
  border: 1px solid #555; 
  padding: 5px;            
  font-size: 16px;         
  border-radius: 5px;
}

input[type="text"]:focus {
  border-color: #4CAF50;   
  outline: none;           
}
  </style>
  

  