import { useEffect, useState } from 'react'
import api from '../../../app/axios';
import { useSelector } from 'react-redux';
import type { ExpenseItem } from '../types/expenseTypes';

const Expense = () => {
    const [formData, setFormData] = useState<ExpenseItem>({
        _id: "",
        name: "",
        type: "",
        amount: 0
    })
    const [expenseObj, setExpenseObj] = useState<ExpenseItem[]>([]);
    const [totalAmt, setTotalAmt] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const userDetails = useSelector((store: any)=> store.user);

    useEffect(()=> {
        getAllExpenseForUser();
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

    const expenseTypeData = ["Food", "Cosmatices", "Groceries", "Bills", "Fuel"];

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
            setShowForm(false);
            setFormData({
                 _id: "",
                name: "",
                type: "",
                amount: 0
            })
        }catch (err){
            console.error(err);
        }
    }

    const handleAddNewExpense = () => {
        setShowForm(true);
    }

  return (
    <>
    <div className='flex justify-between'>
        <h1 className='text-xl mb-4'>Expense</h1>
        <button className="btn btn-accent text-white" onClick={handleAddNewExpense}>Add new</button>
    </div>
    
    <div className='grid grid-cols-2 gap-4 mt-4'>
        <div>
            <div className='flex justify-between'>
                <h2 className='text-base mb-4 text-gray-700'>Today's Expense</h2>
                <div className="badge badge-dash badge-accent badge-lg">{totalAmt}</div>
                {/* <h2 className='text-base mb-4'>{totalAmt}</h2> */}
            </div>
            
            <ul className="list bg-base-100 rounded-box shadow-md border border-gray-200">
                {expenseObj.map((item)=> (
                    <li className="list-row flex justify-between px-3 py-2" key={item._id}>
                        <div>
                        <div className='text-base capitalize text-gray-700'>{item.name}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{item.type}</div>
                        </div>
                        <div className='text-lg text-gray-700'>{item.amount}</div>
                    </li>
                ))}
            </ul>
        </div>
        <div>
        
        
        {showForm && <div>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Description</legend>
                <input value={formData.name} onChange={(e)=>handleFormData('name', e.target.value)} type="text" className="input w-full" placeholder="Expense name" />
            </fieldset>
            <div className='grid grid-cols-2 gap-3'>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Type</legend>
                    <select className="select w-full" value={formData.type} onChange={(e)=>handleFormData('type', e.target.value)}>
                        <option value="" disabled={true}>Select Type</option>
                        {expenseTypeData.map((item)=> (
                            <option key={item}>{item}</option>
                        ))}
                        
                    </select>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Amount</legend>
                    <input value={formData.amount} onChange={(e)=>handleFormData('amount', e.target.value)} type="number" className="input w-full" placeholder="Enter amount"/>
                </fieldset>
            </div>
            <div className='mt-4 flex justify-center gap-3'>
                <button className="btn btn-soft btn-accent hover:text-white" onClick={handleAddExpense}>Save</button>
                <button className="btn btn-soft btn-error hover:text-white" onClick={()=> setShowForm(false)}>Cancel</button>
            </div>
        </div>}
        
        </div>
        
    </div>
    </>
    
  )
}

export default Expense
