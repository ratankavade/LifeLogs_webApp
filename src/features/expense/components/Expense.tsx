import React, { useState } from 'react'
import api from '../../../app/axios';

const Expense = () => {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        amount: 0
    })
    const expenseTypeData = ["Food", "Cosmatices", "Groceries", "Bills", "Fuel"];

    const handleFormData = (name: string, value: string) => {
        setFormData((prev)=> ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddExpense = async () => {
        try{
            const response = await api.post("/api/expense", formData);
            console.log("response.data", response.data);
        }catch (err){
            console.error(err);
        }
    }

    console.log("formData", formData)

  return (
    <>
    <h1 className='text-xl mb-4'>Expense</h1>
    <div className='grid grid-cols-2 gap-4'>
      <div>
        <h2 className='text-lg mb-4'>Today's Expense</h2>
        <button className="btn btn-outline btn-accent">Add new</button>
        <div>
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
                            <option>{item}</option>
                        ))}
                        
                    </select>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Amount</legend>
                    <input value={formData.amount} onChange={(e)=>handleFormData('amount', e.target.value)} type="number" className="input w-full" placeholder="Enter amount"/>
                </fieldset>
            </div>
            <div className='mt-4 flex justify-center'>
                <button className="btn btn-accent" onClick={handleAddExpense}>Save</button>
            </div>
        </div>
      </div>
      <div>
        <ul className="list bg-base-100 rounded-box shadow-md">
  
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>
            
            <li className="list-row">
                <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
                <div>
                <div>Dio Lupa</div>
                <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
                </div>
                <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                </button>
                <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                </button>
            </li>
            
            <li className="list-row">
                <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div>
                <div>
                <div>Ellie Beilish</div>
                <div className="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
                </div>
                <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                </button>
                <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                </button>
            </li>
            
            <li className="list-row">
                <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div>
                <div>
                <div>Sabrino Gardener</div>
                <div className="text-xs uppercase font-semibold opacity-60">Cappuccino</div>
                </div>
                <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                </button>
                <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                </button>
            </li>
            
        </ul>

      </div>
    </div>
    </>
    
  )
}

export default Expense
