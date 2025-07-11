import axios from 'axios';

const BASE_URL = 'http://localhost:5003/api';

export const signup = (userData: { username: string; email: string; password: string }) =>
  axios.post(`${BASE_URL}/auth/signup`, userData);



export const login = ({ email, password }: { email: string; password: string }) =>
  axios.post('http://localhost:5003/api/auth/login', { email, password }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, 
  });
export const createProject = (data: {
    title: string;
    url: string;
    category?: string;
  }) =>
    axios.post(`http://localhost:5003/api/projects`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
  export const getProjects = () =>
    axios.get(`http://localhost:5003/api/projects`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
  export const deleteProject = (id: string) =>
    axios.delete(`http://localhost:5003/api/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    export const getProjectById = (id: string) =>
      axios.get(`http://localhost:5003/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      export const triggerSubmission = (
        projectId: string,
        siteName: string
      ) =>
        axios.post(`http://localhost:5003/api/automation/${projectId}/directory/${siteName}`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        export const runMetaTagAnalyzer = (projectId: string) =>
          axios.post(`http://localhost:5003/api/tools/${projectId}/run-meta`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          export const runKeywordDensityAnalyzer = (projectId: string) =>
            axios.post(`http://localhost:5003/api/tools/${projectId}/run-keyword-density`, {}, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            export const runBrokenLinkChecker = (projectId: string) =>
              axios.post(`http://localhost:5003/api/tools/${projectId}/run-broken-links`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
              });
              export const runSitemapRobotsChecker = (projectId: string) =>
                axios.post(`http://localhost:5003/api/tools/${projectId}/run-sitemap-robots`, {}, {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                export const runBacklinkScanner = (projectId: string) =>
                  axios.post(`http://localhost:5003/api/tools/${projectId}/run-backlinks`, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                  });
                  export const runKeywordTracker = (projectId: string) =>
                    axios.post(`http://localhost:5003/api/tools/${projectId}/run-keyword-tracker`, {}, {
                      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                    export const runPageSpeedAnalyzer = (projectId: string) =>
                      axios.post(`http://localhost:5003/api/tools/${projectId}/run-speed`, {}, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                      });
                    