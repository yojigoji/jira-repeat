interface IssueType {
  id: number
  title:string
  type: string,
  status: string,
  priority: string
  listPosition: number
  createdAt: string
  updatedAt: string
  userIds: string[]
}

export type {IssueType}
