import { Fragment } from 'react'
import { Container, Divider } from './Styles'

interface BreadcrumbsProps {
  items: any[]
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <Container>
    {items.map((item: any, index: number) => (
      <Fragment key={item}>
        {index !== 0 && <Divider>/</Divider>}
        {item}
      </Fragment>
    ))}
  </Container>
)

export default Breadcrumbs
