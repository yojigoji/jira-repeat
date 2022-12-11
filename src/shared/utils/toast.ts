import pubsub from 'sweet-pubsub'
import { get } from 'lodash'

const show = (toast: any) => pubsub.emit('toast', toast)

const success = (title: string) => show({ title })

const error = (err: object) => {
  show({
    type: 'danger',
    title: 'Error',
    message: get(err, 'message', err),
    duration: 0
  })
}

export default { show, error, success }
