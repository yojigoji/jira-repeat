import currentUser from '@/App/assets/mock-data/current-user.json'
import { Avatar, Form, Icon } from '@/shared/components'
import toast from '@/shared/utils/toast'
import {
  ActionButton,
  Actions,
  Divider,
  FormElement,
  FormHeading,
  SelectItem,
  SelectItemLabel
} from './Styles'
import {
  IssuePriority,
  IssuePriorityCopy,
  IssueType,
  IssueTypeCopy
} from '@/shared/constants/issues'
import IssueTypeIcon from '@/shared/components/IssueTypeIcon'
import IssuePriorityIcon from '@/shared/components/IssuePriorityIcon'

interface ProjectIssueCreateProps {
  project: object
  fetchProject: any
  onCreate: any
  modalClose: any
}

const ProjectIssueCreate = ({
  project,
  fetchProject,
  onCreate,
  modalClose
}: ProjectIssueCreateProps) => {
  return (
    <Form
      enableReinitialize
      initialValues={{
        type: IssueType.TASK,
        title: '',
        description: '',
        reporterId: currentUser.currentUser.id,
        userIds: [],
        priority: IssuePriority.MEDIUM
      }}
      validations={{
        type: Form.is.required(),
        title: [Form.is.required(), Form.is.maxLength(200)],
        reporterId: Form.is.required(),
        priority: Form.is.required()
      }}
      onSubmit={async (values: any, form: any) => {
        try {
          console.log('form values', values)
          toast.success('Issue has been successfully created.')
          onCreate()
        } catch (error) {
          Form.handleAPIError(error, form)
        }
      }}
    >
      <FormElement>
        <FormHeading>Create issue</FormHeading>
        <Form.Field.Select
          name="type"
          label="Issue Type"
          tip="Start typing to get a list of possible matches."
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Divider />
        <Form.Field.Input
          name="title"
          label="Short Summary"
          tip="Concisely summarize the issue in one or two sentences."
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.Select
          name="reporterId"
          label="Reporter"
          options={userOptions(project)}
          renderOption={renderUser(project)}
          renderValue={renderUser(project)}
        />
        <Form.Field.Select
          isMulti
          name="userIds"
          label="Assignees"
          tio="People who are responsible for dealing with this issue."
          options={userOptions(project)}
          renderOption={renderUser(project)}
          renderValue={renderUser(project)}
        />
        <Form.Field.Select
          name="priority"
          label="Priority"
          tip="Priority in relation to other issues."
          options={priorityOptions}
          renderOption={renderPriority}
          renderValue={renderPriority}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={false}>
            Create Issue
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  )
}

const typeOptions = Object.values(IssueType).map((type) => ({
  value: type,
  label: IssueTypeCopy[type]
}))

const priorityOptions = Object.values(IssuePriority).map((priority) => ({
  value: priority,
  label: IssuePriorityCopy[priority]
}))

const userOptions = (project: any) => {
  console.log('project', project)
  return project.users.map((user: any) => ({
    value: user.id,
    label: user.name
  }))
}

const renderType = ({ value: type }: { value: any }) => (
  <SelectItem>
    <IssueTypeIcon type={type} top={1} />
    <SelectItemLabel>{IssueTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
)

const renderPriority = ({ value: priority }: { value: any }) => (
  <SelectItem>
    <IssuePriorityIcon priority={priority} top={1} />
    <SelectItemLabel>{IssuePriorityCopy[priority]}</SelectItemLabel>
  </SelectItem>
)

const renderUser =
  (project: any) =>
  ({ value: userId, removeOptionValue }: any) => {
    const user = project.users.find(({ id }: any) => id === userId)

    console.log('user name', user.name)

    return (
      <SelectItem
        key={user.id}
        withBottomMargin={!!removeOptionValue}
        onClick={() => removeOptionValue && removeOptionValue()}
      >
        <Avatar size={20} avatarUrl={user.avatarUrl} name={user.name} />
        <SelectItemLabel>{user.name}</SelectItemLabel>
        {removeOptionValue && <Icon type="close" top={2} />}
      </SelectItem>
    )
  }

export default ProjectIssueCreate
