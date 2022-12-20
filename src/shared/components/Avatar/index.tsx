import { Image, Letter } from './Styles'

interface AvatarProps {
  className: string
  avatarUrl: string
  name: string
  size: number
}

const Avatar = ({
  className,
  avatarUrl = null,
  name = '',
  size = 32,
  ...otherProps
}: AvatarProps & any) => {
  const sharedProps = {
    className,
    size,
    'data-testid': name ? `avatar:${name}` : 'avatar',
    ...otherProps
  }

  console.log('avatar name', name)

  if (avatarUrl) {
    return <Image avatarUrl={avatarUrl} {...sharedProps} />
  }

  return (
    <Letter color={getColorFromName(name)} {...sharedProps}>
      <span>{name.charAt(0)}</span>
    </Letter>
  )
}

const colors = [
  '#DA7657',
  '#6ADA57',
  '#5784DA',
  '#AA57DA',
  '#DA5757',
  '#DA5792',
  '#57DACA',
  '#57A5DA'
]

const getColorFromName = (name: string) =>
  colors[name.toLocaleLowerCase().charCodeAt(0) % colors.length]

export default Avatar
