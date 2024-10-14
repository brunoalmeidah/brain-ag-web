interface IProps {
  message?: string
}
export function Error({ message }: IProps) {
  return <span className="text-xs text-red-600">{message}</span>
}
