import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Expense from '../../features/expense/components/Expense'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import api from '../../app/axios';
import { addUser } from '../../store/slices/userSlice';

export const Route = createFileRoute('/expences/')({
  component: RouteComponent,
})

function RouteComponent() {
  const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        fetchUser();
    },[])

    const fetchUser = async() => {
        try{
        const res = await api.get("/profile", {withCredentials: true});
        dispatch(addUser(res.data));
        }catch(err: any){
        console.log(err)
        navigate({ to: '/'});
        }
  }
  return <Expense />
}
