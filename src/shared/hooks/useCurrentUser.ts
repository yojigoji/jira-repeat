import user from '@/App/assets/mock-data/current-user.json'

const useCurrentUser = () => {
  const data = user

  return {
    currentUser: data.currentUser,
    currentUserId: data.currentUser.id
  }
}

export default useCurrentUser
