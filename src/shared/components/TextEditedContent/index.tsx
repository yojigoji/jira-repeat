/* eslint-disable react/no-danger */
import 'quill/dist/quill.snow.css'

import { Content } from './Styles'

interface TextEditedContentProps {
  content: string
}

const TextEditedContent = ({
  content,
  ...otherProps
}: TextEditedContentProps & any) => (
  <div className="ql-snow">
    <Content
      className="ql-editor"
      dangerouslySetInnerHTML={{ __html: content }}
      {...otherProps}
    />
  </div>
)

export default TextEditedContent
