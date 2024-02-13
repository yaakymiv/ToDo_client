export default interface Task {
    id: number;
    title: string;
    description?: string;
    status: number;
    startDate?: string; 
    endDate?: string; 
}
