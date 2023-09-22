
import authService from '~/services/auth';

export default function ({ redirect }) {
  if (!authService.isConnected()) {
    return redirect('/login');
  }
}
