import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/auth'
import LoginForm from './LoginForm'

const Login = async () => {
  const user = await getAuthUser()

  if (user) {
    redirect('/')
  }

  return <LoginForm />
}

export default Login