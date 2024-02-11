export default interface Task {
    title: string;
    description: string;
    status: "Not Started" | "In Progress" | "Done";
    startDate: string; 
    endDate: string; 
}
