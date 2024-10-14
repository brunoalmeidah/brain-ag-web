import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'

export interface IFilterData {
  name: string
}

interface IProps {
  onFilter: (data: IFilterData | null) => void
}

export function ProducerTableFilters({ onFilter }: IProps) {

  const { register, handleSubmit, reset } = useForm<IFilterData>()
  const navigate = useNavigate()
  function handleNewProducer() {
    navigate('/produtores/novo')
  }
  function handleRemoveFilter() {
    onFilter(null)
    reset({ name: '' })
  }
  return (
    <div className="flex items-center justify-between">
      <form
        className="flex items-center gap-2"
        onSubmit={handleSubmit(onFilter)}
      >
        <span className="text-sm font-semibold">Filtros: </span>
        <Input
          placeholder="Nome do produtor ou fazenda"
          className="h-8 w-[328px]"
          {...register('name')}
        />
        <Button type="submit" variant="secondary" size="sm" className="h-8">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8"
          onClick={handleRemoveFilter}
        >
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </form>

      <Button onClick={handleNewProducer}>Novo Produtor</Button>
    </div>
  )
}
