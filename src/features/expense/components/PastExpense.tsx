import { useEffect, useState } from "react";
import api from "../../../app/axios";
import type { ExpenseItem, GroupedExpense } from "../types/expenseTypes";
import AddExpenseModal from "./AddExpenseModal";
import ConfirmAlert from "../../../component/common/ConfirmAlert";

const PastExpense = () => {
    const [allExpenseData, setAllExpenseData] = useState<ExpenseItem[]>([]);
    const [accordionObj, setAccordionObj] = useState<GroupedExpense[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null)

    useEffect(()=> {
        getAllExpense();
    }, [])

    useEffect(()=> {
        const allExpenseTableData = transformExpenses(allExpenseData);
        setAccordionObj(allExpenseTableData)
    }, [allExpenseData]);

    const getAllExpense = async() => {
        try{
        const response = await api.get('/api/expense/');
            console.log("response.data", response.data);
            setAllExpenseData(response.data);
        }catch (err){
            console.error(err);
        }
    }

    const transformExpenses = (data: ExpenseItem[]): GroupedExpense[] => {
        const grouped: Record<string, GroupedExpense> = {};

        data.forEach((item) => {
            const dateKey = item.createdAt.split("T")[0];

            if (!grouped[dateKey]) {
            grouped[dateKey] = {
                date: item.createdAt, 
                totalAmt: 0,
                expenseList: []
            };
            }
            grouped[dateKey].expenseList.push(item);
            grouped[dateKey].totalAmt += item.amount;
        });
        // Convert object → array
        return Object.values(grouped).sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    };

    const handleAddPastExpense = () => {
        const modal = document.getElementById("my_modal_4") as HTMLDialogElement;
        modal?.showModal();
    }

    const handleDeleteConfirm = async () => {
        if(!deleteId) return;

        try {
            await api.delete(`/api/expense/${deleteId}`);
            const updatedList = allExpenseData.filter(item => item._id !== deleteId);
            setAllExpenseData(updatedList);

            setShowConfirm(false);
            setDeleteId(null)
        } catch (err) {
            console.error(err);
        }
        
    };

    const handleDeleteCancel = () => {
        setShowConfirm(false);
        setDeleteId(null)
    }

  return (
    <>
        <div className='flex justify-between'>
            <h1 className='text-xl mb-4'>Expense History</h1>
            <button className="btn btn-accent text-white" onClick={handleAddPastExpense}>Add in Past Expenses</button>
        </div>
        
        <div className='gap-4 mt-4'>
            {accordionObj && accordionObj.map((item)=> (
                <details key={item.date} className="collapse collapse-arrow bg-base-100 border border-base-300" name="my-accordion-det-1">
                    <summary className="collapse-title font-semibold flex justify-between">
                        <span className="float-left">{new Date(item.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</span>
                        <span className="float-end">₹ {item.totalAmt}</span>
                    </summary>
                    <div className="collapse-content text-sm">
                        <ul className="list bg-base-200  border-gray-200">
                        {item.expenseList.map((listItem)=> (
                            <li key={listItem._id} className="list-row grid grid-cols-4 p-4 rounded-b-none">
                                <div className='text-sm font-semibold uppercase text-gray-700'>{listItem.name}</div>
                                <div className="text-sm font-semibold uppercase text-gray-700">{listItem.type}</div>
                                <div className='text-sm font-semibold uppercase text-gray-700'>{listItem.amount}</div>
                                <div>
                                    <button className="btn btn-soft btn-error hover:text-white float-right" onClick={()=>{setDeleteId(listItem._id); setShowConfirm(true);}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </div>
                </details>
            ))}  
        </div>
        <AddExpenseModal refreshExpenses={getAllExpense} />
        <ConfirmAlert 
        open={showConfirm} 
        message="Are you sure you want to delete this Expense?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel} />
    </>
  )
}

export default PastExpense
