import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign, address } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    category: '', //add!
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
        setIsLoading(false);
        navigate('/');
      } else {
        alert('유효한 이미지 URL을 입력해 주세요.')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {!address ? (
        <>
          <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
            계정을 연결하였나요?
          </h1>
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            먼저 계정을 연결하여야 합니다!
          </p>
        </>
      ) : (
        <>
          {isLoading && <Loader />}
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign 🚀</h1>
          </div>

          <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="이름"
                placeholder="이름을 입력하세요"
                inputType="text"
                value={form.name}
                handleChange={(e) => handleFormFieldChange('name', e)}
              />
              <FormField
                labelName="캠페인 제목"
                placeholder="제목을 입력하세요"
                inputType="text"
                value={form.title}
                handleChange={(e) => handleFormFieldChange('title', e)}
              />
            </div>
            <FormField
                labelName="카테고리" // 카테고리 추가!
                placeholder="카테고리를 입력하세요"
                inputType="text"
                value={form.category}
                handleChange={(e) => handleFormFieldChange('category', e)}
            />

            <FormField
              labelName="캠페인 소개"
              placeholder="당신의 캠페인을 소개하세요."
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange('description', e)}
            />

            <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
              <img src={money} alt="money" className="w-[40px] h-[40px] object-contain animate-pulse" />
              <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px] animate-pulse">You will get <span className='text-[#4acd8d]'>100% </span>of the raised amount</h4>
            </div>

            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="목표 금액"
                placeholder="1 MATIC(숫자로 입력하세요)"
                inputType="text"
                value={form.target}
                handleChange={(e) => handleFormFieldChange('target', e)}
              />
              <FormField
                labelName="종료일"
                placeholder="종료일을 설정하세요"
                inputType="date"
                value={form.deadline}
                handleChange={(e) => handleFormFieldChange('deadline', e)}
              />
            </div>

            <FormField
              labelName="캠페인 이미지"
              placeholder="Place image URL of your campaign"
              inputType="url"
              value={form.image}
              handleChange={(e) => handleFormFieldChange('image', e)}
            />

            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="제출"
                title="새로운 캠페인 제출하기"
                styles="bg-[#1dc071]"
              />
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default CreateCampaign