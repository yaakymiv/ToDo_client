import { format } from 'date-fns';

const formatDateTime = (dateTimeString: string): string => {
  return format(new Date(dateTimeString), 'yyyy-MM-dd HH:mm'); 
};

export default formatDateTime;
