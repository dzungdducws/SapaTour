import { API_URL } from '../const/const';
import { UserInfo } from '../slice/userSlice';

export class AuthService {
  login = async (
    emailOrPhoneNumber: string,
    password: string,
  ): Promise<{ status: number; userInfo: UserInfo }> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhoneNumber,
          password,
        }),
      });

      const resJson = await response.json();
      if (resJson.status === 200) {
        return {
          status: resJson.status,
          userInfo: {
            id: resJson.data.user.id,
            name: resJson.data.user.name,
            email: resJson.data.user.email,
            avt: resJson.data.user.avt,
            country: resJson.data.user.country,
            address: resJson.data.user.address,
            phone: resJson.data.user.phone,
            role: resJson.data.user.role,
            birthday: resJson.data.user.birthday,
            token: resJson.data.token,
          },
        };
      } else {
        return {
          status: resJson.status,
          userInfo: {
            id: '',
            name: '',
            email: '',
            avt: '',
            country: '',
            address: '',
            phone: '',
            token: '',
            role: 1,
            birthday: '',
          },
        };
      }
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        userInfo: {
          id: '',
          name: '',
          email: '',
          avt: '',
          country: '',
          address: '',
          phone: '',
          token: '',
          role: 1,
          birthday: '',
        },
      };
    }
  };
}
