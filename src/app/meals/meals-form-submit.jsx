import { useActionState } from 'react'

const MealsFormSubmit = () => {
    const {pending} = useActionState()
  return (
    <button disabled={pending}>
      {pending ? "Submiting..." : "Share Meal"}
    </button>
  )
}

export default MealsFormSubmit
