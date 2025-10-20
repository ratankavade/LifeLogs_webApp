import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Expense from '../../features/expense/components/Expense'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import api from '../../app/axios';
import { addUser } from '../../store/slices/userSlice';
import Header from '../../component/layouts/Header';
import SideMenu from '../../component/layouts/SideMenu';
import ErrorScreen from '../../features/error/components/ErrorScreen';

export const Route = createFileRoute('/expences/')({
  component: RouteComponent,
  errorComponent: () => (<ErrorScreen />)
})

function RouteComponent() {
  const dispatch = useDispatch();
  const userData = useSelector((store: any)=> store.user);
  const navigate = useNavigate();

  useEffect(()=> {
    if(!userData){
      fetchUser();
    }
  },[])

  const fetchUser = async() => {
    try{
    const res = await api.get("/profile", {withCredentials: true});
    dispatch(addUser(res.data));
    }catch(err: any){
    if(err.status === 401){
      navigate({ to: '/'});
    }else{
      navigate({to: '/errorPage'})
    }
    }
  }
  return (
    <>
    <Header />
      <div className="grid grid-cols-12">
        <div className="mt-20 h-dvh bg-white col-span-2 shadow-sm">
          <SideMenu />
        </div>
        <div className='mt-20 col-span-10 p-6'>
          <Expense />
        </div>
      </div>
    </>
  )
}
