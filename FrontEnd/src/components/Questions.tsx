import React from 'react'

interface Question {
  provider: string;
  time: string;
  message: string;
}

interface QuestionsProps {
  questions: Question[];
}

function Questions({ questions }: QuestionsProps) {
    return (
        <div className="p-6 bg-white rounded-lg mt-4 shadow-md">
          <h2 className="text-[15px] font-bold mb-4">Questions from transport Provider</h2>
          <div className="space-y-6 ">
            {questions.map((question, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 ">
                  <span className='text-xs'>{question.provider}</span>
                  <span className='text-xs'>(Asked {question.time})</span>
                </div>
                <p className="text-xs">{question.message}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
export default Questions
