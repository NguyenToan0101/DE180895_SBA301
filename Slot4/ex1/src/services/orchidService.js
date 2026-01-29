import api from "../api/api";

const orchidService = {
  getAll() {
    return api.get("/orchids/");
  },

  getById(id) {
    return api.get(`/orchids/${id}`);
  },

  create(data) {
    return api.post("/orchids/", data);
  },

  update(data) {
    return api.put(`/orchids/`, data);
  },

  delete(id) {
    return api.delete(`/orchids/${id}`);
  },
  getCategory() {
    return api.get("/orchids/categories");
  }
};

export default orchidService;
