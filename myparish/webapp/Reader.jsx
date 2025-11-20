const useParams = ReactRouterDOM.useParams

const Reader = () => {
  const { name } = useParams()
  return <div>{name}</div>
}
