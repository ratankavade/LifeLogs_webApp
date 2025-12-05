import { useState } from 'react'
import type { ExpenseItem, ExpenseModelProps } from '../types/expenseTypes'
import api from '../../../app/axios'
import { EXPENSE_TYPE_DATA } from '../../../constants/constant'

const AddExpenseModal: React.FC<ExpenseModelProps> = ({refreshExpenses}) => {
    const [formData, setFormData] = useState<ExpenseItem>({
        _id: "",
        name: "",
        type: "",
        amount: 0,
        createdAt: ""
    })

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
            refreshExpenses();
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

  return (
    <div>
      <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg mb-4">Add New Expense</h3>
                <form method="dialog">
                    <div className='grid grid-cols-4 gap-4'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Date</legend>
                            <input type="date" value={formData.createdAt} onChange={(e)=>handleFormData('createdAt', e.target.value)} className="input w-full" placeholder="Expense name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Expense For</legend>
                            <input type="text" value={formData.name} onChange={(e)=>handleFormData('name', e.target.value)} className="input w-full" placeholder="Expense name" />
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
                            <input type="number" value={formData.amount} onChange={(e)=>handleFormData('amount', e.target.value)} className="input w-full" placeholder="Enter amount"/>
                        </fieldset>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-soft btn-accent hover:text-white" onClick={handleAddExpense}>
                            Save
                        </button>
                        <button className="btn btn-soft btn-error hover:text-white" >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    </div>
  )
}

export default AddExpenseModal
