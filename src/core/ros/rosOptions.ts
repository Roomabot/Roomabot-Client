export interface RosOptions{
  // uri: string,
  // topics: string[],
  prefix: string,
  onOpen: ((rosConnection: any) => void) | undefined
}