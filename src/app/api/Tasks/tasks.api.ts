import requests from "../agent";

const TaskAPI = {
  create: (values: any) => requests.post("api/Task/Create", values),
  getAll: () => requests.get("api/Task/GetAll"),
  delete: (id: number) => requests.delete(`api/Task/Delete/${id}`),
  update: (url: string, body: any) => requests.put(`api/Task/Update`, body),
};

export default TaskAPI;
