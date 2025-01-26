export type JobType = 'Regular Cleaning' | 'Deep Cleaning';
export type JobStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export interface Job {
  id: string;
  clientId: string;
  type: JobType;
  status: JobStatus;
  scheduledDate: string;
  completedDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
