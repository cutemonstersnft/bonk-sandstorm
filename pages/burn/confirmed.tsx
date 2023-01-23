import Confirmed from '../../components/Confirmed';
import PageHeading from '../../components/PageHeading';

export default function ConfirmedPage() {
  return (
    <div className='flex flex-col items-center gap-8'>
      <PageHeading>Burn Complete!</PageHeading>
      <div className='h-80 w-80'><Confirmed /></div>
    </div>
  )
}
