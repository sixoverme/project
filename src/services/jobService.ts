import Job from '../interfaces/Job';
import mockJobs from '../data/mockJobs';

/**
 * Service class for handling job-related operations.
 * Currently uses mock data, but can be easily modified to use real API calls.
 */
class JobService {
  private jobs: Job[] = mockJobs;

  /**
   * Get all jobs
   */
  async getAllJobs(): Promise<Job[]> {
    return Promise.resolve([...this.jobs]);
  }

  /**
   * Get a job by ID
   */
  async getJobById(id: string): Promise<Job | null> {
    const job = this.jobs.find(j => j.id === id);
    return Promise.resolve(job || null);
  }

  /**
   * Get jobs for a specific client
   */
  async getJobsByClientId(clientId: string): Promise<Job[]> {
    const clientJobs = this.jobs.filter(j => j.clientId === clientId);
    return Promise.resolve(clientJobs);
  }

  /**
   * Create a new job
   */
  async createJob(job: Omit<Job, 'id'>): Promise<Job> {
    const newJob: Job = {
      ...job,
      id: `job-${Date.now()}`, // In real app, this would be handled by the backend
    };
    this.jobs.push(newJob);
    return Promise.resolve(newJob);
  }

  /**
   * Update an existing job
   */
  async updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
    const index = this.jobs.findIndex(j => j.id === id);
    if (index === -1) return Promise.resolve(null);

    const updatedJob = {
      ...this.jobs[index],
      ...updates,
      id, // Ensure ID doesn't change
    };
    this.jobs[index] = updatedJob;
    return Promise.resolve(updatedJob);
  }

  /**
   * Delete a job
   */
  async deleteJob(id: string): Promise<boolean> {
    const index = this.jobs.findIndex(j => j.id === id);
    if (index === -1) return Promise.resolve(false);

    this.jobs.splice(index, 1);
    return Promise.resolve(true);
  }

  /**
   * Get jobs by date range
   */
  async getJobsByDateRange(startDate: string, endDate: string): Promise<Job[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const jobsInRange = this.jobs.filter(job => {
      const jobDate = new Date(job.date);
      return jobDate >= start && jobDate <= end;
    });
    
    return Promise.resolve(jobsInRange);
  }

  /**
   * Get jobs by status
   */
  async getJobsByStatus(status: string): Promise<Job[]> {
    const filteredJobs = this.jobs.filter(job => job.status === status);
    return Promise.resolve(filteredJobs);
  }
}

// Export a singleton instance
export const jobService = new JobService();
