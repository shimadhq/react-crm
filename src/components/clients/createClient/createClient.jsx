import React from "react";
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import './createClient.css';

export const CreateClient = () => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      console.log('Client data:', {
        ...data,
        birthDate: data.birthDate?.toString(),
      });
    };

    return(
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="client-form">
                <div className="identity-information">
                    <h4 className="heading">اطلاعات هویتی</h4>
                    <div className="identity-form">
                      { /* Name */ }
                        <div>
                          <label className="name">نام</label>
                          <input
                            {...register("firstName", { required: "نام الزامی است" })}
                            className="input"
                            placeholder="نام مشتری را وارد کنید..."
                            dir="rtl"
                          />
                          {errors.firstName && (
                            <p className="error-text">{errors.firstName.message}</p>
                          )}
                        </div>

                        { /* Last Name */ }
                        <div>
                          <label className="name">نام خانوادگی</label>
                          <input
                            {...register("lastName", { required: "نام خانوادگی الزامی است" })}
                            className="input"
                            placeholder="نام خانوادگی مشتری را وارد کنید..."
                            dir="rtl"
                          />
                          {errors.lastName && (
                            <p className="error-text">{errors.lastName.message}</p>
                          )}
                        </div>

                        { /* National ID */ }
                        <div>
                          <label className="name">کد ملی</label>
                          <input
                             {...register("nationalCode", {
                              required: "کد ملی الزامی است",
                              pattern: {
                                value: /^\[0-9]{10}$/,
                                message: "کد ملی باید 10 رقم باشد",
                              },
                             })}
                             className="input"
                             placeholder="کد ملی مشتری را وارد کنید..."
                             dir="rtl"
                          />
                          {errors.nationalCode && (
                            <p className="error-text">{errors.nationalCode.message}</p>
                          )}
                        </div>
                    </div>
                    <div className="identity-form">
                      { /* Birth Date */ }
                      <div>
                        <label className="name">تاریخ تولد</label>
                        <Controller
                           control={control}
                           name="birthDate"
                           rules={{ required: "تاریخ تولد الزامی است" }}
                           render={({ field }) => (
                             <DatePicker
                                {...field}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                inputClass="input"
                                onChange={(date) => field.onChange(date)}
                                value={field.value}
                                placeholder="تاریخ تولد مشتری را وارد کنید..."
                             />
                           )}
                        />
                        {errors.birthDate && (
                          <p className="error-text">{errors.birthDate.message}</p>
                        )}
                      </div>

                      { /* Mobile Number */ }
                      <div>
                        <label className="name">شماره موبایل</label>
                        <input
                          {...register("mobileNumber", { 
                            required: "شماره موبایل الزامی است",
                            pattern: {
                              value: /^09\d{9}$/,
                              message: "شماره موبایل معتبر نیست",
                            }, 
                          })}
                          className="input"
                          placeholder="شماره موبایل مشتری را وارد کنید..."
                          dir="rtl"
                        />
                        {errors.mobileNumber && (
                          <p className="error-text">{errors.mobileNumber.message}</p>
                        )}
                      </div>
                    </div>
                </div>
                <div className="submit">
                  <button type="submit" className="submit-button">ثبت</button>
                </div>
            </form>
        </div>
    )
}