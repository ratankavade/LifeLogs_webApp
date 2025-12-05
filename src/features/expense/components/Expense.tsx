import { useEffect, useState } from 'react'
import api from '../../../app/axios';
import { useSelector } from 'react-redux';
import type { ExpenseItem } from '../types/expenseTypes';
import { useNavigate } from '@tanstack/react-router';
import { EXPENSE_TYPE_DATA } from '../../../constants/constant';

const Expense = () => {
    const [formData, setFormData] = useState<ExpenseItem>({
        _id: "",
        name: "",
        type: "",
        amount: 0,
        createdAt: ""
    })
    const [expenseObj, setExpenseObj] = useState<ExpenseItem[]>([]);
    const [totalAmt, setTotalAmt] = useState(0);
    const [editId, setEditId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<ExpenseItem>>({
        name: "",
        type: "",
        amount: 0
    });
    const userDetails = useSelector((store: any)=> store.user);

    const navigate = useNavigate()

    useEffect(()=> {
        if (userDetails?._id) {
            getAllExpenseForUser();
        }
    }, [userDetails])

    useEffect(()=> {
        const total = expenseObj.reduce((acc, curr)=> {
            acc = acc + curr['amount'];
            return acc
        },0)
        setTotalAmt(total);
    }, [expenseObj])

    const getAllExpenseForUser = async() => {
        try{
            const response = await api.get(`/api/expense/user/${userDetails._id}`);
            console.log("response.data", response.data);
            setExpenseObj(response.data);
        }catch (err){
            console.error(err);
        }
    }

    const handleFormData = (name: string, value: string) => {
        setFormData((prev: any)=> ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddExpense = async () => {
        try{
            const response = await api.post("/api/expense", formData);
            console.log("response.data", response.data);
            getAllExpenseForUser();
            setFormData({
                 _id: "",
                name: "",
                type: "",
                amount: 0,
                createdAt: ""
            })
        }catch (err){
            console.error(err);
        }
    }

    const handleEdit = (expense: ExpenseItem) => {
        setEditId(expense._id);
        setEditForm({
            name: expense.name,
            type: expense.type,
            amount: expense.amount
        });
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditForm({ name: "", type: "", amount: 0 });
    };

    const handleSaveEdit = async (id: string) => {
        try {
            await api.put(`/api/expense/${id}`, editForm);
            setExpenseObj(prev =>
                prev.map(item =>
                    item._id === id ? { ...item, ...editForm } : item
                )
            );
            setEditId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/api/expense/${id}`);
            setExpenseObj(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            console.error(err);
        }
    };


  return (
    <>
    <div className='flex justify-between'>
        <h1 className='text-xl mb-4'>Today's Expense</h1>
        <button className="btn btn-accent text-white" onClick={()=> navigate({to: '/expences/pastExpense'})}>Past Expenses</button>
    </div>
    
    <div className='gap-4 mt-4'>
        <div className="card bg-base-100 w-full shadow-sm p-4 border border-gray-100 grid grid-cols-5 gap-3">
            <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend">Expense For</legend>
                <input value={formData.name} onChange={(e)=>handleFormData('name', e.target.value)} type="text" className="input w-full" placeholder="Expense name" />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Type</legend>
                <select className="select w-full" value={formData.type} onChange={(e)=>handleFormData('type', e.target.value)}>
                    <option value="" disabled={true}>Select Type</option>
                    {EXPENSE_TYPE_DATA.map((item)=> (
                        <option key={item}>{item}</option>
                    ))}
                </select>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Amount</legend>
                <input value={formData.amount} onChange={(e)=>handleFormData('amount', e.target.value)} type="number" className="input w-full" placeholder="Enter amount"/>
            </fieldset>
            <div className='mt-4 flex justify-end items-end pb-1 gap-3'>
                <button className="btn btn-soft btn-accent hover:text-white" onClick={handleAddExpense}>
                    Save
                </button>
                <button className="btn btn-soft btn-error hover:text-white" onClick={()=> 
                    setFormData({
                    _id: "",
                    name: "",
                    type: "",
                    amount: 0,
                    createdAt: ""
                })}>
                    Clear
                </button>
            </div>
        </div>
        <div className='py-4'>
            <div className='flex justify-between'>
                <h2 className='text-base mb-4 text-black pt-0'>Expense List</h2>
            </div>
            <ul className="list bg-base-100 rounded-box shadow-md border border-gray-200">
                <li className="list-row grid grid-cols-5 p-4 bg-gray-100 rounded-b-none">
                    <div className='text-sm font-semibold uppercase text-gray-700'>Expense For</div>
                    <div className="text-sm font-semibold uppercase text-gray-700">Type</div>
                    <div className='text-sm font-semibold uppercase text-gray-700'>Date</div>
                    <div className='text-sm font-semibold uppercase text-gray-700'>Amount</div>
                    <div className='text-sm font-semibold uppercase text-gray-700 text-center'>Actions</div>
                </li>
                {expenseObj.map((item)=> (
                    <li className="list-row grid grid-cols-5 px-4 py-2 items-center" key={item._id}>
                        <div className='text-base uppercase text-gray-700'>
                            {editId === item._id ? (
                                <fieldset className="fieldset col-span-2">
                                    <input type="text" value={editForm.name} onChange={(e)=>setEditForm({...editForm, name: e.target.value})}  className="input w-full" placeholder="Expense name" />
                                </fieldset>
                            ) : (
                                item.name
                            )}
                        </div>
                        <div className="text-base capitalize text-gray-700">
                            {editId === item._id ? (
                                <fieldset className="fieldset">
                                    <select value={editForm.type} onChange={(e)=>setEditForm({...editForm, type: e.target.value})} className="select w-full">
                                        {EXPENSE_TYPE_DATA.map(type => <option key={type}>{type}</option>)}
                                    </select>
                                </fieldset>
                            ) : (
                                item.type
                            )}
                        </div>
                        <div className='text-base capitalize text-gray-700'>
                            {new Date(item.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
                        </div>
                        <div className='text-lg text-gray-700'>
                            {editId === item._id ? (
                                <fieldset className="fieldset">
                                    <input type="number" value={editForm.amount} onChange={(e)=>setEditForm({...editForm, amount: parseFloat(e.target.value)})} className="input w-full" />
                                </fieldset>
                            ) : (
                                <>₹ {item.amount}</>
                            )}
                        </div>
                        <div className='text-lg text-gray-700'>
                            <div className='flex justify-end items-end pb-1 gap-3'>
                                {editId === item._id ? (
                                    <>
                                        <button className="btn btn-soft btn-accent hover:text-white" onClick={()=>handleSaveEdit(item._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button className="btn btn-soft btn-error hover:text-white" onClick={handleCancelEdit}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-soft btn-accent hover:text-white" onClick={()=>handleEdit(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button className="btn btn-soft btn-error hover:text-white" onClick={()=>handleDelete(item._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    <div className='bg-accent p-4 sticky bottom-0 flex justify-between w-full'>
        <h1 className='text-xl text-white'>Total</h1>
        <h1 className='text-xl text-white'>{totalAmt}</h1>
    </div>
    </>
    
  )
}

export default Expense
