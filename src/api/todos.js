import axios from "axios";

const baseUrl = 'http://localhost:3001'

export const todosAPI = {
  getTodos: async () => {
    try {
      const res = await axios.get(`${baseUrl}/todos`)
      return res.data
    } catch(err) {
      console.log(err)
    }
  },
  createTodo: async (title, isDown) => {
    try {
      const res = await axios.post(`${baseUrl}/todos`, {title, isDown})
      return res.data
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/todos/${id}`)
      return res.data
    } catch (err) {
      console.log(err);
    }
  },
  updateTodo: async (id, prams) => {
    console.log(id, prams);
    try {
      const res = await axios.patch(`${baseUrl}/todos/${id}`, prams)
      return res.data
    } catch (err) {
      console.log(err);
    }
  }
}