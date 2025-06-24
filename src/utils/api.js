import axios from 'axios';

export async function adminLogin(username, password) {
  try {
    const response = await axios.post('http://45.132.172.163/api/admin/login', {
      username,
      password,
    });
    if (response.status === "success"){
      localStorage.setItem('adminId', response.data.admin.id);
      localStorage.setItem('adminUsername', response.data.admin.username);
    }
  } catch (error) {
    console.error('Login error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(error.response?.data?.error || 'مشکلی در ورود پیش آمد');
  }
}

export async function GetUsersLocations() {
    try {
        const response = await axios.get('http://45.132.172.163/api/admin/users');
    
        if (response.data.status !== 'success') {
          console.error('API error:', response.data.message);
          return [];
        }

        if (!Array.isArray(response.data.data)) {
          console.warn('API response.data.data is not an array:', response.data.data);
          return [];
        }

        return response.data.data;
    } catch (error) {
      console.error('Error fetching user locations:', error.response?.data?.error || error.message);
      return [];
    }
}