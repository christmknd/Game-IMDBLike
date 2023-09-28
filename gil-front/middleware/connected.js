import authService from '~/services/auth';
const router = useRouter();


export default function () {

  
  if (!authService.isConnected()) {
    return router.push('/login');
  }
}
