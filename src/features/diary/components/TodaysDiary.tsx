import { useState } from 'react'
import diaryBg from '../../../assets/dailyDiary_bg.png'
import { MOOD_TYPES } from '../../../constants/constant'

const TodaysDiary = () => {
    const [diaryObj, setDiaryObj] = useState({
        date: "",
        mood: "Happy",
        content: ""
    })

    const handleDiaryObj = (name: string, value: string) => {
        setDiaryObj((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    console.log("diaryObj", diaryObj);

  return (
    <>
        <div className='flex justify-between'>
            <h1 className='text-xl mb-4'>Today's Diary</h1>
            <button className="btn btn-accent text-white mb-4">Past Diary Logs</button>
        </div>
        <div className='w-full'>
            <div className='flex flex-col h-[calc(100vh-200px)] w-full bg-cover bg-center bg-no-repeat p-6' style={{ backgroundImage: `url(${diaryBg})`}}>
                <div className='grid grid-cols-3 gap-4 w-full max-w-xl'>
                    <input type="date" value={diaryObj.date} onChange={(e)=> handleDiaryObj('date', e.target.value)} className="input input-ghost border-b-2 border-b-accent" />

                    <select defaultValue="Happy" value={diaryObj.mood} onChange={(e)=> handleDiaryObj('mood', e.target.value)} className="select select-ghost border-b-2 border-b-accent">
                    <option disabled={true}>Select Mood</option>
                    {MOOD_TYPES.map((type)=>(
                        <option key={type}>{type}</option>
                    ))}
                    </select>
                </div>
                <div className="mt-6">
                    <textarea value={diaryObj.content} onChange={(e)=> handleDiaryObj('content', e.target.value)} className="notebook-textarea textarea textarea-ghost w-full h-100 resize-none" placeholder="Write your diary..."></textarea>
                </div>
                <div className='mt-4 flex justify-end items-end pb-1 gap-3'>
                    <button className="btn btn-soft btn-accent hover:text-white">
                        Save
                    </button>
                    <button className="btn btn-soft btn-error hover:text-white">
                        Clear
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default TodaysDiary
