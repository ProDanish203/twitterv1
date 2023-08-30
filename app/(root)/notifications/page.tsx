import { Header } from '@/components/Header';
import { NotifCard } from '@/components/cards/NotifCard';

const Notifications = () => {
  return (
    <section className='min-h-screen'>
    <div>
      <Header label="Notifications" isBack={true}/>
    </div>
    <NotifCard/>
    <NotifCard/>
    </section>
  )
}

export default Notifications;